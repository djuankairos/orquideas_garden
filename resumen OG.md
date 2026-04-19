# RESUMEN OG - Estado actualizado Orquideas Garden

## 1) Estado general actual
- Proyecto operativo en Next.js (App Router) + TypeScript + Tailwind.
- Checkout se mantiene en WooCommerce por enlace directo por producto.
- Dominio canónico del sitio: `https://orquideasgarden.online` (corregido 2026-04-19).
- Variable `NEXT_PUBLIC_SITE_URL=https://orquideasgarden.online` configurada en Vercel (Production + Preview).
- Repositorio sincronizado en GitHub: `djuankairos/orquideas_garden`.

## 2) Historial de cambios implementados

### 2.1 SEO técnico y servidor (previo)
- Redirecciones 301 por host para consolidar tráfico.
- Ajuste semántico de `title` y hero para coherencia con H1.

### 2.2 Corrección de codificación (previo)
- Reparación de mojibake en textos visibles y metadatos (caracteres `Ã`, `Â`, `®`).

### 2.3 Verificación Meta/Facebook (previo)
- Meta tag de verificación de dominio en `app/layout.tsx`.

### 2.4 Encuadre de imágenes (previo)
- Tarjetas con `aspect-video`, `object-fit: cover`, `object-position` por ítem.

### 2.5 Auditoría SEO completa — 2026-04-19
- Score inicial: **51/100**. Score potencial post-correcciones: **~74/100**.
- Causa raíz identificada: fallback de `SITE_URL` a `.store` rompía canonicals, sitemap, schema y OG tags.

### 2.6 Correcciones SEO sprint 1 — 2026-04-19 ✅
- **`lib/site.ts`**: fallback corregido de `.store` → `.online`.
- **`NEXT_PUBLIC_SITE_URL`**: configurada en Vercel (Production + Preview).
- **`public/llms.txt`**: 17 URLs reescritas a `.online`; 6 respuestas FAQ expandidas a ~100 palabras para citabilidad AI.
- **`TrustStats`**: fix SSR — crawlers ahora ven "+2.500 orquídeas entregadas" y "2016" en lugar de "0".
- **Favicon**: `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` añadidos; `app/manifest.ts` creado con datos de marca reales.

### 2.7 Correcciones SEO sprint 2 — 2026-04-19 ✅
- **Título producto**: `{ absolute }` en `generateMetadata` — elimina doble `| Orquideas Garden`.
- **OG title `/colecciones`**: encoding corregido (`â€"` → `–` real via `\u2013`).
- **Florist schema** (`app/layout.tsx`): añadidos `@id`, `geo` (4.6789, -74.0522), `hasMap`, `aggregateRating` (5/5 · 4 reseñas).
- **FAQPage schema**: JSON-LD con 6 preguntas emitido desde `app/page.tsx`.
- **WebSite schema**: JSON-LD con `@id` y `publisher` link al Florist en `app/page.tsx`.

## 3) Estado funcional clave
- Hero activo en Home con carrusel e imágenes locales.
- Navegación principal estable (Inicio, Colecciones, Cotización, Sobre Nosotros, Contacto).
- Formulario de cotización vía WhatsApp activo en `/cotizacion`.
- Enlaces de compra hacia WooCommerce desde tarjetas y detalle de producto.

## 4) Score SEO actual (post sprint 1 + 2)
| Categoría | Score inicial | Post sprint 1 | Post sprint 2 |
|-----------|--------------|--------------|--------------|
| Technical SEO | 28/100 | ~46/100 | ~48/100 |
| Content & E-E-A-T | 61/100 | 61/100 | 61/100 |
| On-Page SEO | 58/100 | 58/100 | ~63/100 |
| Schema / Structured Data | 52/100 | ~52/100 | ~68/100 |
| Performance (CWV) | 72/100 | 72/100 | 72/100 |
| AI Search Readiness (GEO) | 47/100 | ~57/100 | ~62/100 |
| Images | 78/100 | 78/100 | 78/100 |
| **TOTAL** | **51/100** | **~58/100** | **~64/100** |

> Ganancia real confirmada cuando Google re-indexe tras crawl (~48-72 hrs post-deploy).

## 5) Pendientes priorizados (por ROI)

### ALTO — Esta semana
- [x] Corregir título duplicado en páginas de producto — ✅ sprint 2
- [x] Implementar **FAQPage schema** JSON-LD en homepage — ✅ sprint 2
- [x] Añadir **AggregateRating** al schema Florist — ✅ sprint 2
- [x] Añadir **GeoCoordinates** y `hasMap` al schema Florist — ✅ sprint 2
- [x] Añadir **WebSite schema** en homepage — ✅ sprint 2
- [x] Corregir encoding OG title `/colecciones` — ✅ sprint 2
- [ ] Migrar imágenes de producto de `orquideasgarden.store/wp-content/` al hosting propio

### MEDIO — Próximo mes
- [ ] Reescribir `/sobre-nosotros` (actualmente ~95 palabras — objetivo 500-800)
- [ ] Expandir FAQ answers en el componente a 80-140 palabras (UI visible)
- [ ] Añadir Google Maps embed en `/contacto`
- [ ] Implementar estrategia de reviews verificadas (Google Reviews)
- [ ] Verificar y optimizar Google Business Profile

### BAJO — Backlog
- [ ] Email con dominio propio (`hola@orquideasgarden.online`)
- [ ] Canal de YouTube (correlación 0.737 con AI citations)
- [ ] Páginas de servicio locales: condolencias, regalo, corporativo
- [ ] Resolver dual-domain a largo plazo (301 permanente de `.store` a `.online`)
- [ ] Web manifest / PWA — ✅ manifest.ts creado, falta `display: standalone` testing

## 6) Notas de control
- Build validado. Cambios desplegados vía push a `main`.
- Regla de contenido vigente: no alterar textos actuales sin aprobación; redactar en español LATAM (Colombia).
- Auditoría SEO completa disponible en `SEO-AUDIT-REPORT.md`.
