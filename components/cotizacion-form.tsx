"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { WHATSAPP_URL } from "@/lib/site";

type QuoteValues = {
  nombre: string;
  telefono: string;
  email: string;
  ocasion: string;
  fecha_entrega: string;
  presupuesto: string;
  producto_interes: string;
  detalle: string;
};

const initialValues: QuoteValues = {
  nombre: "",
  telefono: "",
  email: "",
  ocasion: "",
  fecha_entrega: "",
  presupuesto: "",
  producto_interes: "",
  detalle: "",
};

function getOrDash(value: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "-";
}

export function CotizacionForm() {
  const [values, setValues] = useState<QuoteValues>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const buildWhatsAppUrl = () => {
    const message = `Hola Orquideas Garden, quiero solicitar una cotizacion.

Nombre: ${getOrDash(values.nombre)}
Telefono: ${getOrDash(values.telefono)}
Email: ${getOrDash(values.email)}
Ocasion: ${getOrDash(values.ocasion)}
Fecha de entrega: ${getOrDash(values.fecha_entrega)}
Presupuesto estimado: ${getOrDash(values.presupuesto)}
Producto o coleccion de interes: ${getOrDash(values.producto_interes)}
Detalle adicional: ${getOrDash(values.detalle)}`;

    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const whatsappHref = buildWhatsAppUrl();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="card-shell grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-pearl">
          Nombre completo *
          <input
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
            placeholder="Tu nombre"
          />
        </label>
        <label className="grid gap-1 text-sm text-pearl">
          Telefono / WhatsApp *
          <input
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
            placeholder="320..."
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-pearl">
          Email
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
            placeholder="correo@dominio.com"
          />
        </label>
        <label className="grid gap-1 text-sm text-pearl">
          Ocasion *
          <input
            name="ocasion"
            value={values.ocasion}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
            placeholder="Regalo, condolencias, aniversario..."
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-pearl">
          Fecha estimada de entrega
          <input
            name="fecha_entrega"
            type="date"
            value={values.fecha_entrega}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
          />
        </label>
        <label className="grid gap-1 text-sm text-pearl">
          Presupuesto estimado
          <input
            name="presupuesto"
            value={values.presupuesto}
            onChange={handleChange}
            className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
            placeholder="$200.000 - $350.000"
          />
        </label>
      </div>

      <label className="grid gap-1 text-sm text-pearl">
        Producto o coleccion de interes
        <input
          name="producto_interes"
          value={values.producto_interes}
          onChange={handleChange}
          className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
          placeholder="Cromadas, Regalo, producto puntual..."
        />
      </label>

      <label className="grid gap-1 text-sm text-pearl">
        Detalle de la solicitud
        <textarea
          name="detalle"
          rows={4}
          value={values.detalle}
          onChange={handleChange}
          className="rounded-xl border border-gold/40 bg-white px-3 py-2 text-sm text-pearl outline-none focus:border-champagne"
          placeholder="Cuentanos direccion, horario y detalle del pedido."
        />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn-brand-primary">
          Enviar cotizacion
        </button>
      </div>
    </form>
  );
}

