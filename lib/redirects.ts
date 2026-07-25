/**
 * Redirecionamentos 301 herdados do WordPress antigo (plugin Redirection).
 *
 * Preservam o SEO das URLs antigas que mudaram de slug ao longo do tempo.
 * As cadeias (URL antiga → intermediária → atual) foram ACHATADAS: cada origem
 * aponta direto para o destino final canônico (menos saltos, melhor para SEO).
 *
 * Estes foram descobertos/validados testando o site antigo (ainda no ar) — cobrem
 * todas as páginas institucionais. A lista COMPLETA (incluindo posts do blog e
 * redirects customizados) será gerada por `scripts/convert-redirects.mjs` a partir
 * da exportação JSON do plugin, que sobrescreve este arquivo.
 */

export type Redirect = { source: string; destination: string };

export const redirects: Redirect[] = [
  { source: "/index.php", destination: "/" },
  // Contato
  { source: "/contato", destination: "/escritorio-contabil/" },
  { source: "/escritorio-contabil-no-centro-de-cascavel-pr", destination: "/escritorio-contabil/" },
  { source: "/escritorio-contabil-em-cascavel-pr", destination: "/escritorio-contabil/" },
  // Sobre
  { source: "/sobre", destination: "/escritorio-de-contabilidade/" },
  { source: "/escritorio-de-contabilidade-no-centro-de-cascavel-pr", destination: "/escritorio-de-contabilidade/" },
  { source: "/escritorio-de-contabilidade-em-cascavel-pr", destination: "/escritorio-de-contabilidade/" },
  // Abertura de empresa
  { source: "/abertura-de-empresa-no-centro-de-cascavel-pr", destination: "/abertura-de-empresa/" },
  { source: "/abertura-de-empresa-em-cascavel-pr", destination: "/abertura-de-empresa/" },
  // Análise tributária
  { source: "/analise-tributaria", destination: "/analise-tributaria-para-empresas/" },
  { source: "/analise-tributaria-no-centro-de-cascavel-pr", destination: "/analise-tributaria-para-empresas/" },
  { source: "/analise-tributaria-em-cascavel-pr", destination: "/analise-tributaria-para-empresas/" },
  // Planejamento sucessório
  { source: "/planejamento-sucessorio-no-centro-de-cascavel-pr", destination: "/planejamento-sucessorio/" },
  { source: "/planejamento-sucessorio-em-cascavel-pr", destination: "/planejamento-sucessorio/" },
  // Troca de contabilidade
  { source: "/troca-de-contabilidade-no-centro-de-cascavel-pr", destination: "/troca-de-contabilidade/" },
  { source: "/troca-de-contabilidade-em-cascavel-pr", destination: "/troca-de-contabilidade/" },
  // Especialidades
  { source: "/contabilidade-para-comercio-no-centro-de-cascavel-pr", destination: "/contabilidade-para-comercio/" },
  { source: "/contabilidade-para-comercio-em-cascavel-pr", destination: "/contabilidade-para-comercio/" },
  { source: "/contabilidade-para-industria-no-centro-de-cascavel-pr", destination: "/contabilidade-para-industria/" },
  { source: "/contabilidade-para-industria-em-cascavel-pr", destination: "/contabilidade-para-industria/" },
  { source: "/contabilidade-para-prestadores-de-servico-no-centro-de-cascavel-pr", destination: "/contabilidade-para-prestadores-de-servico/" },
  { source: "/contabilidade-para-prestadores-de-servico-em-cascavel-pr", destination: "/contabilidade-para-prestadores-de-servico/" },
  // Blog
  { source: "/noticias", destination: "/noticias-contabeis/" },
  // Posts que mudaram de slug (_wp_old_slug nativo do WordPress)
  {
    source: "/imposto-no-municipio-errado-guia-e-consultoria-tributaria",
    destination: "/imposto-no-municipio-errado/",
  },
  {
    source: "/planejamento-tributario-industrial-2026-estrategias-e-incentivos-no-pr",
    destination: "/planejamento-tributario-industrial-2026/",
  },
];
