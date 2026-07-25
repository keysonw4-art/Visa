import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BLUR_DATA_URL } from "@/lib/blur";
import type { ServiceItem } from "@/lib/content/services";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** Grade de cards de serviço/especialidade com imagem, título e "Saiba mais". */
export function ServicesGrid({
  eyebrow = "Nossos serviços",
  title,
  items,
  columns = 4,
}: {
  eyebrow?: string;
  title: string;
  items: ServiceItem[];
  columns?: 3 | 4;
}) {
  return (
    <Section as="section" className="bg-white" bleed>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div
          className={`mt-14 grid gap-6 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {items.map((item, i) => (
            <Reveal key={item.href} delay={i * 80}>
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink-800">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{item.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Saiba mais
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
