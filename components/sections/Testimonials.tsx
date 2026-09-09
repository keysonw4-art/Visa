import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

const dateFmt = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

/**
 * Depoimentos — avaliações reais do Google renderizadas de forma estática
 * (leve + indexável). O schema Review/AggregateRating fica na camada SEO.
 * Sem reviews, mostra só cabeçalho + CTA (não inventa).
 */
export function Testimonials({ reviews = [] }: { reviews?: Review[] }) {
  const average =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="A opinião de quem conhece nosso trabalho de perto"
        />

        {reviews.length > 0 && (
          <>
            {/* Agregado (prova social) */}
            <Reveal className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-ink-900">
                  {average.toFixed(1).replace(".", ",")}
                </span>
                <Stars rating={Math.round(average)} className="h-6 w-6" />
              </div>
              <p className="text-sm text-ink-500">
                Avaliações reais de clientes no Google
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.author} delay={i * 60}>
                  <figure className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Stars rating={r.rating} />
                      <GoogleG />
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-4 border-t border-ink-100 pt-4">
                      <span className="block text-sm font-semibold text-ink-800">{r.author}</span>
                      {r.date && (
                        <time dateTime={r.date} className="text-xs text-ink-400">
                          {dateFmt.format(new Date(r.date))}
                        </time>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
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

function Stars({ rating, className = "h-5 w-5" }: { rating: number; className?: string }) {
  return (
    <div role="img" className="flex gap-0.5 text-accent-yellow" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={className} fill={i < rating ? "currentColor" : "none"} stroke="currentColor">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.94a1 1 0 0 0 .95.69h4.15c.97 0 1.37 1.24.59 1.81l-3.36 2.44a1 1 0 0 0-.36 1.12l1.28 3.94c.3.92-.75 1.69-1.54 1.12l-3.35-2.44a1 1 0 0 0-1.18 0l-3.35 2.44c-.79.57-1.84-.2-1.54-1.12l1.28-3.94a1 1 0 0 0-.36-1.12L1.93 9.37c-.78-.57-.38-1.81.59-1.81h4.15a1 1 0 0 0 .95-.69z" strokeWidth={1} />
        </svg>
      ))}
    </div>
  );
}

/** Logo "G" do Google (marca a origem das avaliações). */
function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" role="img" className="h-5 w-5" aria-label="Google">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z" />
    </svg>
  );
}
