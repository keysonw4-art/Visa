import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export type Feature = { title: string; text: string };

/** Grade de features/benefícios (título + texto), com CTA opcional. */
export function FeatureGrid({
  eyebrow,
  title,
  features,
  ctaLabel,
  ctaHref = "/escritorio-contabil/",
  background = "brand-50",
}: {
  eyebrow?: string;
  title: string;
  features: Feature[];
  ctaLabel?: string;
  ctaHref?: string;
  background?: "brand-50" | "white";
}) {
  return (
    <section className={background === "brand-50" ? "bg-brand-50 py-16 lg:py-24" : "bg-white py-16 lg:py-24"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 70}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-800">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.text}</p>
            </Reveal>
          ))}
        </div>
        {ctaLabel && (
          <div className="mt-10 text-center">
            <ButtonLink href={ctaHref} variant="primary" size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
