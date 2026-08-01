import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site.config";

// URL do embed exportada do Google Maps (Compartilhar → Incorporar).
// Não requer API key; carrega via iframe lazy do browser.
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.2870362727144!2d-53.46515442387223!3d-24.956347014320976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3d411bb08b301%3A0x78f0070439823fd2!2sVisa%20Contabilidade%20-%20Contabilidade%20e%20Consultoria!5e0!3m2!1spt-PT!2sbr!4v1785628400625!5m2!1spt-PT!2sbr";

/**
 * Seção "Onde estamos" — mapa do Google embutido + CTA de rota.
 *
 * O iframe usa `loading="lazy"` nativo do browser, então só baixa quando
 * entra na área visível. Zero API key, zero custo. Se o usuário quiser
 * abrir no app nativo do Maps, o botão "Como chegar" leva pra URL de
 * busca canônica (funciona em iOS/Android/desktop igual).
 */
export function ContactMap() {
  const { address, name } = siteConfig;

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${name}, ${address.street}, ${address.district}, ${address.city} - ${address.state}, ${address.zip}`,
  )}`;

  return (
    <section aria-labelledby="mapa-heading" className="bg-brand-50/40 py-16 lg:py-20">
      <Container>
        <div className="mb-8 text-center">
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-400">
            Onde estamos
          </span>
          <h2 id="mapa-heading" className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            No coração do Centro de Cascavel
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-600">
            {address.street} — {address.district}, {address.city}-{address.state}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <iframe
              src={MAP_EMBED_URL}
              title={`Mapa da ${name} em ${address.city}-${address.state}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonLink href={directionsHref} external size="lg">
            Como chegar (Google Maps)
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
