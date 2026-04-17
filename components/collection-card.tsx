import Image from "next/image";
import Link from "next/link";
import type { CollectionData } from "@/lib/catalog";

type CollectionCardProps = {
  collection: CollectionData;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <article className="card-shell flex h-full flex-col">
      <Image
        src={collection.cover_image}
        alt={`Colección ${collection.nombre}`}
        width={400}
        height={225}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-2xl border border-gold/25 object-cover"
        style={{ objectPosition: collection.image_position ?? "50% 50%" }}
      />
      <p className="eyebrow mt-5">Colección</p>
      <h2 className="mt-2 font-display text-3xl text-ivory">{collection.nombre}</h2>
      <p className="mt-2 text-sm text-smoke">{collection.descripcion}</p>
      <Link href={`/colecciones/${collection.slug}`} className="btn-brand-secondary mt-auto w-fit pt-5">
        Ver colección
      </Link>
    </article>
  );
}
