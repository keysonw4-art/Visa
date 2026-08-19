import Image from "next/image";
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
          <Link href="/" aria-label="Visa Contabilidade — página inicial" className="inline-flex">
            <Image
              src="/images/logo.webp"
              alt="Visa Contabilidade"
              width={707}
              height={419}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Contabilidade especializada em Cascavel-PR desde 1985, com foco em planejamento
            tributário e crescimento seguro do seu negócio.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={social.instagram} label="Instagram" icon="instagram" />
            <SocialLink href={social.facebook} label="Facebook" icon="facebook" />
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
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/politica-de-privacidade/" className="hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/mapa-do-site/" className="hover:text-white">
              Mapa do Site
            </Link>
            <span>
              Desenvolvido por{" "}
              <a
                href="https://www.skagency.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-300 transition-colors hover:text-[#e8461e]"
              >
                skagency
              </a>
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/** Glyphs monocromáticos das marcas (fill: currentColor herda a cor do botão). */
const socialIcons = {
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  ),
  facebook: (
    <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.61v3.56h3.07V22h3.68v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" />
  ),
} as const;

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: keyof typeof socialIcons;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-500"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
      >
        {socialIcons[icon]}
      </svg>
    </a>
  );
}
