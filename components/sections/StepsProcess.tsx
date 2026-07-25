import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Dê o primeiro passo",
    text: "Preencha nosso formulário ou fale diretamente com nossa equipe para entender suas necessidades.",
  },
  {
    n: "02",
    title: "Conheça nossas soluções",
    text: "Após uma análise detalhada, apresentamos a melhor estratégia contábil para sua empresa.",
  },
  {
    n: "03",
    title: "Assinatura de contrato",
    text: "Formalizamos nosso compromisso e damos início à execução dos serviços.",
  },
  {
    n: "04",
    title: "Acompanhamento contínuo",
    text: "Com relatórios e suporte contínuos, você acompanha de perto os resultados.",
  },
];

/** Processo de atendimento em 4 passos (idêntico em várias páginas). */
export function StepsProcess() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Entre em contato"
          title="Estamos prontos para ajudar sua empresa a crescer — fale conosco!"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <span className="text-4xl font-extrabold text-brand-100">{s.n}</span>
              <h3 className="mt-2 text-lg font-bold text-ink-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/escritorio-contabil/" variant="primary" size="lg">
            Comece agora
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
