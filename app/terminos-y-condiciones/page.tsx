import Link from "next/link";
import type { Metadata } from "next";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Consulta los términos y condiciones de uso, compra y entrega de Orquideas Garden.",
  alternates: {
    canonical: absoluteUrl("/terminos-y-condiciones"),
  },
};

export default function TermsPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Marco legal</p>
      <h1 className="section-title">Términos y Condiciones</h1>
      <section className="mt-8 card-shell space-y-4 text-sm text-smoke sm:text-base">
        <p>
          Al usar <strong>{SITE_URL}</strong> y realizar una compra, aceptas nuestras condiciones
          comerciales, políticas de entrega y tiempos logísticos.
        </p>
        <p>
          Los pedidos se procesan según disponibilidad y validación de datos. La confirmación
          final se realiza en checkout WooCommerce.
        </p>
        <p>
          Contacto oficial: {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_ADDRESS}
        </p>
      </section>

      <section className="mt-6 card-shell space-y-3 text-sm text-pearl sm:text-base">
        <h2 className="font-display text-3xl text-ivory">Documentos Oficiales</h2>
        <p className="text-sm text-smoke">
          Puedes consultar los documentos originales cargados por el equipo:
        </p>
        <ul className="space-y-2">
          <li>
            <Link
              href="/legal/terminos-condiciones-orquideas-garden.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne underline"
            >
              Términos Condiciones Orquideas Garden (PDF)
            </Link>
          </li>
          <li>
            <Link
              href="/legal/politicas-envio-entregas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne underline"
            >
              Políticas de Envío y Entregas (PDF)
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}

