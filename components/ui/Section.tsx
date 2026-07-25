import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

/** Bloco de seção com espaçamento vertical padrão e container opcional. */
export function Section({
  as: Tag = "section",
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  containerClassName?: string;
  /** Se true, não envolve num Container (para seções full-bleed). */
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
