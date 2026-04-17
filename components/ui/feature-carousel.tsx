"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CarouselImage = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  title: ReactNode;
  subtitle: string;
  images: CarouselImage[];
  className?: string;
  style?: CSSProperties;
};

export function HeroSection({ title, subtitle, images, className, style }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <section className={cn("relative overflow-hidden border p-4 sm:p-6", className)} style={style}>
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        <div className="flex flex-col rounded-2xl border border-white/55 bg-white/68 p-5 shadow-soft backdrop-blur sm:p-8 lg:min-h-[520px]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-pearl/75">Orquideas Garden</p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.92] text-ivory sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm text-pearl/85 sm:text-base">{subtitle}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
            <Link href="/colecciones" className="btn-brand-primary">
              Ver colecciones
            </Link>
            <Link href="/cotizacion" className="btn-brand-secondary">
              Solicitar cotizacion
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/70 bg-white/20 shadow-soft sm:min-h-[520px]">
          <div className="absolute inset-0">
            {images.map((image, index) => (
              <div
                key={image.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  index === activeIndex ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 52%, rgba(42,26,68,0.14) 100%)",
            }}
          />

          <button
            type="button"
            onClick={goPrev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/82 text-ivory shadow-soft backdrop-blur transition hover:bg-white sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/82 text-ivory shadow-soft backdrop-blur transition hover:bg-white sm:right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-white/65 px-3 py-2 backdrop-blur">
            {images.map((image, dotIndex) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(dotIndex)}
                aria-label={`Ir a imagen ${dotIndex + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  dotIndex === activeIndex ? "w-7 bg-ivory" : "w-2.5 bg-ivory/35 hover:bg-ivory/60",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
