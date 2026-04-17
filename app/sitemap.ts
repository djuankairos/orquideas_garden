import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/colecciones",
    "/cotizacion",
    "/sobre-nosotros",
    "/terminos-y-condiciones",
    "/politica-de-privacidad",
    "/contacto",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...collections.map((collection) => ({
      url: absoluteUrl(`/colecciones/${collection.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/producto/${product.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
