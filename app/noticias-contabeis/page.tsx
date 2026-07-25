import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { Pagination } from "@/components/blog/Pagination";
import { Container } from "@/components/ui/Container";
import { getPageCount, getPostsPage } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Conteúdos Contábeis",
  description:
    "Artigos sobre planejamento tributário, abertura de empresa, reforma tributária e gestão contábil. Conteúdo atualizado da Visa Contabilidade em Cascavel-PR.",
  path: "/noticias-contabeis/",
  image: "/images/blog-banner.webp",
});

export default function BlogPage() {
  const posts = getPostsPage(1);
  const totalPages = getPageCount();

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
          {posts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-ink-100 bg-brand-50/40 p-10 text-center">
              <h2 className="text-xl font-bold text-ink-800">Novos conteúdos em breve</h2>
              <p className="mt-3 text-ink-600">
                Em instantes você encontrará aqui conteúdos sobre planejamento tributário, abertura
                de empresa e gestão contábil.
              </p>
            </div>
          ) : (
            <>
              <CategoryNav />
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.url} post={post} />
                ))}
              </div>
              <Pagination current={1} total={totalPages} />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
