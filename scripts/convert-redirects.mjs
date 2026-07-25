// Converte a exportação do plugin Redirection (JSON) em lib/redirects.ts.
// Achata cadeias (A→B→C vira A→C) e normaliza as URLs.
//
// Uso: node scripts/convert-redirects.mjs caminho/para/redirection.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Uso: node scripts/convert-redirects.mjs <arquivo-exportado.json>");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));
// O export pode ser um array direto ou { data: [...] } / { redirects: [...] }.
const items = Array.isArray(raw) ? raw : raw.data || raw.redirects || [];

const SITE = "contabilidadevisa.com.br";

/** Tira domínio, querystring e barra final; garante começar com "/". */
function normSource(u) {
  if (!u) return null;
  let s = String(u).trim();
  s = s.replace(/^https?:\/\/[^/]+/i, ""); // remove domínio
  s = s.split("?")[0].split("#")[0];
  if (!s.startsWith("/")) s = "/" + s;
  if (s.length > 1) s = s.replace(/\/+$/, ""); // sem barra final (source)
  return s;
}

/** Destino: mantém externos; internos ganham barra final (canônico do site). */
function normDest(u) {
  if (!u) return null;
  let s = String(u).trim();
  const isExternal = /^https?:\/\//i.test(s) && !s.includes(SITE);
  if (isExternal) return s;
  s = s.replace(/^https?:\/\/[^/]+/i, "");
  s = s.split("#")[0];
  if (!s.startsWith("/")) s = "/" + s;
  if (s !== "/" && !s.endsWith("/") && !s.includes("?")) s += "/"; // barra final
  return s;
}

const map = new Map(); // source(sem barra) -> destino
let skipped = 0;

for (const it of items) {
  const enabled = it.enabled !== false && it.status !== "disabled";
  const isRegex = it.regex === true || it.match_type === "regex";
  const actionType = it.action_type || "url";
  const src = normSource(it.url ?? it.source ?? it.source_url);
  const dst = normDest(it.action_data?.url ?? it.target ?? it.target_url ?? it.action_data);

  if (!enabled || isRegex || actionType !== "url" || !src || !dst) {
    skipped++;
    continue;
  }
  map.set(src, dst);
}

/** Segue a cadeia até o destino final. */
function resolveFinal(dest, seen = new Set()) {
  const key = dest.replace(/\/+$/, "") || "/";
  if (map.has(key) && !seen.has(key)) {
    seen.add(key);
    return resolveFinal(map.get(key), seen);
  }
  return dest;
}

const out = [];
const seenSrc = new Set();
for (const [src, dst] of map) {
  const final = resolveFinal(dst);
  if (src === final || src + "/" === final) continue; // ignora auto-redirect
  if (seenSrc.has(src)) continue;
  seenSrc.add(src);
  out.push({ source: src, destination: final });
}
out.sort((a, b) => a.source.localeCompare(b.source));

const body = `/**
 * Redirecionamentos 301 herdados do WordPress antigo (plugin Redirection).
 * GERADO por scripts/convert-redirects.mjs — cadeias já achatadas.
 */

export type Redirect = { source: string; destination: string };

export const redirects: Redirect[] = ${JSON.stringify(out, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, "lib", "redirects.ts"), body, "utf8");
console.log(`OK: ${out.length} redirects gravados em lib/redirects.ts (ignorados: ${skipped}).`);
