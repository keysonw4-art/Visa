/** Utilitários de telefone/WhatsApp brasileiro. */

/** Só os dígitos (até 11). Remove o "55" do código do país se vier em E.164
 *  (padrão do autofill do Chrome: "5511900000000"). */
export function phoneDigits(value: string): string {
  let d = value.replace(/\D/g, "");
  // 12 ou 13 dígitos começando com 55 = número BR em formato internacional.
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}

/**
 * Formata progressivamente como WhatsApp/celular brasileiro: (11) 99999-9999.
 * Aceita digitação parcial (mostra a máscara conforme o usuário digita).
 */
export function formatPhoneBR(value: string): string {
  const d = phoneDigits(value);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Válido = 10 (fixo) ou 11 (celular) dígitos. */
export function isValidPhoneBR(value: string): boolean {
  const len = phoneDigits(value).length;
  return len === 10 || len === 11;
}
