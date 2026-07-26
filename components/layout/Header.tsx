"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils/cn";

/** Cabeçalho com navegação, dropdowns (Serviços/Especialidades) e menu mobile. */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Logo oficial */}
        <Link href="/" aria-label="Visa Contabilidade — página inicial" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.webp"
            alt="Visa Contabilidade"
            width={707}
            height={419}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-700 hover:text-brand-600">
                  {item.label}
                  <Chevron />
                </button>
                <div className="invisible absolute left-0 top-full min-w-64 rounded-xl border border-ink-100 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-brand-600"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/escritorio-contabil/" variant="primary">
            Fale conosco
          </ButtonLink>
        </div>

        {/* Toggle mobile */}
        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-current transition", mobileOpen && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", mobileOpen && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", mobileOpen && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </Container>

      {/* Menu mobile */}
      {mobileOpen && (
        <nav className="border-t border-ink-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <span className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-ink-400">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base text-ink-700 hover:bg-brand-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-brand-50"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <ButtonLink href="/escritorio-contabil/" variant="primary" className="mt-3">
              Fale conosco
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}

function Chevron() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
