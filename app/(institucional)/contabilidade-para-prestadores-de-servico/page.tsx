import type { Metadata } from "next";

import { ServicePage } from "@/components/templates/ServicePage";
import { servicePages } from "@/lib/content/service-pages";
import { pageMetadata } from "@/lib/seo/metadata";

const data = servicePages["contabilidade-para-prestadores-de-servico"];

export const metadata: Metadata = pageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: "/contabilidade-para-prestadores-de-servico/",
  image: data.hero.image,
});

export default function Page() {
  return <ServicePage data={data} />;
}
