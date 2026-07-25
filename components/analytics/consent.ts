"use client";

/** Utilitários de consentimento (LGPD + Google Consent Mode v2). */

export const CONSENT_KEY = "visa-consent";

export type ConsentValue = "granted" | "denied";

/** Lê a decisão salva; null = usuário ainda não decidiu. */
export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Persiste a decisão e atualiza o Google Consent Mode. */
export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignora storage indisponível */
  }
  updateGoogleConsent(value);
}

/** Empurra o consentimento atualizado para o dataLayer (gtag). */
export function updateGoogleConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  }
  gtag("consent", "update", {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}
