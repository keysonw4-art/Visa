import { posts as allPosts } from "#content";

import type { PostCardData } from "@/components/blog/PostCard";

/** Quantidade de posts por página na listagem do blog. */
export const POSTS_PER_PAGE = 12;

/** Posts publicados (exclui rascunhos), do mais novo ao mais antigo. */
export function getPublishedPosts() {
  return [...allPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function toCard(p: ReturnType<typeof getPublishedPosts>[number]): PostCardData {
  return {
    title: p.title,
    url: p.url,
    excerpt: p.excerpt,
    date: p.date,
    cover: p.cover?.src,
    category: p.categories[0],
  };
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
