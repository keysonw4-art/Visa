// Gera os ícones do app (PWA + favicon) a partir de um SVG brandado.
// Uso: node scripts/gen-icons.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// "V" desenhado como path (sem dependência de fonte) sobre gradiente da marca.
function svg(size) {
  const p = (fx, fy) => `${(fx * size).toFixed(1)},${(fy * size).toFixed(1)}`;
  const stroke = (size * 0.11).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0077bb"/>
      <stop offset="1" stop-color="#119ba8"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
  <path d="M ${p(0.3, 0.33)} L ${p(0.5, 0.67)} L ${p(0.7, 0.33)}"
        fill="none" stroke="#ffffff" stroke-width="${stroke}"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

const targets = [
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
  { file: "app/icon.png", size: 256 },
  { file: "app/apple-icon.png", size: 180 },
];

for (const t of targets) {
  const out = path.join(ROOT, t.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg(t.size))).png().toFile(out);
  console.log("  gerado", t.file);
}
console.log("Ícones gerados.");
