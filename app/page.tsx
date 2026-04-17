import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/ui/feature-carousel";
import { collections, products } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

const heroImages = [
  { src: "/hero/accordion/mg-0567.jpg", alt: "Arreglos de regalo - Orquideas Garden" },
  { src: "/hero/accordion/mg-0568.jpg", alt: "DiseÃ±o premium - Orquideas Garden" },
  { src: "/hero/accordion/mg-0577.jpg", alt: "Momentos especiales - Orquideas Garden" },
  { src: "/hero/accordion/mg-0765.jpg", alt: "Condolencias - Orquideas Garden" },
  { src: "/hero/accordion/mg-0777.jpg", alt: "Floral Boutique - Orquideas Garden" },
];

const heroTitle = (
  <>
    OrquÃ­deas en BogotÃ¡ para{" "}
    <span className="text-[#A64E83]">regalar, celebrar</span> y acompaÃ±ar.
  </>
);

export const metadata: Metadata = {
  title: { absolute: "Orquideas en Bogota para regalar, celebrar y acompanar | Orquideas Garden" },
  alternates: {
    canonical: SITE_URL,
  },
  description:
    "Arreglos de orquÃ­deas Phalaenopsis de lujo con envÃ­o a domicilio. Packaging sofisticado para regalo, celebraciÃ³n y acompaÃ±amiento. BogotÃ¡ y Colombia.",
  openGraph: {
    title: "OrquÃ­deas Premium - Floral Boutique en BogotÃ¡",
    description:
      "Arreglos de orquÃ­deas de lujo con envÃ­o nacional. Especialistas en packaging sofisticado.",
    images: [
      {
        url: `${SITE_URL}/hero/accordion/mg-0577.jpg`,
        width: 900,
        height: 1000,
        alt: "Arreglo de orquideas premium - Orquideas Garden",
      },
    ],
    url: SITE_URL,
    type: "website",
    locale: "es_CO",
    siteName: "Orquideas Garden",
  },
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="container-shell py-10 sm:py-14">
      <HeroSection
        title={heroTitle}
        subtitle="Orquideas en Bogota para regalar, celebrar y acompanar con arreglos premium y entrega a domicilio."
        images={heroImages}
        className="rounded-3xl border shadow-glow mb-10"
        style={{
          borderColor: "rgba(184,160,212,0.44)",
          background:
            "radial-gradient(circle at 20% 18%, rgba(212,196,240,0.42), transparent 35%), radial-gradient(circle at 88% 24%, rgba(240,200,216,0.34), transparent 34%), linear-gradient(160deg, #fdf0f4 0%, #faf7f5 100%)",
        }}
      />

      <section className="pt-16">
        <h2 className="section-title">Colecciones destacadas</h2>
        <p className="section-copy">
          Explora estilos pensados para cada ocasiÃ³n: brillo contemporÃ¡neo, regalos memorables y
          arreglos sobrios para acompaÃ±ar con sensibilidad.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>

      <section className="pb-10 pt-16">
        <h2 className="section-title">SelecciÃ³n inicial del catÃ¡logo</h2>
        <p className="section-copy">
          AquÃ­ encuentras una muestra de nuestros arreglos mÃ¡s solicitados para regalar, celebrar
          y acompaÃ±ar con elegancia.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} pageType="home" />
          ))}
        </div>
      </section>
    </main>
  );
}

