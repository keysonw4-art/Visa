"use client";

import { useEffect } from "react";

import { pushEvent } from "@/lib/analytics/dataLayer";

/**
 * Rastreia CLIQUES em qualquer link para WhatsApp (`wa.me` / `whatsapp.com`)
 * em qualquer lugar do site, sem precisar instrumentar cada botão.
 *
 * Usa "event delegation" no <body>: um único listener captura o click,
 * caminha pra cima até achar o <a>, e dispara `pushEvent("whatsapp_click", ...)`
 * com contexto do que foi clicado (aria-label / texto do botão / path atual).
 *
 * No GTM: criar trigger "Custom Event" com nome exato "whatsapp_click".
 */
export function WhatsAppTracker() {
  useEffect(() => {
    const isWhatsappHref = (href: string | null) =>
      !!href && /^(https?:)?\/\/(wa\.me|(api\.)?whatsapp\.com)\//i.test(href);

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor || !isWhatsappHref(anchor.getAttribute("href"))) return;

      pushEvent("whatsapp_click", {
        source: (anchor.getAttribute("aria-label") || anchor.innerText || "whatsapp").trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    };

    // capture: pega o clique mesmo se o handler do próprio botão fizer preventDefault.
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
