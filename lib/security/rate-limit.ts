import "server-only";

/**
 * Rate limiter nativo (token-bucket in-memory), sem dependência externa.
 *
 * ⚠️ No serverless da Vercel a memória é por-instância e efêmera: isto é
 * best-effort contra abuso trivial de formulário. Para limite durável e
 * compartilhado entre instâncias, trocar a implementação por Vercel KV /
 * Upstash mantendo a mesma interface `RateLimiter` — o ponto de troca fica aqui.
 */

export type RateLimitResult = {
  success: boolean;
  /** Segundos até liberar de novo (quando bloqueado). */
  retryAfter: number;
  remaining: number;
};

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

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

  check(key: string): RateLimitResult {
    const now = Date.now();
    this.sweep(now);

    const bucket = this.buckets.get(key) ?? {
      tokens: this.opts.capacity,
      updatedAt: now,
    };

    // Repõe tokens proporcional ao tempo decorrido.
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

/** Limiter do formulário: 5 envios de burst, repõe ~1 a cada 12s. */
export const contactRateLimiter: RateLimiter = new InMemoryTokenBucket({
  capacity: 5,
  refillPerSecond: 1 / 12,
});

/** Extrai o IP do cliente dos headers de proxy (Vercel/Cloudflare). */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
