import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/lib/content/home";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** "Soluções completas" — 4 diferenciais sobre fundo azul-claro. */
export function SolutionsGrid() {
  return (
    <section className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Soluções completas" title="O suporte ideal para cada etapa da sua jornada empresarial" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
            >
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-800">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/escritorio-contabil/" variant="primary" size="lg">
            Solicite uma proposta
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
