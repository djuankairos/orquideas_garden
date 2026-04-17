export type CheckoutEventPayload = {
  page_type: "home" | "coleccion" | "producto";
  collection_slug?: string;
  product_slug?: string;
  destination: "woo" | "whatsapp_fallback";
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCheckoutClick(payload: CheckoutEventPayload) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "click_cta_checkout",
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "click_cta_checkout", payload);
  }
}
