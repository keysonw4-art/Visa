import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BLUR_DATA_URL } from "@/lib/blur";
import { Reveal } from "./Reveal";

/** Bloco intro: imagem + eyebrow + título + parágrafos + CTA (imagem à direita por padrão). */
export function IntroSplit({
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt,
  ctaLabel = "Fale com um consultor",
  ctaHref = "/escritorio-contabil/",
  imageSide = "right",
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSide?: "left" | "right";
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        {image && (
          <Reveal
            className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg ${
              imageSide === "right" ? "lg:order-last" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        )}
        <Reveal delay={120}>
          {eyebrow && (
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-300">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-lg text-ink-600">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href={ctaHref} variant="primary" size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
