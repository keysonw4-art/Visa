import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";

/** Bloco "Por que escolher a Visa" — imagem + texto sobre fundo escuro/azul. */
export function WhyChoose() {
  return (
    <section className="bg-brand-700 py-16 text-white lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative order-last aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:order-first">
          <Image
            src="/images/home-img.webp"
            alt="Reunião de planejamento na Visa Contabilidade"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={120}>
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-200">
            Por que escolher a Visa Contabilidade?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Visamos oportunidades contábeis para estruturar seu negócio
          </h2>
          <p className="mt-5 text-brand-50/90">
            Somos referência em planejamento tributário no Paraná e em todo o Brasil. Com mais de 20
            anos de experiência, ajudamos empresas de todos os portes a alcançarem maior eficiência e
            segurança financeira.
          </p>
          <p className="mt-4 text-brand-50/90">
            Nossa abordagem personalizada vai além da contabilidade tradicional: atuamos como
            parceiros estratégicos, entendendo as particularidades do seu negócio para oferecer
            soluções que realmente fazem a diferença.
          </p>
          <div className="mt-8">
            <ButtonLink
              href="/escritorio-de-contabilidade/"
              variant="secondary"
              size="lg"
              className="bg-white text-brand-700 hover:bg-brand-50"
            >
              Consulte propostas personalizadas
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
