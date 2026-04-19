"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL } from "@/lib/site";

type StatItem = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

const stats: StatItem[] = [
  {
    id: "orchids",
    label: "Orqu\u00EDdeas entregadas",
    value: 2500,
    prefix: "+",
  },
  {
    id: "since",
    label: "Acompa\u00F1ando desde",
    value: 2016,
  },
  {
    id: "daily",
    label: "Entregas todos los d\u00EDas",
    value: 7,
    suffix: "/7",
  },
];

function formatValue(value: number) {
  return value.toLocaleString("es-CO");
}

export function TrustStats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) return;

    const duration = 2400;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);

      setAnimatedCounts(
        Object.fromEntries(
          stats.map((item) => [item.id, Math.round(item.value * progress)]),
        ),
      );

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [inView, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="rounded-3xl border p-5 sm:p-7"
      style={{
        borderColor: "rgba(184,160,212,0.44)",
        background:
          "radial-gradient(circle at 15% 14%, rgba(212,196,240,0.28), transparent 36%), radial-gradient(circle at 90% 16%, rgba(240,200,216,0.22), transparent 34%), linear-gradient(160deg, #fdf0f4 0%, #faf7f5 100%)",
      }}
    >
      <div className="mb-6 text-center sm:mb-8">
        <p className="eyebrow">Confianza en números</p>
        <h2 className="section-title mt-2">Cifras que respaldan nuestro trabajo</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.015,
              boxShadow: "0 16px 34px rgba(122, 74, 148, 0.18)",
              borderColor: "rgba(122,106,180,0.55)",
            }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="rounded-2xl border border-[#e8dce4] bg-white/95 p-5 text-center shadow-soft"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#9a7a8a]">{item.label}</p>
            <p className="mt-3 font-display text-5xl leading-none text-[#2a1a44] drop-shadow-[0_1px_0_rgba(255,255,255,0.65)] sm:text-6xl">
              {item.prefix}
              {formatValue(animatedCounts?.[item.id] ?? item.value)}
              {item.suffix}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand-primary inline-flex min-w-[240px] justify-center text-center"
        >
          Ir a WhatsApp
        </Link>
        <Link
          href="/cotizacion"
          className="btn-brand-secondary inline-flex min-w-[240px] justify-center text-center"
        >
          Solicitar cotización
        </Link>
      </div>
    </section>
  );
}
