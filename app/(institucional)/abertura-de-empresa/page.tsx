import type { Metadata } from "next";

import { ServicePage } from "@/components/templates/ServicePage";
import { servicePages } from "@/lib/content/service-pages";
import { pageMetadata } from "@/lib/seo/metadata";

const data = servicePages["abertura-de-empresa"];

export const metadata: Metadata = pageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: "/abertura-de-empresa/",
  image: data.hero.image,
});

export default function AberturaDeEmpresaPage() {
  return <ServicePage data={data} />;
}
