import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/ui/feature-carousel";
import { FAQSection } from "@/components/ui/faq-section-shadcnui";
import { ReviewsGrid } from "@/components/ui/reviews-grid";
import { TrustStats } from "@/components/ui/trust-stats";
import { collections, products } from "@/lib/catalog";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

const faqSchemaData = [
  {
    question: "¿Cómo puedo hacer un pedido en Orquídeas Garden?",
    answer:
      "Puedes elegir tu arreglo desde el catálogo y continuar por el enlace de compra. Si prefieres asesoría personalizada, también puedes escribirnos por WhatsApp.",
  },
  {
    question: "¿Tienen entregas el mismo día en Bogotá?",
    answer:
      "Sí, contamos con entregas el mismo día según disponibilidad de producto y zona. Te recomendamos realizar tu pedido con la mayor anticipación posible.",
  },
  {
    question: "¿Puedo incluir una tarjeta con mensaje personalizado?",
    answer:
      "Claro. Puedes agregar tu mensaje al momento de comprar y lo enviamos con una presentación cuidada para la ocasión.",
  },
  {
    question: "¿Qué medios de pago manejan?",
    answer:
      "Trabajamos con Bold, así que recibimos todos los medios de pago, siempre seguros y disponibles en el proceso de compra. Si necesitas apoyo, te guiamos paso a paso por WhatsApp.",
  },
  {
    question: "¿Manejan arreglos para condolencias y eventos especiales?",
    answer:
      "Sí, diseñamos opciones para condolencias, cumpleaños, aniversarios y detalles corporativos, manteniendo un estilo elegante y sobrio cuando se requiere.",
  },
  {
    question: "¿Cómo cuido la orquídea después de recibirla?",
    answer:
      "Entregamos recomendaciones básicas de cuidado para conservarla por más tiempo: luz indirecta, riego moderado y buena ventilación.",
  },
];

const heroImages = [
  { src: "/hero/accordion/mg-0567.jpg", alt: "Arreglos de regalo - Orquideas Garden" },
  { src: "/hero/accordion/mg-0568.jpg", alt: "Diseño premium - Orquideas Garden" },
  { src: "/hero/accordion/mg-0577.jpg", alt: "Momentos especiales - Orquideas Garden" },
  { src: "/hero/accordion/mg-0765.jpg", alt: "Condolencias - Orquideas Garden" },
  { src: "/hero/accordion/mg-0777.jpg", alt: "Floral Boutique - Orquideas Garden" },
];

const heroTitle = (
  <>
    Orquídeas en Bogotá para{" "}
    <span className="text-[#A64E83]">regalar, celebrar</span> y acompañar.
  </>
);

export const metadata: Metadata = {
  title: { absolute: "Orquideas en Bogota para regalar, celebrar y acompanar | Orquideas Garden" },
  alternates: {
    canonical: SITE_URL,
  },
  description:
    "Arreglos de orquídeas Phalaenopsis de lujo con envío a domicilio. Packaging sofisticado para regalo, celebración y acompañamiento. Bogotá y Colombia.",
  openGraph: {
    title: "Orquídeas Premium - Floral Boutique en Bogotá",
    description:
      "Arreglos de orquídeas de lujo con envío nacional. Especialistas en packaging sofisticado.",
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
          Explora estilos pensados para cada ocasión: brillo contemporáneo, regalos memorables y
          arreglos sobrios para acompañar con sensibilidad.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>

      <section className="pb-10 pt-16">
        <h2 className="section-title">Selección inicial del catálogo</h2>
        <p className="section-copy">
          Aquí encuentras una muestra de nuestros arreglos más solicitados para regalar, celebrar
          y acompañar con elegancia.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} pageType="home" />
          ))}
        </div>
      </section>

      <section className="pt-10">
        <TrustStats />
      </section>

      <section className="pt-10">
        <ReviewsGrid />
      </section>

      <section className="pt-10">
        <FAQSection />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "es-CO",
            publisher: { "@id": `${SITE_URL}/#florist` },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSchemaData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}


