import { cn } from "@/lib/utils/cn";

/**
 * Cabeçalho de seção padrão do site: eyebrow pequeno + título grande.
 * Escala fiel ao atual (eyebrow ~13px, H2 ~43px).
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "dark",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "block text-xs font-bold uppercase tracking-widest",
            tone === "light" ? "text-brand-200" : "text-brand-300",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 text-[clamp(1.6rem,4.5vw,2.25rem)] font-extrabold leading-tight",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {children && (
        <div className={cn("mt-4 text-lg", tone === "light" ? "text-brand-50" : "text-ink-600")}>
          {children}
        </div>
      )}
    </div>
  );
}
