import Link from "next/link";

import { getCategoriesWithCounts } from "@/lib/blog";
import { cn } from "@/lib/utils/cn";

/** Chips de categorias do blog (todas + cada consolidada), com a ativa destacada. */
export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const categories = getCategoriesWithCounts();

  return (
    <nav aria-label="Categorias do blog" className="flex flex-wrap justify-center gap-2">
      <Chip href="/noticias-contabeis/" active={!activeSlug}>
        Todos
      </Chip>
      {categories.map((c) => (
        <Chip
          key={c.slug}
          href={`/noticias-contabeis/categoria/${c.slug}/`}
          active={activeSlug === c.slug}
        >
          {c.name}
          <span className="ml-1 text-xs opacity-70">({c.count})</span>
        </Chip>
      ))}
    </nav>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-600",
      )}
    >
      {children}
    </Link>
  );
}
