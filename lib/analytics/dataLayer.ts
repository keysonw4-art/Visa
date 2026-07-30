"use client";

/**
 * Empurra um evento pro dataLayer do GTM.
 * Seguro em SSR (checa window) e no-op se o GTM não estiver carregado
 * (produção-only, ver GoogleTagManager.tsx).
 *
 * Uso:
 *   pushEvent("form_submit", { source: "contact" });
 *   pushEvent("whatsapp_click", { source: "float" });
 *
 * No GTM, o cliente cria triggers "Custom Event" com o mesmo nome do 1º arg
 * ("form_submit", "whatsapp_click"), e usa as chaves do payload como
 * "Data Layer Variables" nas tags de conversão do Google Ads.
 */
export function pushEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
}
