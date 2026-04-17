import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

// Fecha de última actualización del catálogo y contenido editorial
const CATALOG_DATE = new Date("2026-04-17");
// Fecha de última actualización de páginas legales (cambian con menos frecuencia)
const LEGAL_DATE = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage — máxima prioridad
    {
      url: absoluteUrl("/"),
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    // Páginas comerciales principales
    {
      url: absoluteUrl("/colecciones"),
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl("/cotizacion"),
      lastModified: CATALOG_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl("/sobre-nosotros"),
      lastModified: CATALOG_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contacto"),
      lastModified: CATALOG_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    // Páginas legales — prioridad baja, cambian poco
    {
      url: absoluteUrl("/terminos-y-condiciones"),
      lastModified: LEGAL_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: absoluteUrl("/politica-de-privacidad"),
      lastModified: LEGAL_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    // Colecciones — alta prioridad comercial
    ...collections.map((collection) => ({
      url: absoluteUrl(`/colecciones/${collection.slug}`),
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Productos
    ...products.map((product) => ({
      url: absoluteUrl(`/producto/${product.slug}`),
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
