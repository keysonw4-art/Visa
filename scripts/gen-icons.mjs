// Gera favicons/ícones do app usando a LOGO OFICIAL (public/images/logo.webp).
// Uso: node scripts/gen-icons.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(ROOT, "public", "images", "logo.webp");

// Fundo branco (a logo tem cores fortes que se destacam melhor sobre branco
// do que sobre azul da marca, porque a própria logo já tem elementos azuis).
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

/** Renderiza a logo centralizada num quadrado de `size`px com padding. */
async function squareIcon(size, outPath) {
  const padding = Math.round(size * 0.12); // 12% de padding em volta
  const inner = size - padding * 2;
  const resized = await sharp(LOGO).resize(inner, inner, { fit: "inside" }).toBuffer();
  const meta = await sharp(resized).metadata();
  const left = Math.round((size - meta.width) / 2);
  const top = Math.round((size - meta.height) / 2);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(outPath);
  console.log("  gerado", path.relative(ROOT, outPath), `(${size}x${size})`);
}

const targets = [
  { file: "public/icon-192.png", size: 192 }, // PWA
  { file: "public/icon-512.png", size: 512 }, // PWA
  { file: "app/icon.png", size: 512 }, // favicon do Next 15+
  { file: "app/apple-icon.png", size: 180 }, // iOS home screen
];

for (const t of targets) await squareIcon(t.size, path.join(ROOT, t.file));
console.log("Ícones gerados a partir da logo oficial.");
