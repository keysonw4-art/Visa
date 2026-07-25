import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-6xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink-900">Página não encontrada</h1>
        <p className="mt-3 text-ink-600">
          O conteúdo que você procura pode ter sido movido ou não existe mais.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary" size="lg">
            Voltar para a Home
          </ButtonLink>
          <ButtonLink href="/escritorio-contabil/" variant="outline" size="lg">
            Falar com a equipe
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
