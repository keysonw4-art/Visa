// Gera a imagem de compartilhamento (Open Graph) 1200x630.
// Uso: node scripts/gen-og.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#004d7a"/>
      <stop offset="1" stop-color="#0e7d88"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="130" r="280" fill="#ffffff" opacity="0.06"/>
  <circle cx="120" cy="560" r="200" fill="#ffffff" opacity="0.05"/>
  <rect x="90" y="196" width="96" height="10" rx="5" fill="#ffc107"/>
  <text x="90" y="300" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="bold" fill="#ffffff">Visa Contabilidade</text>
  <text x="90" y="360" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#cce4f1">Contabilidade Especializada em Cascavel-PR</text>
  <text x="90" y="424" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#99c9e4">Planejamento tributário · Abertura de empresa · +20 anos</text>
</svg>`;

const out = path.join(ROOT, "public", "og.png");
await sharp(Buffer.from(svg)).png().toFile(out);
console.log("OG gerada em", out);
