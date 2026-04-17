import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/colecciones", label: "Colecciones" },
  { href: "/cotizacion", label: "Cotización" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-white/95 backdrop-blur">
      <div className="container-shell py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/brand/logo-garden-morado.png"
              alt="Orquideas Garden logo"
              width={72}
              height={72}
              className="h-12 w-auto shrink-0 sm:h-14"
              priority
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-display text-base tracking-wide text-ivory sm:text-lg">
                Orquideas <span className="text-champagne">Garden</span>
              </span>
              <span className="brand-subtitle hidden sm:inline">Floral Boutique · Bogotá</span>
            </span>
          </Link>

          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary btn-mini shrink-0"
          >
            WhatsApp
          </Link>
        </div>

        <nav className="mt-3 overflow-x-auto pb-1" aria-label="Navegación principal">
          <ul className="flex min-w-max items-center gap-4 text-sm text-pearl sm:justify-end sm:gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="whitespace-nowrap transition-colors duration-300 hover:text-champagne"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}


