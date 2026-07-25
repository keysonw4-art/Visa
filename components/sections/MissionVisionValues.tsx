import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";

const blocks = [
  {
    title: "Missão",
    body: "Facilitar o crescimento de nossos clientes por meio de soluções contábeis diferenciadas, garantindo segurança e eficiência em suas operações.",
  },
  {
    title: "Visão",
    body: "Ser referência em contabilidade estratégica para empresas de grande porte, liderando o mercado com excelência e inovação, e crescendo de forma sustentável.",
  },
  {
    title: "Valores",
    body: "Inovação · Ética · Compromisso · Excelência",
  },
];

/** Missão, Visão e Valores (página Sobre). */
export function MissionVisionValues() {
  return (
    <section className="bg-brand-50 py-16 lg:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 90} className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-brand-600">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
