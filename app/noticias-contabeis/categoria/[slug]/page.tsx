import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryNav } from "@/components/blog/CategoryNav";
import { PostCard } from "@/components/blog/PostCard";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getCategoriesWithCounts, getPostsByCategory } from "@/lib/blog";
import { categoryBySlug } from "@/lib/content/categories";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoriesWithCounts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  return pageMetadata({
    title: `${cat.name} — Blog`,
    description: cat.description,
    path: `/noticias-contabeis/categoria/${slug}/`,
    image: "/images/blog-banner.webp",
  });
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/noticias-contabeis/" },
          { name: cat.name, path: `/noticias-contabeis/categoria/${slug}/` },
        ])}
      />
      <PageHero
        eyebrow="Blog"
        title={cat.name}
        breadcrumb={cat.name}
        image="/images/blog-banner.webp"
      />
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-ink-600">
            {cat.description}
          </p>
          <CategoryNav activeSlug={slug} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
