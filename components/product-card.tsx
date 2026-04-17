import Link from "next/link";
import Image from "next/image";
import { resolveProductPurchaseTarget, type ProductData } from "@/lib/catalog";
import { CheckoutLink } from "@/components/checkout-link";

type ProductCardProps = {
  product: ProductData;
  pageType: "home" | "coleccion";
};

export function ProductCard({ product, pageType }: ProductCardProps) {
  const purchaseTarget = resolveProductPurchaseTarget(product);

  return (
    <article className="card-shell flex h-full flex-col">
      <Image
        src={product.imagenes[0]}
        alt={product.nombre}
        width={400}
        height={225}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-2xl border border-gold/25 object-cover"
        style={{ objectPosition: product.image_position ?? "50% 50%" }}
      />
      <h3 className="mt-5 font-display text-2xl text-ivory">{product.nombre}</h3>
      <p className="mt-2 text-sm text-smoke">{product.descripcion_corta}</p>
      <p className="mt-3 text-sm font-medium text-champagne">{product.precio_referencia}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link href={`/producto/${product.slug}`} className="btn-brand-secondary btn-mini">
          Ver detalle
        </Link>
        {purchaseTarget.destination === "woo" ? (
          <CheckoutLink
            href={purchaseTarget.href}
            eventPayload={{
              page_type: pageType,
              collection_slug: product.coleccion,
              product_slug: product.slug,
              destination: purchaseTarget.destination,
            }}
            className="btn-brand-primary btn-mini"
          >
            Pedir ahora
          </CheckoutLink>
        ) : (
          <Link
            href={purchaseTarget.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary btn-mini"
          >
            Pedir ahora
          </Link>
        )}
      </div>
    </article>
  );
}
