import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  secondary: "bg-teal-500 text-white hover:bg-teal-600",
  outline: "border border-brand-500 text-brand-600 hover:bg-brand-50",
  ghost: "text-brand-600 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/** Botão como link interno/externo. */
export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Botão de ação (submit etc.). */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
