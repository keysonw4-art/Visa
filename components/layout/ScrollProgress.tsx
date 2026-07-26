"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scrubber de scroll interativo (estilo barra de progresso de vídeo), fixo no
 * meio da lateral direita e destacado da borda. Mantém o visual "líquido" da
 * marca, mas é FUNCIONAL: clique em qualquer ponto pula para a posição
 * correspondente e arrastar rola a página em tempo real. Só no desktop.
 */
export function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [active, setActive] = useState(false);

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    setActive(max > 8);
    setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
  }, []);

  useEffect(() => {
    // Só o desktop mostra/usa o scrubber (evita trabalho no mobile).
    const mq = window.matchMedia("(min-width: 1024px)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (!mq.matches) {
        setActive(false);
        return;
      }
      measure();
      const raf = requestAnimationFrame(measure);
      const timers = [setTimeout(measure, 200), setTimeout(measure, 800)];
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("resize", measure);
      window.addEventListener("load", measure);
      const ro = new ResizeObserver(measure);
      ro.observe(document.body);
      cleanup = () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        window.removeEventListener("scroll", measure);
        window.removeEventListener("resize", measure);
        window.removeEventListener("load", measure);
        ro.disconnect();
      };
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      cleanup();
      mq.removeEventListener("change", setup);
    };
  }, [measure]);

  // Rola para a posição proporcional ao Y do ponteiro dentro do track.
  const scrubTo = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * max });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    scrubTo(e.clientY);
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* pointer não capturável (ex.: ambientes de teste) — segue sem capturar */
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) scrubTo(e.clientY);
  };
  const endDrag = (e: React.PointerEvent) => {
    draggingRef.current = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  if (!active) return null;
  const pct = progress * 100;

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="group fixed right-2 top-1/2 z-40 hidden h-[38vh] max-h-[420px] min-h-[220px] w-6 -translate-y-1/2 cursor-pointer touch-none select-none lg:flex lg:items-center lg:justify-center"
    >
      {/* Cápsula visual (fina) */}
      <div className="relative h-full w-2.5 rounded-full bg-brand-100/70 ring-1 ring-inset ring-brand-200/60 transition-[width] group-hover:w-3">
        {/* Preenchimento líquido — de cima até a posição atual (tempo real). */}
        <div
          className="liquid-body absolute inset-x-0 top-0 overflow-hidden rounded-full"
          style={{ height: `${pct}%` }}
        />
        {/* Pegador (handle) na posição atual — sinaliza que dá pra arrastar. */}
        <div
          className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 bg-white shadow-md transition-transform group-hover:scale-110 group-active:scale-95"
          style={{ top: `${pct}%` }}
        />
      </div>
    </div>
  );
}
