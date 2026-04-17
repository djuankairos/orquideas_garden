export type CollectionSlug = "cromadas" | "regalo" | "condolencias";

export type ProductData = {
  slug: string;
  nombre: string;
  coleccion: CollectionSlug;
  precio_referencia: string;
  imagenes: string[];
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
    nombre: "Orquideas Moradas - Base Cromada Plateada",
    coleccion: "cromadas",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/08/wp2.jpeg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Arreglo de dos varas en base cromada plateada con presencia elegante y acabado moderno.",
    beneficios: [
      "Presentacion premium para regalo",
      "Base cromada de alto impacto visual",
      "Empaque con detalle de ocasion",
    ],
    woo_checkout_url: wooProductUrlById(1407),
    whatsapp_url: whatsappProductUrl("Orquideas Moradas - Base Cromada Plateada"),
    seo_title: "Orquideas Moradas Base Cromada Plateada | Orquideas Garden",
    seo_description:
      "Orquideas moradas en base cromada plateada con estilo contemporaneo y entrega en Colombia.",
  },
  {
    slug: "orquideas-amarillas-base-cromada",
    nombre: "Orquideas Amarillas - Base Cromada",
    coleccion: "cromadas",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2022/05/WhatsApp-Image-2023-03-10-at-4.17.43-PM-1.jpeg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Composicion luminosa en tonos amarillos con base cromada para momentos especiales.",
    beneficios: [
      "Diseño protagonista y sofisticado",
      "Incluye presentacion lista para entrega",
      "Ideal para celebraciones y regalos",
    ],
    woo_checkout_url: wooProductUrlById(1693),
    whatsapp_url: whatsappProductUrl("Orquideas Amarillas - Base Cromada"),
    seo_title: "Orquideas Amarillas Base Cromada | Orquideas Garden",
    seo_description:
      "Orquideas amarillas con base cromada y empaque premium para regalo y celebracion.",
  },
  {
    slug: "gift-box-combo-cumpleanos",
    nombre: "Gift Box Combo Cumpleanos",
    coleccion: "regalo",
    precio_referencia: "$260.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/01/IMG_6568.jpg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Caja especial de cumpleanos con orquidea y complementos para celebrar con estilo.",
    beneficios: [
      "Presentacion completa para sorprender",
      "Incluye accesorios de celebracion",
      "Entrega lista para regalo",
    ],
    woo_checkout_url: wooProductUrlById(400),
    whatsapp_url: whatsappProductUrl("Gift Box Combo Cumpleanos"),
    seo_title: "Gift Box Combo Cumpleanos | Orquideas Garden",
    seo_description:
      "Gift box premium para cumpleanos con orquideas y detalles de celebracion.",
  },
  {
    slug: "kit-celebracion-hbd",
    nombre: "Kit Celebracion HBD",
    coleccion: "regalo",
    precio_referencia: "$235.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-13-at-8.29.38-AM.jpeg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Kit de celebracion con orquidea y detalles festivos para fechas memorables.",
    beneficios: [
      "Curaduria de obsequio premium",
      "Diseño pensado para cumpleanos",
      "Mensaje personalizado disponible",
    ],
    woo_checkout_url: wooProductUrlById(1978),
    whatsapp_url: whatsappProductUrl("Kit Celebracion HBD"),
    seo_title: "Kit Celebracion HBD | Orquideas Garden",
    seo_description:
      "Kit de celebracion con orquideas premium para regalar y celebrar con elegancia.",
  },
  {
    slug: "orquideas-supreme-condolencias",
    nombre: "Orquideas Supreme - Condolencias",
    coleccion: "condolencias",
    precio_referencia: "$175.000+ COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/01/Photoroom_20260214_120627.jpg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Arreglo de condolencias de linea supreme para acompanar con respeto y calidez.",
    beneficios: [
      "Opciones de presentacion sobria",
      "Tarjeta de acompanamiento incluida",
      "Entrega confiable en Bogota y nacional",
    ],
    woo_checkout_url: wooProductUrlById(404),
    whatsapp_url: whatsappProductUrl("Orquideas Supreme - Condolencias"),
    seo_title: "Orquideas Supreme Condolencias | Orquideas Garden",
    seo_description:
      "Arreglo de condolencias con orquideas premium y presentacion respetuosa.",
  },
  {
    slug: "orquideas-supreme-base-cromada",
    nombre: "Orquideas Supreme con Base Cromada",
    coleccion: "condolencias",
    precio_referencia: "$175.000 COP",
    imagenes: [
      "https://orquideasgarden.store/wp-content/uploads/2021/04/IMG_7947.jpg",
      FALLBACK_IMAGE,
    ],
    descripcion_corta:
      "Composicion elegante en base cromada para expresar apoyo con presencia y tacto.",
    beneficios: [
      "Diseño sobrio de alta calidad",
      "Empaque premium con detalle floral",
      "Ideal para homenajes y acompanamiento",
    ],
    woo_checkout_url: wooProductUrlById(1149),
    whatsapp_url: whatsappProductUrl("Orquideas Supreme con Base Cromada"),
    seo_title: "Orquideas Supreme con Base Cromada | Orquideas Garden",
    seo_description:
      "Orquideas de condolencias en base cromada con entrega y presentacion premium.",
  },
];

export const collections: CollectionData[] = [
  {
    slug: "cromadas",
    nombre: "Cromadas",
    hero_text: "Brillo escultorico para regalos de alto impacto.",
    descripcion:
      "Diseños en base cromada para quienes buscan presencia visual, elegancia y acabado premium.",
    productos_destacados: [
      "orquideas-moradas-base-cromada-plateada",
      "orquideas-amarillas-base-cromada",
    ],
    seo_title: "Coleccion Cromadas | Orquideas Garden",
    seo_description:
      "Coleccion cromada con orquideas premium de estilo contemporaneo para regalo y celebracion.",
    cover_image:
      "https://orquideasgarden.store/wp-content/uploads/2021/08/wp2.jpeg",
  },
  {
    slug: "regalo",
    nombre: "Regalo",
    hero_text: "Opciones pensadas para celebrar y sorprender.",
    descripcion:
      "Selecciones de regalo con orquideas y complementos para cumpleanos y fechas especiales.",
    productos_destacados: [
      "gift-box-combo-cumpleanos",
      "kit-celebracion-hbd",
    ],
    seo_title: "Coleccion Regalo | Orquideas Garden",
    seo_description:
      "Orquideas para regalo con presentacion premium y detalles para celebraciones especiales.",
    cover_image:
      "https://orquideasgarden.store/wp-content/uploads/2021/01/IMG_6568.jpg",
  },
  {
    slug: "condolencias",
    nombre: "Condolencias",
    hero_text: "Acompanamiento floral sobrio y respetuoso.",
    descripcion:
      "Arreglos de condolencias con composicion elegante para expresar apoyo en momentos sensibles.",
    productos_destacados: [
      "orquideas-supreme-condolencias",
      "orquideas-supreme-base-cromada",
    ],
    seo_title: "Coleccion Condolencias | Orquideas Garden",
    seo_description:
      "Arreglos de condolencias con orquideas premium y entrega confiable en Colombia.",
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
