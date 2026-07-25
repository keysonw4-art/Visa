import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MDXContent } from "@/components/blog/MDXContent";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLUR_DATA_URL } from "@/lib/blur";
import { getPublishedPosts } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";

// Só slugs de posts publicados são válidos; slugs desconhecidos → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt ?? post.title,
    path: post.url,
    image: post.cover?.src,
  });
}

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPublishedPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          url: post.url,
          date: post.date,
          updated: post.updated,
          cover: post.cover?.src,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/noticias-contabeis/" },
          { name: post.title, path: post.url },
        ])}
      />
      <PageHero eyebrow={post.categories[0] ?? "Blog"} title={post.title} breadcrumb="Blog" />
      <article className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm text-ink-400">
            {dateFmt.format(new Date(post.date))} · {post.metadata.readingTime} min de leitura
          </p>
          {post.cover && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.cover.src}
                alt={post.title}
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
          <div className="prose prose-lg mt-8 max-w-none prose-headings:text-ink-900 prose-p:text-ink-600 prose-a:text-brand-600">
            <MDXContent code={post.content} />
          </div>
        </Container>
      </article>
    </>
  );
}
