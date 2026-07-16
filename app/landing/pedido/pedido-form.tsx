"use client";

import { useState } from "react";

const OFERTAS = [
  { label: "1 Orquídea  ·  $87.900", value: "1 Orquídea x $87.900" },
  { label: "2 Orquídeas  ·  $158.220 (2da con 20% OFF)", value: "2 Orquídeas x $158.220 (2da con 20% OFF)" },
];

type Field = "nombre" | "direccion" | "indicaciones" | "barrio" | "telefono" | "oferta" | "mensaje";

const initialState: Record<Field, string> = {
  nombre: "",
  direccion: "",
  indicaciones: "",
  barrio: "",
  telefono: "",
  oferta: OFERTAS[0].value,
  mensaje: "",
};

function WaIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PedidoForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as Field]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!form.nombre.trim())    next.nombre    = "Campo obligatorio";
    if (!form.direccion.trim()) next.direccion = "Campo obligatorio";
    if (!form.barrio.trim())    next.barrio    = "Campo obligatorio";
    if (!form.telefono.trim())  next.telefono  = "Campo obligatorio";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const lines = [
      "Hola, quiero hacer un pedido de *Orquídeas Supreme* 🌸",
      "",
      `*Nombre:* ${form.nombre}`,
      `*Dirección:* ${form.direccion}`,
      form.indicaciones ? `*Indicaciones:* ${form.indicaciones}` : null,
      `*Barrio:* ${form.barrio}`,
      `*Teléfono:* ${form.telefono}`,
      `*Oferta:* ${form.oferta}`,
      form.mensaje ? `*Mensaje para tarjeta:* ${form.mensaje}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/573208721695?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 py-8">
      {/* Encabezado */}
      <div className="mx-auto mb-6 max-w-[480px] text-center">
        <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#9a7a4a]">
          Orquídeas Supreme
        </p>
        <h1
          className="mt-1 font-display text-3xl font-semibold leading-tight"
          style={{ color: "#2a1a24" }}
        >
          Completa tu pedido
        </h1>
        <p className="mt-2 text-xs text-[#9a7a8a]">
          Rellena el formulario y te contactamos por WhatsApp para confirmar.
        </p>
      </div>

      {/* Tarjeta del formulario */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto max-w-[480px] rounded-2xl border border-[#e8d9b0] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(122,74,148,0.07)]"
      >
        <div className="flex flex-col gap-4">
          {/* Nombre */}
          <Field
            label="Nombre y apellidos *"
            name="nombre"
            type="text"
            placeholder="Ej: María García López"
            value={form.nombre}
            error={errors.nombre}
            onChange={handleChange}
          />

          {/* Dirección */}
          <Field
            label="Dirección completa *"
            name="direccion"
            type="text"
            placeholder="Ej: Calle 97 # 70c-95"
            value={form.direccion}
            error={errors.direccion}
            onChange={handleChange}
          />

          {/* Indicaciones */}
          <Field
            label="Indicaciones de entrega"
            name="indicaciones"
            type="text"
            placeholder="Ej: Apto 301, timbre 2 veces"
            value={form.indicaciones}
            onChange={handleChange}
          />

          {/* Barrio */}
          <Field
            label="Barrio *"
            name="barrio"
            type="text"
            placeholder="Ej: Chicó, Usaquén, Suba…"
            value={form.barrio}
            error={errors.barrio}
            onChange={handleChange}
          />

          {/* Teléfono */}
          <Field
            label="Teléfono de contacto *"
            name="telefono"
            type="tel"
            placeholder="Ej: 3001234567"
            value={form.telefono}
            error={errors.telefono}
            onChange={handleChange}
          />

          {/* Oferta seleccionada */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#5a4a94]">
              Oferta seleccionada
            </label>
            <div className="relative">
              <select
                name="oferta"
                value={form.oferta}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-[#e8d9b0] bg-[#fffdf8] px-4 py-3 pr-10 text-[0.82rem] text-[#2a1a24] outline-none focus:border-[#c478a0] focus:ring-2 focus:ring-[#c478a0]/20"
              >
                {OFERTAS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {/* Flecha personalizada */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-[#9a7a4a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mensaje para tarjeta */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#5a4a94]">
              Mensaje para tarjeta
            </label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              placeholder="Ej: Feliz cumpleaños mamá, te quiero mucho ❤️"
              className="w-full resize-none rounded-xl border border-[#e8d9b0] bg-[#fffdf8] px-4 py-3 text-[0.82rem] text-[#2a1a24] placeholder:text-[#c8b0b8] outline-none focus:border-[#c478a0] focus:ring-2 focus:ring-[#c478a0]/20"
            />
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="animate-wa-ring mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] py-4 text-[0.75rem] font-semibold uppercase tracking-wide text-white transition hover:bg-[#128c7e] active:scale-95"
          >
            <WaIcon />
            Enviar pedido por WhatsApp
          </button>

          <p className="text-center text-[0.62rem] text-[#9a7a8a]">
            Al confirmar, abriremos WhatsApp con tu pedido listo para enviar.
          </p>
        </div>
      </form>
    </div>
  );
}

/* ── Campo de texto reutilizable ── */
function Field({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#5a4a94]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-[#fffdf8] px-4 py-3 text-[0.82rem] text-[#2a1a24] placeholder:text-[#c8b0b8] outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-[#e8d9b0] focus:border-[#c478a0] focus:ring-[#c478a0]/20"
        }`}
      />
      {error && (
        <p className="text-[0.65rem] text-red-500">{error}</p>
      )}
    </div>
  );
}
