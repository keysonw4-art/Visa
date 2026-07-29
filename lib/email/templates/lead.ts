import "server-only";

import { phoneDigits } from "@/lib/utils/phone";
import { siteConfig } from "@/lib/site.config";
import type { LeadEmail } from "@/lib/email/provider";

// URL absoluta obrigatória em e-mail HTML. PNG (não WebP) porque o proxy de
// imagens do Gmail (googleusercontent/ggpht) achata o alpha de WebPs — resultado:
// fundo preto no lugar da transparência. PNG preserva transparência em todos
// os clientes de e-mail sem exceção.
const LOGO_URL = `${siteConfig.url}/images/logo.png`;

/**
 * Template do e-mail de lead — versões HTML e texto (fallback).
 * HTML usa técnicas "email-safe" (tabelas, inline styles) e é responsivo.
 * Cores da marca: azul #0077bb, teal #119ba8, ink #18181b.
 */

/** Escapa caracteres HTML pra evitar XSS a partir de dados do lead. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Formata data BR completa: "28/07/2026 às 20:34". */
function fmtDate(d = new Date()): string {
  const date = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${date} às ${time}`;
}

/** wa.me com número BR (adiciona 55 se veio só com DDD+número). */
function whatsappUrl(phone: string): string {
  const d = phoneDigits(phone);
  const withCountry = d.startsWith("55") ? d : `55${d}`;
  return `https://wa.me/${withCountry}`;
}

export function renderLeadText(lead: LeadEmail): string {
  return [
    `Novo contato recebido — ${fmtDate()}`,
    `Origem: ${lead.source}`,
    "",
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    lead.phone ? `WhatsApp: ${lead.phone}` : null,
    "",
    lead.message ? `Mensagem:\n${lead.message}` : "(sem mensagem)",
    "",
    "—",
    "Responda diretamente a este e-mail para falar com o interessado.",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

export function renderLeadHtml(lead: LeadEmail): string {
  const name = esc(lead.name);
  const email = esc(lead.email);
  const phone = lead.phone ? esc(lead.phone) : "";
  const message = lead.message ? esc(lead.message).replace(/\n/g, "<br>") : "";
  const source = esc(lead.source);
  const when = esc(fmtDate());
  const wa = lead.phone ? whatsappUrl(lead.phone) : "";

  // Estilos inline (email-safe) — nada de <style>, nada de classes.
  const s = {
    page: "margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18181b;",
    outer: "width:100%;background:#f4f4f5;padding:24px 12px;",
    card: "max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);",
    header: "background:#ffffff;padding:32px 32px 24px;text-align:center;border-bottom:1px solid #e4e4e7;",
    logo: "display:block;height:56px;width:auto;margin:0 auto;",
    headerP: "margin:16px 0 0;color:#71717a;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;",
    body: "padding:32px;",
    tag: "display:inline-block;background:#eaf5fc;color:#0077bb;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;padding:5px 10px;border-radius:999px;",
    name: "margin:12px 0 24px;font-family:Georgia,'Times New Roman',Times,serif;font-size:24px;font-weight:400;color:#18181b;line-height:1.3;letter-spacing:-0.2px;",
    label: "font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:#71717a;margin:0 0 4px;",
    value: "font-size:15px;color:#18181b;margin:0 0 20px;word-break:break-word;",
    link: "color:#0077bb;text-decoration:none;font-weight:600;",
    msgBox: "background:#f9fafb;border-left:3px solid #119ba8;padding:16px 20px;border-radius:8px;margin:0 0 24px;",
    msgText: "font-size:15px;color:#3f3f46;margin:0;line-height:1.6;white-space:pre-wrap;",
    actions: "padding:24px 0 4px;text-align:center;",
    btnPrimary: "display:inline-block;background:#0077bb;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;margin:4px;",
    btnWpp: "display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;margin:4px;",
    footer: "padding:20px 32px;background:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;text-align:center;",
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Novo contato — Visa Contabilidade</title>
</head>
<body style="${s.page}">
  <div style="${s.outer}">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${s.card}">
      <tr><td style="${s.header}">
        <img src="${LOGO_URL}" alt="${esc(siteConfig.name)}" style="${s.logo}" width="94" height="56">
        <p style="${s.headerP}">Novo contato recebido</p>
      </td></tr>

      <tr><td style="${s.body}">
        <span style="${s.tag}">${source}</span>
        <h2 style="${s.name}">${name}</h2>

        <p style="${s.label}">E-mail</p>
        <p style="${s.value}"><a href="mailto:${email}" style="${s.link}">${email}</a></p>

        ${
          phone
            ? `<p style="${s.label}">WhatsApp / Telefone</p>
        <p style="${s.value}"><a href="tel:${esc(phoneDigits(lead.phone!))}" style="${s.link}">${phone}</a></p>`
            : ""
        }

        <p style="${s.label}">Mensagem</p>
        ${
          message
            ? `<div style="${s.msgBox}"><p style="${s.msgText}">${message}</p></div>`
            : `<p style="${s.value};color:#a1a1aa;font-style:italic;">(sem mensagem — o contato preferiu não deixar detalhes)</p>`
        }

        <div style="${s.actions}">
          <a href="mailto:${email}?subject=Re:%20Contato%20via%20site%20-%20Visa%20Contabilidade" style="${s.btnPrimary}">Responder por e-mail</a>
          ${wa ? `<a href="${wa}" style="${s.btnWpp}">Chamar no WhatsApp</a>` : ""}
        </div>
      </td></tr>

      <tr><td style="${s.footer}">
        Recebido em ${when} · Origem: ${source}<br>
        Basta clicar em <strong>Responder</strong> no seu cliente de e-mail para responder direto ao interessado.
      </td></tr>
    </table>
  </div>
</body>
</html>`;
}
