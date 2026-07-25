import type { Thing, WithContext } from "schema-dts";

/**
 * Injeta JSON-LD (schema.org) de forma segura no HTML.
 * Base do SEO estruturado + GEO/AISO (buscadores de IA leem structured data).
 */
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify de dados controlados por nós (não vêm do usuário).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
