"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import type { Faq } from "@/lib/content/home";
import { cn } from "@/lib/utils/cn";
import { SectionHeading } from "./SectionHeading";

/**
 * FAQ em accordion. O JSON-LD FAQPage é injetado separadamente (camada SEO),
 * usando os mesmos dados — bom para GEO/rich results.
 */
export function FaqAccordion({
  eyebrow = "Perguntas frequentes",
  title = "Tire suas dúvidas antes do primeiro atendimento com a nossa equipe",
  items,
  background = "brand-50",
}: {
  eyebrow?: string;
  title?: string;
  items: Faq[];
  background?: "brand-50" | "white";
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={cn("py-16 lg:py-24", background === "brand-50" ? "bg-brand-50" : "bg-white")}>
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-12 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-ink-800">{item.q}</span>
                  <svg
                    className={cn("h-5 w-5 shrink-0 text-brand-500 transition-transform", isOpen && "rotate-180")}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
