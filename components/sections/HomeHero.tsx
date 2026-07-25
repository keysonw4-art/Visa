import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BLUR_DATA_URL } from "@/lib/blur";
import { whatsappLink } from "@/lib/site.config";
import { Reveal } from "./Reveal";

/** Hero da Home: texto + colagem de imagens (fiel ao layout atual). */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-300">
            Contabilidade Especializada
          </span>
          <h1 className="mt-4 text-[clamp(2rem,7vw,3.25rem)] font-extrabold leading-[1.1] text-ink-800">
            Proteja seu faturamento com uma gestão segura e preventiva
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            Há mais de 2 décadas, transformamos desafios empresariais em crescimento sólido. Unimos
            tecnologia avançada e expertise comprovada para garantir segurança fiscal e otimização
            de resultados. Vamos juntos fazer sua empresa crescer com inteligência!
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/escritorio-contabil/" variant="primary" size="lg">
              Conheça nossas propostas
            </ButtonLink>
            <ButtonLink href={whatsappLink()} external variant="outline" size="lg">
              Fale conosco
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/home-img-1.webp"
                alt="Equipe da Visa Contabilidade em Cascavel-PR"
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/home-img-2.webp"
                alt="Atendimento contábil personalizado"
                fill
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/home-img-3.webp"
                alt="Escritório da Visa Contabilidade no Centro de Cascavel"
                fill
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
