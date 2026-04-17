import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutLink } from "@/components/checkout-link";
import {
  collections,
  getProductBySlug,
  products,
  resolveProductPurchaseTarget,
} from "@/lib/catalog";
import { WHATSAPP_URL, absoluteUrl } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo_title,
    description: product.seo_description,
    alternates: {
      canonical: absoluteUrl(`/producto/${product.slug}`),
    },
    openGraph: {
      title: product.seo_title,
      description: product.seo_description,
      images: [{ url: absoluteUrl(product.imagenes[0]) }],
      url: absoluteUrl(`/producto/${product.slug}`),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const purchaseTarget = resolveProductPurchaseTarget(product);
  const collection = collections.find((item) => item.slug === product.coleccion);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nombre,
    description: product.descripcion_corta,
    image: product.imagenes.map((image) => absoluteUrl(image)),
    category: collection?.nombre,
  };

  if (purchaseTarget.destination === "woo") {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      url: purchaseTarget.href,
    };
  }

  return (
    <main className="container-shell py-12 sm:py-16">
      <article className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-shell">
          <Image
            src={product.imagenes[0]}
            alt={product.nombre}
            width={500}
            height={430}
            loading="eager"
            priority
            className="h-[430px] w-full rounded-2xl border border-gold/25 object-cover"
          />
        </div>
        <div className="card-shell">
          <p className="eyebrow">Coleccion {collection?.nombre}</p>
          <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">{product.nombre}</h1>
          <p className="brand-subtitle mt-1">Floral Boutique - Bogota</p>
          <p className="mt-4 text-lg text-pearl">{product.descripcion_corta}</p>
          <p className="mt-6 text-xl font-medium text-champagne">{product.precio_referencia}</p>
          <ul className="mt-6 space-y-2 text-sm text-smoke">
            {product.beneficios.map((benefit) => (
              <li key={benefit}>- {benefit}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            {purchaseTarget.destination === "woo" ? (
              <CheckoutLink
                href={purchaseTarget.href}
                eventPayload={{
                  page_type: "producto",
                  collection_slug: product.coleccion,
                  product_slug: product.slug,
                  destination: purchaseTarget.destination,
                }}
                className="btn-brand-primary"
              >
                Pedir ahora
              </CheckoutLink>
            ) : (
              <Link
                href={purchaseTarget.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand-primary"
              >
                Pedir ahora
              </Link>
            )}
            <Link
              href={product.whatsapp_url ?? WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-secondary"
            >
              Pide tu catalogo por WhatsApp
            </Link>
          </div>
        </div>
      </article>

      <section className="mt-14 card-shell">
        <h2 className="font-display text-3xl text-ivory">Preguntas frecuentes de compra</h2>
        <div className="mt-6 space-y-4 text-sm text-smoke">
          <div>
            <h3 className="text-base font-medium text-pearl">Como finalizo el pedido?</h3>
            <p>
              Al presionar "Pedir ahora" seras redirigido al checkout oficial de WooCommerce para
              completar el pago de forma segura.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium text-pearl">Hacen entregas nacionales?</h3>
            <p>
              Si. Operamos envios en Bogota y a nivel nacional segun cobertura vigente al momento
              de la compra.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
