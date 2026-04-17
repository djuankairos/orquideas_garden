export type CollectionSlug = "cromadas" | "regalo" | "condolencias";

export type ProductData = {
  slug: string;
  nombre: string;
  coleccion: CollectionSlug;
  precio_referencia: string;
  imagenes: string[];
  image_position?: string;
  descripcion_corta: string;
  beneficios: string[];
  woo_checkout_url: string;
  whatsapp_url?: string;
  seo_title: string;
  seo_description: string;
};

export type PurchaseDestination = "woo" | "whatsapp_fallback";

export type CollectionData = {
  slug: CollectionSlug;
  nombre: string;
  hero_text: string;
  descripcion: string;
  image_position?: string;
  productos_destacados: string[];
  seo_title: string;
  seo_description: string;
  cover_image: string;
};

const FALLBACK_IMAGE = "/images/placeholder-orquidea.svg";
const WHATSAPP_NUMBER = "573208721695";

const wooProductUrlById = (id: number) =>
  `https://orquideasgarden.store/?post_type=product&p=${id}`;

const whatsappProductUrl = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola Orquideas Garden, quiero comprar ${productName}.`
  )}`;

export function resolveProductPurchaseTarget(
  product: Pick<ProductData, "woo_checkout_url" | "whatsapp_url" | "nombre">
): { href: string; destination: PurchaseDestination } {
  const wooUrl = product.woo_checkout_url?.trim();
  if (wooUrl && /^https?:\/\//.test(wooUrl)) {
    return { href: wooUrl, destination: "woo" };
  }

  return {
    href: product.whatsapp_url ?? whatsappProductUrl(product.nombre),
    destination: "whatsapp_fallback",
  };
}

export const products: ProductData[] = [
  {
    slug: "orquideas-moradas-base-cromada-plateada",
    nombre: "Orquídeas Moradas - Base Cromada Plateada",
    coleccion: "cromadas",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/08/wp2.jpeg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 38%",
    descripcion_corta:
      "Arreglo de dos varas en base cromada plateada con presencia elegante y acabado moderno.",
    beneficios: [
      "Presentación premium para regalo",
      "Base cromada de alto impacto visual",
      "Empaque con detalle de ocasión",
    ],
    woo_checkout_url: wooProductUrlById(1407),
    whatsapp_url: whatsappProductUrl("Orquídeas Moradas - Base Cromada Plateada"),
    seo_title: "Orquideas Moradas Base Cromada Plateada | Orquideas Garden",
    seo_description:
      "Orquídeas moradas en base cromada plateada con estilo contemporáneo y entrega en Colombia.",
  },
  {
    slug: "orquideas-amarillas-base-cromada",
    nombre: "Orquídeas Amarillas - Base Cromada",
    coleccion: "cromadas",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2022/05/WhatsApp-Image-2023-03-10-at-4.17.43-PM-1.jpeg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 34%",
    descripcion_corta:
      "Composición luminosa en tonos amarillos con base cromada para momentos especiales.",
    beneficios: [
      "Diseño protagonista y sofisticado",
      "Incluye presentación lista para entrega",
      "Ideal para celebraciones y regalos",
    ],
    woo_checkout_url: wooProductUrlById(1693),
    whatsapp_url: whatsappProductUrl("Orquídeas Amarillas - Base Cromada"),
    seo_title: "Orquideas Amarillas Base Cromada | Orquideas Garden",
    seo_description:
      "Orquídeas amarillas con base cromada y empaque premium para regalo y celebración.",
  },
  {
    slug: "gift-box-combo-cumpleanos",
    nombre: "Gift Box Combo Cumpleaños",
    coleccion: "regalo",
    precio_referencia: "$260.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/01/IMG_6568.jpg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 36%",
    descripcion_corta:
      "Caja especial de cumpleaños con orquídea y complementos para celebrar con estilo.",
    beneficios: [
      "Presentación completa para sorprender",
      "Incluye accesorios de celebración",
      "Entrega lista para regalo",
    ],
    woo_checkout_url: wooProductUrlById(400),
    whatsapp_url: whatsappProductUrl("Gift Box Combo Cumpleaños"),
    seo_title: "Gift Box Combo Cumpleaños | Orquideas Garden",
    seo_description:
      "Gift box premium para cumpleaños con orquídeas y detalles de celebración.",
  },
  {
    slug: "kit-celebracion-hbd",
    nombre: "Kit Celebración HBD",
    coleccion: "regalo",
    precio_referencia: "$235.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-13-at-8.29.38-AM.jpeg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 40%",
    descripcion_corta:
      "Kit de celebración con orquídea y detalles festivos para fechas memorables.",
    beneficios: [
      "Curaduría de obsequio premium",
      "Diseño pensado para cumpleaños",
      "Mensaje personalizado disponible",
    ],
    woo_checkout_url: wooProductUrlById(1978),
    whatsapp_url: whatsappProductUrl("Kit Celebración HBD"),
    seo_title: "Kit Celebración HBD | Orquideas Garden",
    seo_description:
      "Kit de celebración con orquídeas premium para regalar y celebrar con elegancia.",
  },
  {
    slug: "orquideas-supreme-condolencias",
    nombre: "Orquídeas Supreme - Condolencias",
    coleccion: "condolencias",
    precio_referencia: "$175.000+ COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/01/Photoroom_20260214_120627.jpg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 32%",
    descripcion_corta:
      "Arreglo de condolencias de línea supreme para acompañar con respeto y calidez.",
    beneficios: [
      "Opciones de presentación sobria",
      "Tarjeta de acompañamiento incluida",
      "Entrega confiable en Bogotá y nacional",
    ],
    woo_checkout_url: wooProductUrlById(404),
    whatsapp_url: whatsappProductUrl("Orquídeas Supreme - Condolencias"),
    seo_title: "Orquideas Supreme Condolencias | Orquideas Garden",
    seo_description:
      "Arreglo de condolencias con orquídeas premium y presentación respetuosa.",
  },
  {
    slug: "orquideas-supreme-base-cromada",
    nombre: "Orquídeas Supreme con Base Cromada",
    coleccion: "condolencias",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/04/IMG_7947.jpg",
      FALLBACK_IMAGE,
    ],
    image_position: "50% 35%",
    descripcion_corta:
      "Composición elegante en base cromada para expresar apoyo con presencia y tacto.",
    beneficios: [
      "Diseño sobrio de alta calidad",
      "Empaque premium con detalle floral",
      "Ideal para homenajes y acompañamiento",
    ],
    woo_checkout_url: wooProductUrlById(1149),
    whatsapp_url: whatsappProductUrl("Orquídeas Supreme con Base Cromada"),
    seo_title: "Orquideas Supreme con Base Cromada | Orquideas Garden",
    seo_description:
      "Orquídeas de condolencias en base cromada con entrega y presentación premium.",
  },
];

export const collections: CollectionData[] = [
  {
    slug: "cromadas",
    nombre: "Cromadas",
    hero_text: "Brillo escultórico para regalos de alto impacto.",
    descripcion:
      "Diseños en base cromada para quienes buscan presencia visual, elegancia y acabado premium.",
    productos_destacados: [
      "orquideas-moradas-base-cromada-plateada",
      "orquideas-amarillas-base-cromada",
    ],
    seo_title: "Colección Cromadas | Orquideas Garden",
    seo_description:
      "Colección cromada con orquídeas premium de estilo contemporáneo para regalo y celebración.",
    image_position: "50% 18%",
    cover_image:
      "https://orquideasgarden.store/wp-content/uploads/2021/08/wp2.jpeg",
  },
  {
    slug: "regalo",
    nombre: "Regalo",
    hero_text: "Opciones pensadas para celebrar y sorprender.",
    descripcion:
      "Selecciones de regalo con orquídeas y complementos para cumpleaños y fechas especiales.",
    productos_destacados: [
      "gift-box-combo-cumpleanos",
      "kit-celebracion-hbd",
    ],
    seo_title: "Colección Regalo | Orquideas Garden",
    seo_description:
      "Orquídeas para regalo con presentación premium y detalles para celebraciones especiales.",
    image_position: "50% 20%",
    cover_image:
      "https://orquideasgarden.store/wp-content/uploads/2021/01/IMG_6568.jpg",
  },
  {
    slug: "condolencias",
    nombre: "Condolencias",
    hero_text: "Acompañamiento floral sobrio y respetuoso.",
    descripcion:
      "Arreglos de condolencias con composición elegante para expresar apoyo en momentos sensibles.",
    productos_destacados: [
      "orquideas-supreme-condolencias",
      "orquideas-supreme-base-cromada",
    ],
    seo_title: "Colección Condolencias | Orquideas Garden",
    seo_description:
      "Arreglos de condolencias con orquídeas premium y entrega confiable en Colombia.",
    image_position: "50% 16%",
    cover_image:
      "https://orquideasgarden.store/wp-content/uploads/2021/01/Photoroom_20260214_120627.jpg",
  },
];

export function getCollectionBySlug(slug: string): CollectionData | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: CollectionSlug): ProductData[] {
  return products.filter((product) => product.coleccion === slug);
}

