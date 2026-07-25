import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { BLUR_DATA_URL } from "@/lib/blur";

/** Banner padrão das páginas internas: imagem + breadcrumb + título. */
export function PageHero({
  title,
  breadcrumb,
  image,
  eyebrow,
}: {
  title: string;
  /** Último item do breadcrumb (ex.: "Sobre"). Home é sempre o primeiro. */
  breadcrumb: string;
  image?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-28">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-0 bg-brand-900/70" aria-hidden="true" />
        </>
      )}
      <Container className="relative z-10">
        {eyebrow && (
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-200">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-[clamp(1.9rem,6vw,3rem)] font-extrabold leading-tight text-white">
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-5 text-sm text-brand-100">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-white">{breadcrumb}</li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}
