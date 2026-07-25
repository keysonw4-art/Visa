import Image from "next/image";
import Link from "next/link";

import { BLUR_DATA_URL } from "@/lib/blur";

export type PostCardData = {
  title: string;
  url: string;
  excerpt?: string;
  date: string;
  cover?: string;
  category?: string;
};

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

/** Card de post reutilizável (listagem do blog + prévia na home). */
export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={post.url}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-100">
        {post.cover && (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <span className="text-xs font-bold uppercase tracking-wide text-brand-400">
            {post.category}
          </span>
        )}
        <h3 className="mt-2 line-clamp-2 font-bold text-ink-800 group-hover:text-brand-600">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-600">
            {post.excerpt}
          </p>
        )}
        <time className="mt-4 text-xs text-ink-400" dateTime={post.date}>
          {dateFmt.format(new Date(post.date))}
        </time>
      </div>
    </Link>
  );
}
