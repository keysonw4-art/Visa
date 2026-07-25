"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";

type Counter = { value: number; suffix?: string; prefix?: string; label: string };

const counters: Counter[] = [
  { value: 20, prefix: "+", label: "anos de experiência" },
  { value: 200, prefix: "+", label: "clientes ativos" },
  { value: 3, label: "áreas de especialidade" },
  { value: 15, label: "especialistas" },
];

/** Contadores animados (About) — sobem quando entram na viewport. */
export function Counters() {
  return (
    <section className="bg-brand-700 py-14 text-white">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c) => (
            <CounterItem key={c.label} counter={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CounterItem({ counter }: { counter: Counter }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setN(counter.value);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * counter.value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [counter.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold sm:text-5xl">
        {counter.prefix}
        {n}
        {counter.suffix}
      </div>
      <p className="mt-2 text-brand-100">{counter.label}</p>
    </div>
  );
}
