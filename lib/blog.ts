import { posts as allPosts } from "#content";

import type { PostCardData } from "@/components/blog/PostCard";
import {
  blogCategories,
  consolidatedCategories,
  primaryCategory,
  type BlogCategory,
} from "@/lib/content/categories";

/** Quantidade de posts por página na listagem do blog. */
export const POSTS_PER_PAGE = 12;

/** Posts publicados (exclui rascunhos), do mais novo ao mais antigo. */
export function getPublishedPosts() {
  return [...allPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function toCard(p: ReturnType<typeof getPublishedPosts>[number]): PostCardData {
  const cat = primaryCategory(p.categories);
  return {
    title: p.title,
    url: p.url,
    excerpt: p.excerpt,
    date: p.date,
    cover: p.cover?.src,
    category: cat.name,
    categorySlug: cat.slug,
  };
}

/** Categorias consolidadas que têm pelo menos 1 post, com contagem. */
export function getCategoriesWithCounts(): (BlogCategory & { count: number })[] {
  const posts = getPublishedPosts();
  return blogCategories
    .map((c) => ({
      ...c,
      count: posts.filter((p) => consolidatedCategories(p.categories).some((x) => x.slug === c.slug))
        .length,
    }))
    .filter((c) => c.count > 0);
}

/** Posts de uma categoria consolidada (por slug), no formato de card. */
export function getPostsByCategory(slug: string): PostCardData[] {
  return getPublishedPosts()
    .filter((p) => consolidatedCategories(p.categories).some((c) => c.slug === slug))
    .map(toCard);
}

/** N posts mais recentes, no formato de card. */
export function getLatestPosts(n = 3): PostCardData[] {
  return getPublishedPosts().slice(0, n).map(toCard);
}

/** Total de páginas da listagem. */
export function getPageCount() {
  return Math.max(1, Math.ceil(getPublishedPosts().length / POSTS_PER_PAGE));
}

/** Posts de uma página específica (1-indexed), no formato de card. */
export function getPostsPage(page: number): PostCardData[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return getPublishedPosts()
    .slice(start, start + POSTS_PER_PAGE)
    .map(toCard);
}
