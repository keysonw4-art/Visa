// Gera a imagem de compartilhamento (Open Graph) 1200x630 usando a logo oficial.
// Uso: node scripts/gen-og.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(ROOT, "public", "images", "logo.webp");
const OUT = path.join(ROOT, "public", "og.png");

const W = 1200;
const H = 630;

// Fundo com gradiente sutil da marca (azul → teal) + toques decorativos.
// O texto usa Arial (fonte padrão do Windows via SVG rasterizado pelo sharp).
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#004d7a"/>
      <stop offset="1" stop-color="#0e7d88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1050" cy="130" r="280" fill="#ffffff" opacity="0.06"/>
  <circle cx="120" cy="560" r="200" fill="#ffffff" opacity="0.05"/>
</svg>`;

// Texto sobreposto: barra amarela + tagline + link. O nome da marca vem da
// própria logo (não repetimos em texto pra não competir visualmente).
const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="90" y="352" width="96" height="8" rx="4" fill="#ffc107"/>
  <text x="90" y="418" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="bold" fill="#ffffff">Contabilidade Especializada em Cascavel-PR</text>
  <text x="90" y="470" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#cce4f1">Planejamento tributário · Abertura de empresa · +20 anos</text>
  <text x="90" y="560" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#99c9e4">contabilidadevisa.com.br</text>
</svg>`;

// Logo grande em BRANCO (silhueta) — cria uma imagem RGB toda branca e
// junta como 4º canal o alpha ORIGINAL da logo. Resultado: silhueta branca
// perfeita, seguindo o contorno exato da logo.
const logoHeight = 200;
const resizedLogo = sharp(LOGO).resize({ height: logoHeight });
const alphaChannel = await resizedLogo.clone().extractChannel("alpha").toBuffer();
const { width: lw, height: lh } = await resizedLogo.clone().metadata();
const logoBuffer = await sharp({
  create: {
    width: lw,
    height: lh,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .joinChannel(alphaChannel)
  .png()
  .toBuffer();
const logoMeta = await sharp(logoBuffer).metadata();

await sharp(Buffer.from(bgSvg))
  .composite([
    { input: logoBuffer, left: 90, top: 100 },
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .png()
  .toFile(OUT);

console.log("OG gerada em", path.relative(ROOT, OUT), `(${W}x${H})`);
console.log("Logo composta:", logoMeta.width + "x" + logoMeta.height);
