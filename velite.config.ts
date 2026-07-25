import { defineConfig, defineCollection, s } from "velite";

/**
 * Camada de conteúdo do blog (MDX tipado).
 *
 * Os 72 posts do WordPress serão migrados para content/posts/*.mdx e validados
 * por este schema no build. Por ora existe só 1 post de exemplo — a rota do blog
 * já fica de pé ("espaço guardado"), pronta para ser populada.
 */
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(160),
      date: s.isodate(),
      updated: s.isodate().optional(),
      excerpt: s.string().max(320).optional(),
      cover: s.image().optional(),
      categories: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      // caminho relativo à raiz do conteúdo (ex.: "posts/meu-artigo")
      path: s.path(),
      // reading time, contagem de palavras, etc.
      metadata: s.metadata(),
      // MDX compilado (renderizado por um MDXContent no lado do blog)
      content: s.mdx(),
    })
    .transform((data) => {
      const slug = data.path.replace(/^posts\//, "");
      return {
        ...data,
        slug,
        // Posts vivem na raiz do domínio (preservação de URL do WordPress).
        url: `/${slug}/`,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/blog",
    base: "/blog/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    // Realce de sintaxe e afins podem ser plugados aqui depois (rehype/remark).
  },
});
