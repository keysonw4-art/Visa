import { HomeHero } from "@/components/sections/HomeHero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLatestPosts } from "@/lib/blog";
import { services } from "@/lib/content/services";
import { homeFaqs } from "@/lib/content/home";
import { testimonials } from "@/lib/content/testimonials";
import { faqSchema, reviewsSchema } from "@/lib/schema";

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <JsonLd data={reviewsSchema()} />
      <HomeHero />
      <TrustBadges />
      <WhyChoose />
      <ServicesGrid
        title="Oferecemos serviços estratégicos para cada etapa da jornada do seu negócio"
        items={services}
      />
      <Testimonials reviews={testimonials} />
      <SolutionsGrid />
      <FaqAccordion items={homeFaqs} />
      <BlogPreview posts={latestPosts} />
      <CtaBand />
    </>
  );
}
