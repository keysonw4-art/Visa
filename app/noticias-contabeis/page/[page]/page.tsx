import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { Container } from "@/components/ui/Container";
import { getPageCount, getPostsPage } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = getPageCount();
  // Página 1 vive em /noticias-contabeis/; aqui geramos da 2 em diante.
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: `Blog — Página ${page}`,
    description:
      "Artigos sobre planejamento tributário, abertura de empresa e gestão contábil da Visa Contabilidade.",
    path: `/noticias-contabeis/page/${page}/`,
    image: "/images/blog-banner.webp",
  });
}

export default async function BlogPaginaPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = Number(page);
  const totalPages = getPageCount();

  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > totalPages) notFound();

  const posts = getPostsPage(pageNum);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Acesse conteúdos contábeis atualizados"
        breadcrumb="Blog"
        image="/images/blog-banner.webp"
      />
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
          <Pagination current={pageNum} total={totalPages} />
        </Container>
      </section>
    </>
  );
}
