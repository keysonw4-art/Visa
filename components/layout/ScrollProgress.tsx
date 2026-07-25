"use client";

import { useEffect, useState } from "react";

/**
 * Indicador de progresso de scroll "líquido" (estilo sk-agency).
 * Uma cápsula de tamanho médio, fixa no meio da lateral direita, que se enche
 * de baixo para cima conforme a página rola — com gradiente fluindo e ondas na
 * superfície (efeito líquido). Só no desktop e quando a página realmente rola.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0); // 0..1
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Só o desktop mostra o indicador (lg:block); no mobile não anexamos nada,
    // evitando trabalho de scroll/observer que não teria efeito visível (INP).
    const mq = window.matchMedia("(min-width: 1024px)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (!mq.matches) {
        setActive(false);
        return;
      }
      const update = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setActive(max > 8);
        setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
      };
      update();
      const raf = requestAnimationFrame(update);
      const timers = [setTimeout(update, 200), setTimeout(update, 800)];
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      window.addEventListener("load", update);
      const ro = new ResizeObserver(update);
      ro.observe(document.body);
      cleanup = () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        window.removeEventListener("load", update);
        ro.disconnect();
      };
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      cleanup();
      mq.removeEventListener("change", setup);
    };
  }, []);

  if (!active) return null;

  // Nível do líquido — mínimo pequeno para as ondas ficarem visíveis já no topo.
  const fillPct = Math.max(5, progress * 100);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[36vh] max-h-[400px] min-h-[200px] w-2.5 -translate-y-1/2 lg:block"
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-brand-100/60 ring-1 ring-inset ring-brand-200/50">
        {/* Corpo do líquido — sobe conforme o progresso. */}
        <div
          className="liquid-body absolute inset-x-0 bottom-0 rounded-b-full"
          style={{ height: `${fillPct}%`, transition: "height 120ms linear" }}
        >
          {/* Superfície ondulada (duas camadas para dar profundidade). */}
          <div className="liquid-wave liquid-wave--back absolute inset-x-0 top-0 h-3.5 -translate-y-[9px]" />
          <div className="liquid-wave absolute inset-x-0 top-0 h-3.5 -translate-y-[7px]" />
        </div>
      </div>
    </div>
  );
}
