import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PostCard, type PostCardData } from "@/components/blog/PostCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * Prévia do blog na Home. Tolerante a 0 posts (blog ainda em migração):
 * se não houver posts publicados, mostra só cabeçalho + CTA.
 */
export function BlogPreview({ posts }: { posts: PostCardData[] }) {
  return (
    <section className="bg-[#FAFBFF] py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Blog" title="Acesse conteúdos contábeis atualizados" />

        {posts.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.url} delay={i * 80}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <ButtonLink href="/noticias-contabeis/" variant="outline" size="lg">
            Veja mais artigos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
