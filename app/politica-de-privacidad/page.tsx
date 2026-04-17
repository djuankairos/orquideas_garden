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
  title: "Política de Privacidad",
  description:
    "Conoce cómo tratamos los datos personales y de navegación en Orquideas Garden.",
  alternates: {
    canonical: absoluteUrl("/politica-de-privacidad"),
  },
};

export default function PrivacyPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Protección de datos</p>
      <h1 className="section-title">Política de Privacidad</h1>
      <section className="mt-8 card-shell space-y-4 text-sm text-smoke sm:text-base">
        <p>
          En <strong>{SITE_URL}</strong> tratamos la información personal con fines de atención
          comercial, gestión de pedidos, logística y soporte postventa.
        </p>
        <p>
          Los datos de compra y pago se procesan en el entorno de checkout WooCommerce, bajo
          controles de seguridad y uso exclusivo para la operación del pedido.
        </p>
        <p>
          Titular y contacto para solicitudes de datos: {CONTACT_EMAIL} · {CONTACT_PHONE} ·{" "}
          {CONTACT_ADDRESS}
        </p>
      </section>

      <section className="mt-6 card-shell space-y-3 text-sm text-pearl sm:text-base">
        <h2 className="font-display text-3xl text-ivory">Documento Oficial de Datos</h2>
        <p className="text-sm text-smoke">
          Consulta la política oficial cargada por el equipo:
        </p>
        <ul className="space-y-2">
          <li>
            <Link
              href="/legal/politica-datos-personales-orquideas-garden.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne underline"
            >
              Política de Datos Personales Orquideas Garden (PDF)
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}

