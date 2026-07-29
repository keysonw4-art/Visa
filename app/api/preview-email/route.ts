import { NextResponse } from "next/server";

import { renderLeadHtml } from "@/lib/email/templates/lead";

/**
 * Endpoint SOMENTE PARA DEV — renderiza o template do e-mail de lead com dados
 * de exemplo, pra conferir visualmente sem ter que enviar e-mail real.
 * Retorna 404 em produção pra não vazar template ou virar superfície de teste.
 * Acesso: http://localhost:3000/api/preview-email/
 */
export const runtime = "nodejs";

export function GET(): Response {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = renderLeadHtml({
    source: "Contato",
    name: "Maria Silva Oliveira",
    email: "maria.silva@empresadela.com.br",
    phone: "(45) 99521-3619",
    message:
      "Olá! Sou dona de uma indústria em Cascavel e quero migrar minha contabilidade. Podem me passar uma proposta? Faturamento em torno de R$ 500 mil/mês. Aguardo retorno.",
  });

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
