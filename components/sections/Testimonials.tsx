import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

/**
 * Depoimentos. Substitui o widget Trustindex por render estático (leve + indexável
 * + schema Review/AggregateRating na camada SEO). As reviews reais do Google serão
 * populadas depois — enquanto vazio, mostramos só o cabeçalho + CTA (sem inventar).
 */
export function Testimonials({ reviews = [] }: { reviews?: Review[] }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="A opinião de quem conhece nosso trabalho de perto"
        />

        {reviews.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.author} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink-600">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink-800">
                  {r.author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <ButtonLink href="/escritorio-contabil/" variant="primary" size="lg">
            Agende uma conversa
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent-yellow" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" fill={i < rating ? "currentColor" : "none"} stroke="currentColor">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.94a1 1 0 0 0 .95.69h4.15c.97 0 1.37 1.24.59 1.81l-3.36 2.44a1 1 0 0 0-.36 1.12l1.28 3.94c.3.92-.75 1.69-1.54 1.12l-3.35-2.44a1 1 0 0 0-1.18 0l-3.35 2.44c-.79.57-1.84-.2-1.54-1.12l1.28-3.94a1 1 0 0 0-.36-1.12L1.93 9.37c-.78-.57-.38-1.81.59-1.81h4.15a1 1 0 0 0 .95-.69z" strokeWidth={1} />
        </svg>
      ))}
    </div>
  );
}
