import Link from "next/link";

import { cn } from "@/lib/utils/cn";

/** Paginação numérica do blog. Página 1 = /noticias-contabeis/, demais = /page/N/. */
export function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  const href = (p: number) => (p === 1 ? "/noticias-contabeis/" : `/noticias-contabeis/page/${p}/`);
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} className={linkClass(false)} aria-label="Página anterior">
          ‹
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === current ? "page" : undefined}
          className={linkClass(p === current)}
        >
          {p}
        </Link>
      ))}
      {current < total && (
        <Link href={href(current + 1)} className={linkClass(false)} aria-label="Próxima página">
          ›
        </Link>
      )}
    </nav>
  );
}

function linkClass(active: boolean) {
  return cn(
    "flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors",
    active
      ? "bg-brand-500 text-white"
      : "border border-ink-200 text-ink-700 hover:border-brand-300 hover:text-brand-600",
  );
}
