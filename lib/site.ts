export const SITE_NAME = "Orquideas Garden";
export const SITE_DESCRIPTION =
  "Floral Boutique en Bogotá: orquideas premium para regalo, condolencias y ocasiones especiales.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orquideasgarden.online";
export const CONTACT_EMAIL = "orquideasgarden16@gmail.com";
export const CONTACT_PHONE = "+57 320 872 1695";
export const CONTACT_ADDRESS = "Calle 97#70c-95, Bogotá, Colombia";
export const WHATSAPP_URL = "https://wa.me/573208721695";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

