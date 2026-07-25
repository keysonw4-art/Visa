"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Revela o conteúdo com um fade+slide suave ao entrar na viewport.
 * Usa UM ÚNICO IntersectionObserver compartilhado por todos os <Reveal> da
 * página (em vez de um observer por instância) — menos overhead com muitas
 * seções. Respeita prefers-reduced-motion via globals.css.
 */

type Cb = () => void;
let sharedObserver: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Cb>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.();
            sharedObserver!.unobserve(entry.target);
            callbacks.delete(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
  }
  return sharedObserver;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: React.ElementType;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) {
      setVisible(true); // sem observer (SSR/legado) → mostra direto
      return;
    }
    callbacks.set(el, () => setVisible(true));
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
