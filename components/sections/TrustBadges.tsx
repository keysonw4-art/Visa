import { Container } from "@/components/ui/Container";
import { trustBadges } from "@/lib/content/home";
import { Reveal } from "./Reveal";

/** Faixa de selos de confiança (4 diferenciais). */
export function TrustBadges() {
  return (
    <section className="border-y border-ink-100 bg-white py-10">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <Reveal
              key={b.value}
              delay={i * 80}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <CheckIcon />
              <h3 className="mt-3 text-lg font-bold text-ink-800">{b.value}</h3>
              <p className="text-sm text-ink-500">{b.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-500">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
      </svg>
    </span>
  );
}
