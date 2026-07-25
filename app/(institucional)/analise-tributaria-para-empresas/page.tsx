import type { Metadata } from "next";

import { ServicePage } from "@/components/templates/ServicePage";
import { servicePages } from "@/lib/content/service-pages";
import { pageMetadata } from "@/lib/seo/metadata";

const data = servicePages["analise-tributaria-para-empresas"];

export const metadata: Metadata = pageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: "/analise-tributaria-para-empresas/",
  image: data.hero.image,
});

export default function Page() {
  return <ServicePage data={data} />;
}
