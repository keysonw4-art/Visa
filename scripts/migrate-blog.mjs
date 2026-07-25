// Migração dos posts do WordPress (wp-json) para MDX + download de imagens.
// Uso: node scripts/migrate-blog.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import he from "he";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://contabilidadevisa.com.br/wp-json/wp/v2";

const POSTS_DIR = path.join(ROOT, "content", "posts");
const COVER_DIR = path.join(POSTS_DIR, "_assets"); // co-located → velite processa cover
const INLINE_DIR = path.join(ROOT, "public", "blog-assets"); // imagens do corpo

fs.mkdirSync(COVER_DIR, { recursive: true });
fs.mkdirSync(INLINE_DIR, { recursive: true });

// ---------- helpers ----------
async function fetchRetry(url, opts = {}, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, opts);
      if (res.ok) return res;
      if (res.status === 400 || res.status === 404) return res; // fim de paginação
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
}

const stripTags = (html) => he.decode(html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
const toDate = (iso) => (iso || "").slice(0, 10); // YYYY-MM-DD

function safeName(url) {
  try {
    const p = new URL(url).pathname;
    return decodeURIComponent(path.basename(p)).replace(/[^\w.\-]/g, "-");
  } catch {
    return null;
  }
}

async function download(url, destDir) {
  const name = safeName(url);
  if (!name) return null;
  const dest = path.join(destDir, name);
  if (fs.existsSync(dest)) return name;
  try {
    const res = await fetchRetry(url);
    if (!res || !res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return name;
  } catch {
    return null;
  }
}

// ---------- turndown ----------
const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "_",
});
td.use(gfm);
// Caixa de "resumo executivo" → blockquote em destaque (bom para GEO/leitura).
td.addRule("resumo", {
  filter: (node) =>
    node.nodeName === "P" &&
    typeof node.className === "string" &&
    node.className.includes("itx-resumo-executivo"),
  replacement: (content) => `\n> ${content.replace(/\n/g, " ").trim()}\n\n`,
});
// Remove elementos vazios / de UI que às vezes vazam.
td.remove(["script", "style"]);

// ---------- main ----------
async function fetchAllPosts() {
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetchRetry(`${BASE}/posts?per_page=20&page=${page}&_embed`);
    if (!res || !res.ok) break;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 20) break;
  }
  return all;
}

function yamlEscape(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

async function run() {
  console.log("Buscando posts...");
  const posts = await fetchAllPosts();
  console.log(`  ${posts.length} posts encontrados.`);

  let ok = 0;
  for (const post of posts) {
    const slug = post.slug;
    const title = stripTags(post.title?.rendered || "");
    const excerpt = stripTags(post.excerpt?.rendered || "")
      .replace(/\s*\[…\]$/, "")
      .replace(/\s*Leia mais.*$/i, "")
      .slice(0, 300);

    const terms = post._embedded?.["wp:term"] || [];
    const categories = (terms[0] || [])
      .map((t) => t.name)
      .filter((n) => n && !/sem categoria|uncategorized/i.test(n));
    const tags = (terms[1] || []).map((t) => t.name);

    // Imagem destacada (cover) — co-locada para o velite processar dimensões.
    let cover = null;
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const coverUrl = media?.source_url;
    if (coverUrl) {
      const ext = path.extname(new URL(coverUrl).pathname) || ".jpg";
      const coverName = `${slug}${ext}`;
      const coverDest = path.join(COVER_DIR, coverName);
      if (!fs.existsSync(coverDest)) {
        const res = await fetchRetry(coverUrl);
        if (res?.ok) fs.writeFileSync(coverDest, Buffer.from(await res.arrayBuffer()));
      }
      if (fs.existsSync(coverDest)) cover = `./_assets/${coverName}`;
    }

    // Corpo: baixa imagens inline e reescreve src para /blog-assets/.
    let html = post.content?.rendered || "";
    const imgUrls = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    for (const url of [...new Set(imgUrls)]) {
      if (!/^https?:/.test(url)) continue;
      const name = await download(url, INLINE_DIR);
      if (name) html = html.split(url).join(`/blog-assets/${name}`);
    }
    // remove srcset (aponta para o host antigo) para não vazar URLs mortas.
    html = html.replace(/\ssrcset="[^"]*"/g, "").replace(/\ssizes="[^"]*"/g, "");

    let markdown = td.turndown(html).trim();
    // Tabelas com conteúdo em bloco (<p> dentro de <td>) permanecem como HTML cru.
    // Nelas, escapa * e _ para o MDX não interpretá-los como emphasis (quebra o parse).
    markdown = markdown.replace(/<table[\s\S]*?<\/table>/g, (t) =>
      t.replace(/\*/g, "&#42;").replace(/_/g, "&#95;").replace(/<p>\s*<\/p>/g, ""),
    );
    // Sanitiza HTML cru remanescente: remove atributos que quebram MDX/JSX
    // (style="string" não é válido em JSX) ou que sujam o markup (class/id).
    markdown = markdown
      .replace(/\s(?:style|class|id|dir|lang|align|width|height)="[^"]*"/gi, "")
      .replace(/\s(?:style|class|id|dir|lang|align|width|height)='[^']*'/gi, "")
      .replace(/<p>\s*<\/p>/g, "");

    const fm = [
      "---",
      `title: ${yamlEscape(title)}`,
      `date: ${yamlEscape(post.date)}`,
      post.modified ? `updated: ${yamlEscape(post.modified)}` : null,
      excerpt ? `excerpt: ${yamlEscape(excerpt)}` : null,
      cover ? `cover: ${yamlEscape(cover)}` : null,
      `categories: [${categories.map(yamlEscape).join(", ")}]`,
      `tags: [${tags.map(yamlEscape).join(", ")}]`,
      "---",
      "",
    ]
      .filter((l) => l !== null)
      .join("\n");

    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.mdx`), `${fm}${markdown}\n`, "utf8");
    ok++;
    process.stdout.write(`  [${ok}/${posts.length}] ${slug}\n`);
  }

  console.log(`\nConcluído: ${ok} posts migrados.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
