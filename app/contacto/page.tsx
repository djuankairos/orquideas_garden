import Link from "next/link";
import type { Metadata } from "next";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_URL,
  absoluteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para soporte comercial, asesoría de ocasión y seguimiento de entregas.",
  alternates: {
    canonical: absoluteUrl("/contacto"),
  },
  openGraph: {
    title: "Contacto | Orquideas Garden",
    description:
      "Contáctanos para soporte comercial, asesoría de ocasión y seguimiento de entregas.",
    url: absoluteUrl("/contacto"),
    type: "website",
    locale: "es_CO",
  },
};

export default function ContactPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Soporte y asesoría</p>
      <h1 className="section-title">Contacto</h1>
      <p className="brand-subtitle mt-1">Floral Boutique · Bogotá</p>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="card-shell">
          <h2 className="font-display text-3xl text-ivory">Atención Comercial</h2>
          <p className="mt-3 text-sm text-smoke">
            Escríbenos para asesoría de producto, regalos corporativos y confirmación de
            cobertura de entrega.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-pearl">
            <li>
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              Teléfono: <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>{CONTACT_PHONE}</a>
            </li>
            <li>Dirección: {CONTACT_ADDRESS}</li>
          </ul>
          <div className="mt-5">
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary"
            >
              Pide tu catálogo por WhatsApp
            </Link>
          </div>
        </article>
        <article className="card-shell">
          <h2 className="font-display text-3xl text-ivory">Horario</h2>
          <p className="mt-3 text-sm text-smoke">
            Lunes a sábado, 8:00 a. m. a 6:00 p. m. Los tiempos de respuesta pueden variar en
            días festivos.
          </p>
        </article>
      </section>
    </main>
  );
}

