import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/site.config";
import { Reveal } from "./Reveal";

/** Faixa de CTA final sobre fundo azul da marca. */
export function CtaBand({
  eyebrow = "Comece agora",
  title = "Deixe a contabilidade conosco e foque no seu crescimento",
  text = "Com 20 anos de experiência e uma equipe altamente qualificada, ajudamos sua empresa a reduzir custos, otimizar processos e alcançar resultados reais. Entre em contato hoje mesmo.",
  buttonLabel = "Fale com um consultor",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
}) {
  return (
    <section className="bg-brand-500 py-16 text-white lg:py-20">
      <Container className="text-center">
        <Reveal>
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-100">
            {eyebrow}
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-50/90">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink
              href={whatsappLink()}
              external
              size="lg"
              className="bg-white text-brand-700 hover:bg-brand-50"
            >
              {buttonLabel}
            </ButtonLink>
            <ButtonLink
              href="/escritorio-contabil/"
              size="lg"
              className="border border-white/70 bg-transparent text-white hover:bg-white/10"
            >
              Solicitar proposta
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
