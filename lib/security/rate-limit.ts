import "server-only";

/**
 * Rate limiter em duas camadas:
 *
 * 1. **Upstash Redis (durável)** — ativado quando UPSTASH_REDIS_REST_URL +
 *    UPSTASH_REDIS_REST_TOKEN estão setados. Fixed-window via INCR+EXPIRE:
 *    compartilhado entre todas as instâncias serverless e sobrevive a cold
 *    starts. Zero dependência npm — chama a REST API direto.
 *
 * 2. **Token-bucket in-memory (fallback)** — usado em dev ou quando as envs
 *    do Upstash não estão setadas. Best-effort: no serverless da Vercel a
 *    memória é por-instância e efêmera; protege contra abuso trivial no
 *    mesmo worker, mas não entre workers.
 *
 * A interface `RateLimiter` é assíncrona para acomodar o backend Redis;
 * chamadores devem `await` o resultado.
 */

export type RateLimitResult = {
  success: boolean;
  /** Segundos até liberar de novo (quando bloqueado). */
  retryAfter: number;
  remaining: number;
};

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

// ─── Backend 1: Upstash Redis via REST ──────────────────────────────────────

type UpstashOptions = {
  url: string;
  token: string;
  /** Máximo de requisições dentro da janela. */
  limit: number;
  /** Duração da janela em segundos. */
  windowSec: number;
  /** Timeout do fetch em ms — evita travar a rota se o Upstash cair. */
  timeoutMs?: number;
};

class UpstashFixedWindow implements RateLimiter {
  constructor(private readonly opts: UpstashOptions) {}

  async check(key: string): Promise<RateLimitResult> {
    const { url, token, limit, windowSec } = this.opts;
    const timeoutMs = this.opts.timeoutMs ?? 2_000;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      // Pipeline: INCR + EXPIRE (só cria TTL na primeira vez via NX)
      // https://upstash.com/docs/redis/features/restapi#pipeline
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", `rl:${key}`],
          ["EXPIRE", `rl:${key}`, String(windowSec), "NX"],
        ]),
        signal: controller.signal,
        cache: "no-store",
      });

      if (!res.ok) return this.openOnError();

      const payload = (await res.json()) as Array<{ result?: unknown; error?: string }>;
      const incrResult = payload[0]?.result;
      const count = typeof incrResult === "number" ? incrResult : Number(incrResult);
      if (!Number.isFinite(count)) return this.openOnError();

      if (count > limit) {
        return { success: false, retryAfter: windowSec, remaining: 0 };
      }
      return { success: true, retryAfter: 0, remaining: Math.max(0, limit - count) };
    } catch {
      return this.openOnError();
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * "Fail-open": se o Redis falhar (rede/timeout), liberamos a requisição
   * ao invés de bloquear todo mundo. O trade-off correto pra um form de
   * contato (falso-negativo raro > falso-positivo que impede lead legítimo).
   */
  private openOnError(): RateLimitResult {
    return { success: true, retryAfter: 0, remaining: 0 };
  }
}

// ─── Backend 2: Token-bucket in-memory ──────────────────────────────────────

type Bucket = { tokens: number; updatedAt: number };
type TokenBucketOptions = {
  /** Capacidade máxima de requisições no burst. */
  capacity: number;
  /** Tokens repostos por segundo (taxa sustentada). */
  refillPerSecond: number;
};

class InMemoryTokenBucket implements RateLimiter {
  private buckets = new Map<string, Bucket>();
  private lastSweep = Date.now();

  constructor(private readonly opts: TokenBucketOptions) {}

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    this.sweep(now);

    const bucket = this.buckets.get(key) ?? {
      tokens: this.opts.capacity,
      updatedAt: now,
    };

    const elapsedSec = (now - bucket.updatedAt) / 1000;
    bucket.tokens = Math.min(
      this.opts.capacity,
      bucket.tokens + elapsedSec * this.opts.refillPerSecond,
    );
    bucket.updatedAt = now;

    if (bucket.tokens < 1) {
      const retryAfter = Math.ceil((1 - bucket.tokens) / this.opts.refillPerSecond);
      this.buckets.set(key, bucket);
      return { success: false, retryAfter, remaining: 0 };
    }

    bucket.tokens -= 1;
    this.buckets.set(key, bucket);
    return { success: true, retryAfter: 0, remaining: Math.floor(bucket.tokens) };
  }

  /** Remove buckets ociosos periodicamente para não vazar memória. */
  private sweep(now: number) {
    if (now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    for (const [key, bucket] of this.buckets) {
      if (now - bucket.updatedAt > 300_000) this.buckets.delete(key);
    }
  }
}

// ─── Factory ─────────────────────────────────────────────────────────────────

/**
 * Escolhe o backend uma única vez no boot. Configuração do formulário de
 * contato: 5 requests / 60s por IP (via Upstash) OU capacity 5 + refill 1/12s
 * (in-memory, aproximadamente equivalente sob carga sustentada).
 *
 * Os nomes `UPSTASH_REDIS_REST_KV_REST_API_*` refletem o padrão criado pela
 * integração Vercel Marketplace + Upstash Redis (custom prefix = UPSTASH_REDIS_REST).
 */
function makeContactRateLimiter(): RateLimiter {
  const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (url && token) {
    return new UpstashFixedWindow({ url, token, limit: 5, windowSec: 60 });
  }
  return new InMemoryTokenBucket({ capacity: 5, refillPerSecond: 1 / 12 });
}

/** Limiter do formulário: 5 envios por minuto por IP (durável se KV ativo). */
export const contactRateLimiter: RateLimiter = makeContactRateLimiter();

/** Extrai o IP do cliente dos headers de proxy (Vercel/Cloudflare). */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
