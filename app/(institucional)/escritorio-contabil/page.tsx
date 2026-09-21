import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappLink } from "@/lib/site.config";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contato — Escritório de Contabilidade em Cascavel-PR",
  description:
    "Fale com a Visa Contabilidade em Cascavel-PR. Telefone (11) 90000-0000, WhatsApp, e-mail e endereço no Centro. Preencha o formulário e transforme sua gestão contábil hoje mesmo.",
  path: "/escritorio-contabil/",
});

export default function ContatoPage() {
  const { contact, address, hours } = siteConfig;

  const infos = [
    { label: "Telefone", value: contact.phone, href: `tel:${contact.phoneRaw}` },
    { label: "WhatsApp", value: contact.whatsapp.display, href: whatsappLink() },
    { label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    {
      label: "Endereço",
      value: `${address.street} - ${address.district}, ${address.city} - ${address.state}, ${address.zip}`,
    },
    { label: "Horário de atendimento", value: hours.label },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Entre em contato conosco!"
        breadcrumb="Contato"
        image="/images/contato-img-1.webp"
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-300">
              Fale com a nossa equipe
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl">
              Preencha o formulário e comece a transformar sua gestão contábil hoje mesmo
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:pl-8">
            <ul className="space-y-6">
              {infos.map((info) => (
                <li key={info.label} className="rounded-2xl border border-ink-100 bg-brand-50/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-400">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a href={info.href} className="mt-1 block font-semibold text-ink-800 hover:text-brand-600">
                      {info.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold text-ink-800">{info.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ContactMap />
    </>
  );
}
