import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="container-shell py-16">
      <section className="card-shell text-center">
        <p className="eyebrow">Navegación</p>
        <h1 className="mt-2 font-display text-5xl text-ivory">Página no encontrada</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-smoke">
          Esta URL no existe en la nueva arquitectura. Puedes volver al inicio o revisar las
          colecciones activas.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-brand-primary">
            Ir al inicio
          </Link>
          <Link href="/colecciones" className="btn-brand-secondary">
            Ver colecciones
          </Link>
        </div>
      </section>
    </main>
  );
}

