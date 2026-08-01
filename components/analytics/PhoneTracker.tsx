"use client";

import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics/dataLayer";

/**
 * Rastreia CLIQUES em qualquer link telefônico (`tel:` — chamada direta) em
 * qualquer lugar do site, sem precisar instrumentar cada botão.
 *
 * Usa "event delegation" no <body>: um único listener captura o click, caminha
 * pra cima até achar o <a>, e dispara `pushEvent("phone_click", ...)` com
 * contexto do que foi clicado (aria-label / texto do botão / path atual).
 *
 * No GTM: criar trigger "Custom Event" com nome exato "phone_click" (útil pra
 * contar ligações como conversão no Google Ads).
 */
export function PhoneTracker() {
  useEffect(() => {
    const isTelHref = (href: string | null) =>
      !!href && /^tel:/i.test(href);

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor || !isTelHref(anchor.getAttribute("href"))) return;

      pushEvent("phone_click", {
        source: (anchor.getAttribute("aria-label") || anchor.innerText || "phone").trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
