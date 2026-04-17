import type { Metadata } from "next";
import { CotizacionForm } from "@/components/cotizacion-form";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solicitar Cotización",
  description:
    "Solicita una cotización personalizada de arreglos de orquídeas y recibe asesoría por WhatsApp.",
  alternates: {
    canonical: absoluteUrl("/cotizacion"),
  },
};

export default function CotizacionPage() {
  return (
    <main className="container-shell py-12 sm:py-16">
      <p className="eyebrow">Asesoría personalizada</p>
      <h1 className="section-title">Solicitar cotización</h1>
      <p className="section-copy">
        Completa el formulario y enviaremos tu solicitud al WhatsApp oficial con toda la
        información para cotizar de forma ágil.
      </p>

      <section className="mt-8">
        <CotizacionForm />
      </section>
    </main>
  );
}

