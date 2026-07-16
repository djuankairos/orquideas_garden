import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Orquídeas Supreme | Regala emociones, no solo flores",
  description:
    "Orquídeas Phalaenopsis premium con presentación de lujo. Envío solo Bogotá. Pago contra entrega. Segunda orquídea con 20% de descuento.",
  alternates: { canonical: `${SITE_URL}/landing` },
  robots: { index: false, follow: false },
};

const PEDIDO_LINK = "/landing/pedido";
const WA_FLOAT   = `https://wa.me/573208721695?text=${encodeURIComponent("Hola, quiero información sobre Orquídeas Supreme 🌸")}`;

function WaIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WaButton({ text }: { text: string }) {
  return (
    <Link
      href={PEDIDO_LINK}
      className="animate-wa-ring inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#25d366] px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-wide text-white transition hover:bg-[#128c7e]"
    >
      <WaIcon />
      {text}
    </Link>
  );
}

type Section = {
  src: string;
  alt: string;
  cta: string | null;
};

const sections: Section[] = [
  {
    src: "/landing/imagen-1.webp",
    alt: "Regala emociones, no solo flores – Orquídeas Supreme",
    cta: "¡Pide la tuya ahora!",
  },
  {
    src: "/landing/imagen-2.webp",
    alt: "Un regalo que permanece en el corazón – Orquídeas Supreme",
    cta: "Quiero sorprender",
  },
  {
    src: "/landing/imagen-3.webp",
    alt: "Elegancia que transforma tus espacios – Orquídeas Supreme",
    cta: "Pedir por WhatsApp",
  },
  {
    src: "/landing/imagen-4.webp",
    alt: "Orquídea morada premium para el hogar – Orquídeas Supreme",
    cta: "Pedir por WhatsApp",
  },
  {
    src: "/landing/imagen-5.webp",
    alt: "Cada detalle refleja elegancia – Orquídeas Supreme",
    cta: "Pedir mi orquídea",
  },
  {
    src: "/landing/imagen-6.webp",
    alt: "Una orquídea para cada momento especial – Orquídeas Supreme",
    cta: "Para mi ocasión especial",
  },
  {
    src: "/landing/imagen-7.webp",
    alt: "Historias reales, emociones que permanecen – Orquídeas Supreme",
    cta: "¡La quiero ya!",
  },
  {
    src: "/landing/imagen-8.webp",
    alt: "Llévate dos y ahorra más – Orquídeas Supreme",
    cta: "Aprovechar la oferta",
  },
  {
    src: "/landing/imagen-9.webp",
    alt: "Haz de cada momento un recuerdo inolvidable – Orquídeas Supreme",
    cta: null,
  },
];

export default function LandingPage() {
  return (
    <>
      <main className="flex flex-col items-center bg-[#faf7f2]">
        {sections.map((section, index) => (
          <div key={index} className="w-full max-w-[680px]">
            {/* Imagen */}
            <Image
              src={section.src}
              alt={section.alt}
              width={680}
              height={960}
              className="w-full h-auto block"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
            />

            {/* Botón entre imágenes */}
            {section.cta && (
              <div className="flex flex-col items-center gap-2 bg-[#fffdf8] py-5 px-5 border-t border-b border-[#e8d9b0]">
                <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#9a7a4a]">
                  ¿Lista para sorprender?
                </p>
                <WaButton text={section.cta} />
              </div>
            )}
          </div>
        ))}

        {/* Bloque final de cierre */}
        <div className="w-full max-w-[680px] bg-[#B5864D] py-7 px-6 text-center">
          <p className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/70">
            Oferta por tiempo limitado
          </p>
          <Link
            href={PEDIDO_LINK}
            className="animate-wa-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25d366] px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-wide text-white transition hover:bg-[#128c7e]"
          >
            <WaIcon />
            Pide la tuya ahora
          </Link>
          <p className="mt-3 text-[0.65rem] tracking-widest text-white/70 uppercase">
            +57 320 872 1695 · Respondemos en minutos
          </p>
        </div>
      </main>

      {/* Botón flotante WhatsApp — va directo, sin pasar por el formulario */}
      <Link
        href={WA_FLOAT}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition hover:scale-110 hover:bg-[#128c7e] animate-wa-ring"
      >
        <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>
    </>
  );
}
