import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
  type CollectionSlug,
} from "@/lib/catalog";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  return {
    title: { absolute: collection.seo_title },
    description: collection.seo_description,
    alternates: {
      canonical: absoluteUrl(`/colecciones/${collection.slug}`),
    },
    openGraph: {
      title: collection.seo_title,
      description: collection.seo_description,
      images: [
        {
          url: absoluteUrl(collection.cover_image),
          width: 600,
          height: 400,
          alt: `Colección ${collection.nombre}`,
        },
      ],
      url: absoluteUrl(`/colecciones/${collection.slug}`),
      type: "website",
      locale: "es_CO",
    },
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(slug as CollectionSlug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Colecciones",
        item: absoluteUrl("/colecciones"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.nombre,
        item: absoluteUrl(`/colecciones/${collection.slug}`),
      },
    ],
  };

  return (
    <main className="container-shell py-12 sm:py-16">
      <section className="hero-shell">
        <p className="eyebrow">Colección</p>
        <h1 className="mt-4 font-display text-5xl text-ivory sm:text-6xl">{collection.nombre}</h1>
        <p className="brand-subtitle mt-1">Floral Boutique · Bogotá</p>
        <p className="mt-5 max-w-3xl text-base text-pearl">{collection.hero_text}</p>
        <p className="mt-4 max-w-3xl text-sm text-smoke">{collection.descripcion}</p>
      </section>

      <section className="pb-8 pt-12">
        <h2 className="font-display text-3xl text-ivory">Productos de la colección</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {collectionProducts.map((product) => (
            <ProductCard key={product.slug} product={product} pageType="coleccion" />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
  );
}
