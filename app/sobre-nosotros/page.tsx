import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la esencia de Orquideas Garden, Floral Boutique especializada en arreglos premium en Bogotá.",
  alternates: {
    canonical: absoluteUrl("/sobre-nosotros"),
  },
  openGraph: {
    title: "Sobre Nosotros | Orquideas Garden",
    description:
      "Conoce la esencia de Orquideas Garden, Floral Boutique especializada en arreglos premium en Bogotá.",
    url: absoluteUrl("/sobre-nosotros"),
    type: "website",
    locale: "es_CO",
  },
};

export default function AboutPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Identidad de marca</p>
      <h1 className="section-title">Sobre Nosotros</h1>
      <p className="brand-subtitle mt-1">Floral Boutique · Bogotá</p>
      <div className="mt-8 card-shell space-y-4 text-sm leading-relaxed text-smoke sm:text-base">
        <p>
          En {SITE_NAME} diseñamos arreglos de orquídeas para momentos importantes: celebrar,
          agradecer, acompañar y honrar.
        </p>
        <p>
          Nuestro lineamiento de marca combina elegancia editorial, paleta lavanda-mauve y una
          experiencia de compra clara para transmitir sofisticación desde el primer contacto.
        </p>
        <p>
          Cada colección se presenta con narrativa cuidada y una ruta simple de conversión:
          colección, producto y checkout seguro.
        </p>
      </div>
    </main>
  );
}

