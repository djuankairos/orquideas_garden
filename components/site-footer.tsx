import Link from "next/link";
import Image from "next/image";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/35 bg-white/90">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="mb-3">
            <Image
              src="/brand/logo-garden-morado.png"
              alt="Orquideas Garden logo"
              width={180}
              height={90}
              className="h-14 w-auto"
            />
          </div>
          <p className="font-display text-2xl text-pearl">{SITE_NAME}</p>
          <p className="brand-subtitle mt-1">Floral Boutique · Bogotá ®</p>
          <p className="mt-2 max-w-xs text-sm text-smoke">
            Orquideas premium para regalo y condolencias con entrega nacional.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/orquideasgarden/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Orquideas Garden"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 text-pearl transition hover:border-champagne hover:text-champagne"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2zm0 1.9A3.3 3.3 0 0 0 3.9 7.2v9.6a3.3 3.3 0 0 0 3.3 3.3h9.6a3.3 3.3 0 0 0 3.3-3.3V7.2a3.3 3.3 0 0 0-3.3-3.3H7.2zm10.25 1.45a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.9A3.1 3.1 0 1 0 12 15.1 3.1 3.1 0 0 0 12 8.9z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@orquideasgarden"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Orquideas Garden"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 text-pearl transition hover:border-champagne hover:text-champagne"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M14.2 3v11.01a3.3 3.3 0 1 1-2.86-3.26V8.22a5.9 5.9 0 1 0 5.46 5.9V8.38a6.5 6.5 0 0 0 3.82 1.25V7.14a3.95 3.95 0 0 1-3.06-1.45 4 4 0 0 1-.95-2.69H14.2z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/orquideasgardenbog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Orquideas Garden"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 text-pearl transition hover:border-champagne hover:text-champagne"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M13.5 8.5V6.7c0-.54.36-.67.61-.67h1.54V3.4l-2.12-.01C11.18 3.39 10 4.95 10 7.2v1.3H8v2.8h2V20h3.5v-8.7h2.35l.35-2.8H13.5z" />
              </svg>
            </a>
          </div>
        </div>
        <nav aria-label="Navegación secundaria">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-champagne">
            Navegación
          </p>
          <ul className="space-y-2 text-sm text-pearl">
            <li>
              <Link href="/colecciones">Colecciones</Link>
            </li>
            <li>
              <Link href="/cotizacion">Cotización</Link>
            </li>
            <li>
              <Link href="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-champagne">Legal</p>
          <ul className="space-y-2 text-sm text-pearl">
            <li>
              <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidad">Política de Privacidad</Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>{CONTACT_PHONE}</li>
            <li>{CONTACT_ADDRESS}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
