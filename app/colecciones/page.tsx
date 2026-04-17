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
    title: "Colecciones — Orquídeas Garden",
    description: "Cromadas, Regalo y Condolencias. Arreglos premium con entrega a domicilio.",
    images: [
      {
        url: absoluteUrl(collections[0].cover_image),
        width: 600,
        height: 400,
        alt: `Colección ${collections[0].nombre}`,
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
      <p className="eyebrow">Catálogo</p>
      <h1 className="section-title">Colecciones</h1>
      <p className="section-copy">
        Línea visual premium con navegación clara por ocasión: selecciona colección, revisa
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
