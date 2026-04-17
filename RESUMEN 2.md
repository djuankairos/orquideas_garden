# RESUMEN 2 - Estado real del proyecto Orquideas Garden

## Estado actual
- Proyecto en Next.js (App Router) con TypeScript y Tailwind CSS.
- Checkout se mantiene en WooCommerce mediante enlaces directos por producto.
- Dominio objetivo y configurado en constantes: `https://orquideasgarden.store`.
- Alcance de este ajuste: documentacion alineada al codigo actual, sin refactor funcional.

## Arquitectura
- `app/`: rutas, metadata, sitemap y robots.
- `components/`: bloques de negocio (header, footer, tarjetas, cotizacion, checkout link).
- `components/ui/`: inventario real actual:
  - `feature-carousel.tsx`
  - `button.tsx`
- `lib/`: catalogo, analitica (`click_cta_checkout`), sitio y utilidades.
- `public/`: marca, imagenes hero, legales y `llms.txt`.

## Rutas activas (estado real)
- Estaticas principales:
  - `/`
  - `/colecciones`
  - `/cotizacion`
  - `/sobre-nosotros`
  - `/terminos-y-condiciones`
  - `/politica-de-privacidad`
  - `/contacto`
  - `/demo`
- Dinamicas:
  - `/colecciones/[slug]`
  - `/producto/[slug]`
- Nota sitemap:
  - `app/sitemap.ts` incluye estaticas clave (no incluye `/demo`) y genera dinamicas desde `lib/catalog.ts`.

## Branding y Home
- Home real: `app/page.tsx`.
- Hero real activo: `HeroSection` desde `components/ui/feature-carousel.tsx`.
- No hay componente activo de acordeon hover en `components/ui` para Home.
- Hero usa 5 imagenes locales:
  - `/hero/accordion/mg-0567.jpg`
  - `/hero/accordion/mg-0568.jpg`
  - `/hero/accordion/mg-0577.jpg`
  - `/hero/accordion/mg-0765.jpg`
  - `/hero/accordion/mg-0777.jpg`
- Header activo con boton WhatsApp directo y navegacion:
  - Inicio, Colecciones, Cotizacion, Sobre Nosotros, Contacto.
- Activos de marca y negocio:
  - Logo: `public/brand/logo-garden-morado.png`
  - Email: `orquideasgarden16@gmail.com`
  - Telefono: `+57 320 872 1695`
  - Direccion: `Calle 97#70c-95, Bogota, Colombia`
  - WhatsApp: `https://wa.me/573208721695`

## SEO y GEO (implementado)
- Metadata global en `app/layout.tsx`:
  - `title` base + template
  - `description`
  - canonical base
  - Open Graph
  - Twitter card
  - robots index/follow
- Metadata por paginas clave implementada (home, colecciones, cotizacion, contacto, legales, sobre nosotros).
- Datos estructurados en layout con schema `Florist`.
- `app/robots.ts` y `app/sitemap.ts` activos.
- `next.config.ts` incluye headers de seguridad y redirects legacy:
  - `/tienda -> /colecciones`
  - `/aviso-de-privacidad -> /politica-de-privacidad`
  - `/politicas-de-envios-y-entregas -> /terminos-y-condiciones`
  - `/orquideas-garden-2 -> /`
- Analitica de conversion disponible:
  - Evento `click_cta_checkout` en `lib/analytics.ts`
  - GA4 condicionado por `NEXT_PUBLIC_GA_ID`.

## Cotizacion (estado real del flujo)
- Ruta: `/cotizacion`.
- Vista: `app/cotizacion/page.tsx`.
- Formulario: `components/cotizacion-form.tsx`.
- Comportamiento actual:
  - Al enviar, toma valores del formulario con `FormData`.
  - Construye mensaje completo de cotizacion.
  - Abre `https://wa.me/573208721695?text=...` en nueva pestana.
- Campos enviados:
  - Nombre
  - Telefono
  - Email
  - Ocasion
  - Fecha de entrega
  - Presupuesto estimado
  - Producto o coleccion de interes
  - Detalle adicional

## Legal
- PDFs legales disponibles en `public/legal`:
  - `terminos-condiciones-orquideas-garden.pdf`
  - `politicas-envio-entregas.pdf`
  - `politica-datos-personales-orquideas-garden.pdf`
- Las paginas legales estan activas en App Router.

## Pendientes priorizados y accionables
1. Validar manualmente en navegador que `/cotizacion` abra WhatsApp con mensaje precargado en ambiente local y staging.
2. Ejecutar smoke test completo de rutas publicas (`/`, `/colecciones`, `/cotizacion`, `/contacto`, legales y `/demo`).
3. Revisar si `/demo` debe permanecer publica o excluirse de navegacion/produccion.
4. Conectar y validar `NEXT_PUBLIC_GA_ID` real para medir `click_cta_checkout`.
5. Optimizar peso/compresion de imagenes del hero para mejorar LCP.
