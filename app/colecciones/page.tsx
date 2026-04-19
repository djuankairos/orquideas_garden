import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { collections } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colecciones de Orquideas",
  description:
    "Explora las colecciones de Orquideas Garden: Cromadas, Regalo y Condolencias.",
  alternates: {
    canonical: absoluteUrl("/colecciones"),
  },
  openGraph: {
    title: "Colecciones \u2013 Orqu\u00EDdeas Garden",
    description: "Cromadas, Regalo y Condolencias. Arreglos premium con entrega a domicilio.",
    images: [
      {
        url: absoluteUrl(collections[0].cover_image),
        width: 600,
        height: 400,
        alt: `Colecci\u00F3n ${collections[0].nombre}`,
      },
    ],
    url: absoluteUrl("/colecciones"),
    type: "website",
    locale: "es_CO",
  },
};

export default function CollectionsPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Cat\u00E1logo</p>
      <h1 className="section-title">Colecciones</h1>
      <p className="section-copy">
        L\u00EDnea visual premium con navegaci\u00F3n clara por ocasi\u00F3n: selecciona colecci\u00F3n, revisa
        producto y finaliza tu compra.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </main>
  );
}
