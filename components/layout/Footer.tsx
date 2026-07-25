import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappLink } from "@/lib/site.config";

const year = new Date().getFullYear();

/** Rodapé com NAP, navegação, redes e horário — tudo do site.config. */
export function Footer() {
  const { contact, address, hours, social } = siteConfig;

  return (
    <footer className="mt-auto border-t border-ink-100 bg-ink-900 text-ink-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="lg:col-span-1">
          <Link href="/" className="text-lg font-extrabold text-white">
            Visa<span className="text-teal-400"> Contabilidade</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Contabilidade especializada em Cascavel-PR há mais de 20 anos, com foco em planejamento
            tributário e crescimento seguro do seu negócio.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={social.instagram} label="Instagram" />
            <SocialLink href={social.facebook} label="Facebook" />
          </div>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé" className="text-sm">
          <h3 className="mb-4 font-semibold text-white">Navegação</h3>
          <ul className="space-y-2">
            {siteConfig.nav
              .filter((i) => i.href !== "#")
              .map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="hover:text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Contato */}
        <div className="text-sm">
          <h3 className="mb-4 font-semibold text-white">Contato</h3>
          <ul className="space-y-2">
            <li>
              <a href={`tel:${contact.phoneRaw}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} className="hover:text-white">
                WhatsApp {contact.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Endereço + horário */}
        <div className="text-sm">
          <h3 className="mb-4 font-semibold text-white">Onde estamos</h3>
          <address className="not-italic leading-relaxed text-ink-400">
            {address.street}
            <br />
            {address.district}, {address.city} - {address.state}
            <br />
            CEP {address.zip}
          </address>
          <p className="mt-4 text-ink-400">{hours.label}</p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-400 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade/" className="hover:text-white">
            Política de Privacidade
          </Link>
        </Container>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-500"
    >
      <span className="text-xs font-bold">{label[0]}</span>
    </a>
  );
}
