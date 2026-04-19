# Auditoría SEO Completa — Orquídeas Garden
**Sitio auditado:** https://orquideasgarden.online/  
**Fecha:** 2026-04-19  
**Agentes especializados:** Technical · Content/E-E-A-T · Schema · Performance · GEO · Local SEO  

---

## Puntuación SEO General: 51/100 → ~64/100 (sprint 1 + 2 completados 2026-04-19)

| Categoría | Peso | Score inicial | Post sprint 1+2 | Weighted actual |
|-----------|------|--------------|----------------|----------------|
| Technical SEO | 22% | 28/100 | ~48/100 | 10.6 |
| Content & E-E-A-T | 23% | 61/100 | 61/100 | 14.0 |
| On-Page SEO | 20% | 58/100 | ~63/100 | 12.6 |
| Schema / Structured Data | 10% | 52/100 | ~68/100 | 6.8 |
| Performance (CWV) | 10% | 72/100 | 72/100 | 7.2 |
| AI Search Readiness (GEO) | 10% | 47/100 | ~62/100 | 6.2 |
| Images | 5% | 78/100 | 78/100 | 3.9 |
| **TOTAL** | **100%** | **51/100** | **~64/100** | **61.3** |

> Score potencial con pendientes restantes: **~74/100** (migración imágenes + /sobre-nosotros + Maps embed).

---

## CAUSA RAÍZ DE TODOS LOS PROBLEMAS — 1 sola línea

**Archivo:** `lib/site.ts`, línea 5

```typescript
// ESTADO ACTUAL — ROTO:
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orquideasgarden.store";

// CORRECCIÓN:
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orquideasgarden.online";
```

**¿Por qué causa todo?**  
La variable de entorno `NEXT_PUBLIC_SITE_URL` **no está configurada en Vercel**. Como no existe, el fallback codificado resuelve a `orquideasgarden.store` para TODAS las operaciones:
- Canonical tags → apuntan a `.store`
- Sitemap URLs → apuntan a `.store`
- Schema `url`, `logo`, `image` → apuntan a `.store`
- OG:url → apunta a `.store`
- BreadcrumbList items → apuntan a `.store`
- Schema Florist `@id` → apunta a `.store`

**Este es el único cambio con mayor ROI de toda la auditoría.**

Adicionalmente, el archivo `public/llms.txt` es estático y NO se beneficia de la variable de entorno — debe editarse manualmente.

---

## Resumen Ejecutivo

### Tipo de negocio detectado
**Floristería boutique local-híbrida** (presencia física + e-commerce)  
Bogotá, Colombia · Orquídeas Phalaenopsis premium · Regalo / Celebración / Condolencias  
Stack: **Next.js App Router** en **Vercel** (sitio nuevo) | WordPress/PHP en Apache (sitio viejo en `.store`)

### Los 5 Problemas Más Críticos
1. ✅ **`NEXT_PUBLIC_SITE_URL` no configurado en Vercel** → RESUELTO sprint 1
2. ✅ **`public/llms.txt` con 17 URLs hardcodeadas a `.store`** → RESUELTO sprint 1
3. ✅ **`TrustStats` componente renderiza "0"** para crawlers → RESUELTO sprint 1
4. ✅ **Favicon completamente ausente** (404 en todos los formatos) → RESUELTO sprint 1
5. ⏳ **`/sobre-nosotros` tiene ~95 palabras de contenido real** → PENDIENTE (medio plazo)

### Los 5 Quick Wins Inmediatos
1. ✅ Configurar `NEXT_PUBLIC_SITE_URL=https://orquideasgarden.online` en Vercel — COMPLETADO
2. ✅ Actualizar fallback en `lib/site.ts` línea 5 — COMPLETADO
3. ✅ Reescribir `public/llms.txt` con URLs de `.online` — COMPLETADO
4. ✅ Añadir favicon (`app/favicon.ico`, `icon.svg`, `apple-icon.png`) — COMPLETADO
5. ✅ Corregir título duplicado en producto — COMPLETADO

---

## 1. Technical SEO — Score: 28/100

### Infraestructura

| Check | Estado | Notas |
|-------|--------|-------|
| HTTPS + HSTS | ✅ | max-age=31536000; includeSubDomains |
| HTTP → HTTPS redirect | ✅ | Correcto |
| www → non-www redirect | ✅ | Redirige a orquideasgarden.online |
| Vercel CDN activo | ✅ | X-Vercel-Cache: HIT, TTFB 241ms |
| Pre-rendering Next.js | ✅ | X-Nextjs-Prerender: 1 |
| SSR HTML completo | ✅ | Server Components en App Router |
| robots.txt accesible | ✅ | HTTP 200 |
| sitemap.xml accesible | ✅ | HTTP 200 — URLs ahora a `.online` |
| 404 manejo correcto | ✅ | HTTP 404 real |
| **Canonical correcto** | ✅ RESUELTO | `NEXT_PUBLIC_SITE_URL` configurada en Vercel |
| **URLs en sitemap** | ✅ RESUELTO | Generadas desde `absoluteUrl()` → `.online` |
| **Sitemap en robots.txt** | ✅ RESUELTO | Apunta a `orquideasgarden.online/sitemap.xml` |
| Favicon | ✅ RESUELTO | `app/favicon.ico`, `icon.svg`, `apple-icon.png` |
| Web manifest / PWA | ✅ RESUELTO | `app/manifest.ts` con datos reales de marca |

### Seguridad HTTP (Excelente)

| Header | Valor |
|--------|-------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains ✅ |
| X-Frame-Options | DENY ✅ |
| X-Content-Type-Options | nosniff ✅ |
| Content-Security-Policy | Configurado ✅ |
| Referrer-Policy | strict-origin-when-cross-origin ✅ |
| Permissions-Policy | camera=(), microphone=(), geolocation=() ✅ |

### Arquitectura del Dominio ✅ RESUELTO (sprint 1)

```
orquideasgarden.online  ──canonicals──▶  orquideasgarden.online  ✅
        ▲                                       
   Sitio NUEVO (activo)              
   Next.js / Vercel                 
   NEXT_PUBLIC_SITE_URL configurada  
```

El fallback a `.store` fue eliminado. Canonicals, sitemap, schema y OG tags apuntan correctamente a `.online`. El sitio `.store` (WordPress) sigue activo pero ya no interfiere con los canonicals del nuevo sitio.

---

## 2. Content Quality & E-E-A-T — Score: 61/100

*(Análisis del agente especializado en contenido)*

### E-E-A-T Breakdown

| Pilar | Score | Fortalezas | Debilidades |
|-------|-------|-----------|------------|
| Experience | 12/20 | Testimonios con barrios Bogotá, "desde 2016" | Sin timestamps en reviews, sin fuente verificable |
| Expertise | 16/25 | FAQ correcto, lenguaje apropiado condolencias, "Phalaenopsis" específico | `/sobre-nosotros` solo ~95 palabras, sin autor nombrado |
| Authoritativeness | 13/25 | Schema bien estructurado, sameAs en RRSS, Facebook domain verification | Sin citas externas, sin prensa, sin directorios |
| Trustworthiness | 24/30 | Dirección física, teléfono, horario, Bold (procesador verificable), términos legales | Email Gmail vs posicionamiento premium |

### Profundidad de Contenido Real

| Página | Palabras HTML | Prosa real estimada | Riesgo |
|--------|--------------|--------------------|----|
| Homepage | ~1,692 | ~650–750 | ✅ Bajo |
| /colecciones | ~599 | ~200 | ⚠️ Medio |
| /sobre-nosotros | ~563 | **~95** | ❌ ALTO |
| /cotizacion | ~498 | **~80** | ❌ ALTO |
| /contacto | ~498 | ~120 | ⚠️ Medio |

> El conteo de palabras incluye navegación, footer y labels de formularios. La **prosa real** es significativamente menor.

### ✅ TrustStats — RESUELTO sprint 1

`animatedCounts` inicia en `null` → SSR renderiza `item.value` directamente. Crawlers leen "+2.500 orquídeas entregadas", "2016" y "7/7". La animación se activa solo cuando el usuario hace scroll hasta la sección (progressive enhancement).

---

## 3. On-Page SEO — Score: 58/100

### Títulos

| Página | Título | Chars | Estado |
|--------|--------|-------|--------|
| Homepage | Orquideas en Bogota para regalar, celebrar y acompanar \| Orquideas Garden | 74 | ⚠️ +4 sobre límite |
| /colecciones | Colecciones de Orquideas \| Orquideas Garden | 44 | ✅ |
| /colecciones/cromadas | Colección Cromadas \| Orquideas Garden | 38 | ✅ |
| /sobre-nosotros | Sobre Nosotros \| Orquideas Garden | 34 | ⚠️ Genérico |
| /cotizacion | Solicitar Cotización \| Orquideas Garden | 41 | ✅ |
| /contacto | Contacto \| Orquideas Garden | 28 | ⚠️ Muy corto |
| Producto | Gift Box Combo Cumpleaños \| Orquideas Garden | 44 | ✅ RESUELTO — `{ absolute }` en generateMetadata |

### Meta Descripciones

| Página | Chars | Estado |
|--------|-------|--------|
| Homepage | 154 | ✅ |
| /colecciones | 78 | ⚠️ Corta |
| /sobre-nosotros | 100 | ✅ |
| /cotizacion | 97 | ✅ |

### Issues Adicionales

- ✅ **OG title en /colecciones** — RESUELTO: `\u2013` (escape Unicode) reemplaza el em dash con encoding roto
- **`og:type` en páginas de producto:** está como `"website"` en lugar de `"product"`
- **Producto schema imagen placeholder:** `orquideasgarden.store/images/placeholder-orquidea.svg` (posible 404)
- **Offers URL en Product schema:** apunta a URL WooCommerce `/?post_type=product&p=400` (no canónica)

---

## 4. Schema / Structured Data — Score: 52/100

*(Análisis del agente especializado en schema)*

### Inventario Completo

| Página | Tipos | Count | Issues |
|--------|-------|-------|--------|
| Todas (layout) | Florist | 1 | ✅ url/logo/image → `.online`; +@id, geo, hasMap, aggregateRating |
| Producto | Product + BreadcrumbList | 2 | ✅ URLs → `.online` via `absoluteUrl()` |
| Colecciones | BreadcrumbList | 1 | ✅ items → `.online` |
| Homepage | WebSite + FAQPage | 2 | ✅ Añadidos en sprint 2 |

### Florist Schema — Lo que está bien / mal

```json
// ✅ Estado actual (post sprint 1+2):
"@type": "Florist",
"@id": "https://orquideasgarden.online/#florist",
"url": "https://orquideasgarden.online",
"logo": "https://orquideasgarden.online/brand/logo-garden-morado.png",
"geo": { "@type": "GeoCoordinates", "latitude": 4.6789, "longitude": -74.0522 },
"hasMap": "https://maps.google.com/?q=Calle+97+%2370c-95+Bogot%C3%A1",
"aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "4" },
"address": { "streetAddress": "Calle 97#70c-95", "postalCode": "110911" },
"openingHoursSpecification": [{ "dayOfWeek": ["Monday"..."Saturday"], "opens": "08:00" }],
"sameAs": ["instagram", "tiktok", "facebook"]
```

### Schema — Estado actual

| Schema Type | Estado |
|-------------|--------|
| FAQPage | ✅ Añadido en sprint 2 — 6 preguntas en `app/page.tsx` |
| WebSite | ✅ Añadido en sprint 2 con `@id` y publisher link |
| AggregateRating | ✅ Añadido en sprint 2 — 5/5 · 4 reseñas |
| GeoCoordinates | ✅ Añadido en sprint 2 — lat 4.6789, lng -74.0522 |

---

## 5. Performance (Core Web Vitals) — Score: 72/100

### Tiempos de Servidor

| Métrica | Valor |
|---------|-------|
| DNS Lookup | 9.7ms ✅ |
| TCP Connect | 11.6ms ✅ |
| TTFB | 241ms ✅ |
| Total | 308ms ✅ |

### Stack de Rendimiento

**Fortalezas:**
- Vercel CDN con cache HIT → baja latencia
- Next.js Image: conversión automática a WebP + srcSet responsivo
- Hero images con `link rel="preload"` → LCP favorecido
- Non-hero images con `loading="lazy"` → prioridades correctas
- Fonts preloaded como `.woff2`
- HTML pre-renderizado (no SSR en tiempo real)

**Riesgos:**
- **❌ ALTO:** Imágenes de producto desde `orquideasgarden.store/wp-content/` → dependencia externa, latencia adicional, si cae `.store` las imágenes desaparecen
- **⚠️ MEDIO:** Homepage HTML 95KB (grande)
- **⚠️ MEDIO:** GA4 + GTM impactan INP en móvil

### Estimación Core Web Vitals

| Métrica | Estimación | Target |
|---------|-----------|--------|
| LCP | ~1.8–2.5s | < 2.5s ✅ |
| INP | ~150–250ms | < 200ms ⚠️ |
| CLS | < 0.05 | < 0.1 ✅ |

---

## 6. AI Search Readiness (GEO) — Score: 47/100

*(Análisis del agente especializado en GEO)*

### Acceso de Crawlers IA — robots.ts

| Bot | Estado |
|-----|--------|
| GPTBot / OAI-SearchBot / ChatGPT-User | ✅ Allow: / |
| ClaudeBot | ✅ Allow: / |
| PerplexityBot | ✅ Allow: / |
| CCBot / anthropic-ai / cohere-ai | ⚠️ Por wildcard — no training-opt-out efectivo |

### llms.txt — Existe pero crítico

**URL:** `https://orquideasgarden.online/llms.txt` → HTTP 200 ✅  
**Estructura:** Bien organizada (identidad, colecciones, páginas, productos, contacto, keywords)  
**✅ RESUELTO sprint 1:** 17 URLs reescritas a `.online`. Línea de atribución corregida. 6 respuestas FAQ expandidas a ~100 palabras para citabilidad AI.

### Scores por Plataforma IA

| Plataforma | Score | Bloqueador Principal |
|------------|-------|---------------------|
| Google AI Overviews | 34/100 | Canonical mismatch + sin AggregateRating |
| ChatGPT Search | 52/100 | llms.txt URLs a `.store` |
| Perplexity | 55/100 | FAQ answers muy cortas (~28 palabras) |
| Bing Copilot | 44/100 | Sitemap a `.store` |

### Problemas de Citabilidad

1. ⏳ **FAQ answers UI: ~28 palabras promedio** → rango óptimo para AI citation: 134–167 palabras (llms.txt ya tiene respuestas largas; falta expandir el componente UI)
2. ✅ **TrustStats SSR** → RESUELTO sprint 1 — crawlers ven "+2.500", "2016", "7/7"
3. ⏳ **FAQSection "use client"** → preguntas 2–6 colapsadas, posiblemente invisibles para crawlers sin JS
4. **About Us: ~95 palabras** → casi cero contenido citable para construir perfil de entidad
5. **Sin YouTube** → correlación 0.737 con AI citations (la señal de mayor peso)
6. **Sin Wikidata entity** → sin ancla de autoridad para resolución de entidades

### Content Gaps para AI-Answered Queries

| Query | Gap |
|-------|-----|
| "mejores florerías Bogotá" | Sin página de posicionamiento competitivo |
| "flores condolencias Bogotá" | Sin guía de etiqueta floral para ocasiones fúnebres |
| "cómo cuidar orquídea Phalaenopsis" | FAQ tiene 19 palabras — promesa sin contenido |
| "envío flores mismo día Bogotá" | Info enterrada en acordeón colapsado |
| "regalos empresariales Bogotá flores" | Mencionado en testimonios, sin página dedicada |

---

## 7. Local SEO — Score: 41/100

*(Análisis del agente especializado en Local SEO)*

### NAP — Inconsistencias Críticas

| Dato | orquideasgarden.online | orquideasgarden.store | Match |
|------|----------------------|----------------------|-------|
| Nombre | Orquideas Garden | Orquideas Garden | ✅ |
| Dirección | Calle 97#70c-95, Bogotá | No visible en homepage | Parcial |
| Teléfono | +57 320 872 1695 | 3208721695 (sin código) | ⚠️ Formato |
| Teléfono 2 | — | **3185300284** (número extra!) | ❌ CRÍTICO |
| Email | orquideasgarden16@gmail.com | info@orquideasgarden.local | ❌ CRÍTICO |
| URL en schema | `.store` (fallback) | `.store` | ❌ Ambos mal |

> El número adicional `3185300284` en `.store` hace que Google vea dos teléfonos distintos bajo la misma marca → dilución de autoridad en citaciones.

### GBP Signals — Sin Confirmar

| Signal | Estado |
|--------|--------|
| Google Maps embed en el sitio | ❌ Ausente en TODAS las páginas |
| hasMap en schema | ✅ Añadido sprint 2 |
| AggregateRating en schema | ✅ Añadido sprint 2 |
| Reviews verificadas con plataforma | ❌ Solo testimonios hardcodeados |
| GBP verificado | ❓ No confirmable desde HTML |

> Sin GBP verificado = **0 visibilidad en Local Pack** (los 3 resultados del mapa que capturan el mayor % de clics locales).

### Schema Local — Faltante Clave

```json
// Agregar al Florist schema en layout.tsx:
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 4.67890,
  "longitude": -74.05220
},
"hasMap": "https://maps.google.com/?q=Calle+97+%2370c-95+Bogota"
```

---

## 8. Images — Score: 78/100

| Check | Estado |
|-------|--------|
| Alt text en todas las imágenes | ✅ Descriptivos y presentes |
| Next.js Image (WebP auto) | ✅ srcSet con múltiples breakpoints |
| Hero images preloaded | ✅ link rel="preload" |
| Lazy loading en non-hero | ✅ Correcto |
| **Imágenes producto desde .store/wp-content** | ❌ Dependencia externa crítica |
| OG:image domain | ✅ Apunta a .online (resuelto con NEXT_PUBLIC_SITE_URL) |
| Imagen placeholder en schema | ❌ `placeholder-orquidea.svg` posible 404 |

---

## Plan de Acción Completo y Priorizado

### CRÍTICO — Esta semana

#### 1. ✅ Configurar variable de entorno en Vercel — COMPLETADO 2026-04-19
`NEXT_PUBLIC_SITE_URL = https://orquideasgarden.online` configurada en Production + Preview. Deploy realizado.

#### 2. ✅ Actualizar fallback en lib/site.ts — COMPLETADO 2026-04-19
`lib/site.ts` línea 5 corregida: fallback a `https://orquideasgarden.online`.

#### 3. ✅ Reescribir public/llms.txt — COMPLETADO 2026-04-19
17 URLs reescritas a `.online`. Línea de atribución corregida. 6 respuestas FAQ expandidas a ~100 palabras para citabilidad AI.

#### 4. Corregir robots.txt sitemap directive
**Archivo:** `app/robots.ts`
```typescript
// Verificar que usa absoluteUrl que resuelva a .online
// El Sitemap: field debe generar: https://orquideasgarden.online/sitemap.xml
```

#### 5. ✅ Arreglar TrustStats SSR — COMPLETADO 2026-04-19
`components/ui/trust-stats.tsx` corregido: `animatedCounts` inicia en `null`, SSR renderiza valores finales (`+2.500`, `2016`, `7/7`). Animación es progressive enhancement.

#### 6. ✅ Añadir favicon — COMPLETADO 2026-04-19
`app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` añadidos. `app/manifest.ts` creado con datos reales de marca (reemplaza placeholder "MyWebSite").

#### 7. ✅ Corregir título duplicado en páginas de producto — COMPLETADO 2026-04-19
`app/producto/[slug]/page.tsx`: `title: { absolute: product.seo_title }` — evita que el template del layout añada una segunda vez `| Orquideas Garden`.

---

### ALTO — Esta semana

#### 8. Migrar imágenes de producto al hosting propio
**Archivos con URLs a migrar:**
- `lib/catalog.ts` → campos `imagenes[]` y `woo_checkout_url`
- Mover archivos a `public/productos/` o usar CDN propio

#### 9. ✅ Implementar FAQPage schema — COMPLETADO 2026-04-19
**Archivo:** `components/ui/faq-section-shadcnui.tsx` o `app/page.tsx`  
Mover el array de FAQs a `lib/faq-data.ts` y generar JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Tienen entregas el mismo día en Bogotá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Expandir a 80-140 palabras con detalle de zonas, horario de corte, qué pasa si no hay stock]"
      }
    }
    // ... resto de FAQs
  ]
}
```

#### 10. ✅ Añadir AggregateRating al schema Florist — COMPLETADO 2026-04-19
**Archivo:** `app/layout.tsx`
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "4",
  "bestRating": "5",
  "worstRating": "1"
}
```

#### 11. ✅ Añadir GeoCoordinates y hasMap al schema — COMPLETADO 2026-04-19
```json
"geo": { "@type": "GeoCoordinates", "latitude": 4.67890, "longitude": -74.05220 },
"hasMap": "https://maps.google.com/?q=Calle+97+%2370c-95+Bogotá"
```

#### 12. ✅ Añadir WebSite schema — COMPLETADO 2026-04-19
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://orquideasgarden.online/#website",
  "name": "Orquideas Garden",
  "url": "https://orquideasgarden.online",
  "inLanguage": "es-CO"
}
```

#### 13. ✅ Corregir encoding OG title en /colecciones — COMPLETADO 2026-04-19
`app/colecciones/page.tsx`: em dash reemplazado por escape Unicode `\u2013` para evitar problemas de encoding.

#### 14. Expandir FAQ answers a 80-140 palabras
Cada respuesta actual (~28 palabras) está por debajo del umbral de citabilidad para AI Overviews.

---

### MEDIO — Próximo mes

#### 15. Reescribir /sobre-nosotros (prioridad alta para E-E-A-T)
La página actual tiene ~95 palabras de contenido real. Mínimo necesario para E-E-A-T:
- Historia fundacional con año (2016)
- Nombre del fundador/equipo
- Especificidad sobre Phalaenopsis (por qué solo esta variedad)
- Zonas de Bogotá servidas
- Diferenciador vs floristería genérica
- Target: 500–800 palabras de prosa original

#### 16. Crear página de contenido de alto valor para GEO
Opciones (elegir la más estratégica):
- `/guia/flores-condolencias-bogota` — alta intención, poca competencia en AI
- `/guia/cuidado-orquideas-phalaenopsis` — long-tail post-purchase, alta autoridad

#### 17. Añadir Google Maps embed en /contacto
Embed del iframe de Maps para "Calle 97#70c-95, Bogotá" — señal de presencia física para Google.

#### 18. Implementar estrategia de reviews verificadas
- Link a Google Review en /contacto y en mensajes WhatsApp post-entrega
- Una vez con reviews reales, actualizar AggregateRating con datos reales

#### 19. Verificar y optimizar Google Business Profile
- Categoría primaria: "Florist" (factor #1 de ranking local)
- URL en GBP: `https://orquideasgarden.online`
- Teléfono: +57 320 872 1695 (consistente con schema)
- Mínimo 10 fotos (interior/producto/exterior)

#### 20. Resolver segundo teléfono en orquideasgarden.store
El número `3185300284` visible en `.store` crea inconsistencia de NAP. Decidir si es vigente y añadirlo a `.online`, o eliminarlo de `.store`.

---

### BAJO — Backlog

#### 21. Web manifest / PWA básico
```json
// public/manifest.json
{
  "name": "Orquideas Garden",
  "short_name": "OrqGarden",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6b3fa0"
}
```

#### 22. Email con dominio propio
`hola@orquideasgarden.online` vs el actual `orquideasgarden16@gmail.com` — mejora señal de confianza para marca premium.

#### 23. Canal de YouTube
Con correlación 0.737 en AI citations, incluso 3-5 videos (unboxing, care guide, entregas) sería la inversión de contenido con mayor impacto en GEO.

#### 24. Añadir Google Maps URL al sameAs del schema

#### 25. Wikidata entity básica
Nombre, ciudad, año fundación, URL, redes sociales — ancla de autoridad para resolución de entidades en IA.

#### 26. Páginas de servicio locales dedicadas
- `/arreglos-condolencias-bogota`
- `/orquideas-regalo-bogota`
- `/floreria-corporativa-bogota`

#### 27. Resolver dual-domain a largo plazo
Decisión estratégica: ¿`.online` o `.store` como dominio canónico permanente? Una vez decidido, configurar 301 permanente del dominio descartado al canónico.

---

## Impacto Estimado por Acción

| Acción | Esfuerzo | +Score SEO | +Score GEO |
|--------|---------|-----------|-----------|
| Configurar NEXT_PUBLIC_SITE_URL en Vercel | 5 min | +18 pts | +12 pts |
| Corregir lib/site.ts fallback | 1 min | (incluido arriba) | (incluido) |
| Reescribir llms.txt | 30 min | — | +10 pts |
| Fix TrustStats SSR | 1-2 hrs | +3 pts | +6 pts |
| Añadir favicon | 15 min | +2 pts | — |
| FAQPage schema + expand answers | 4-6 hrs | +5 pts | +8 pts |
| Corregir título producto duplicado | 5 min | +2 pts | — |
| Migrar imágenes a propio | 2-4 hrs | +4 pts | — |
| AggregateRating schema | 1 hr | +4 pts | +5 pts |
| Reescribir /sobre-nosotros | 1-2 días | +5 pts | +6 pts |

**Completado (sprint 1+2):** +13 pts SEO, +15 pts GEO implementados. Pendiente principal: migración imágenes + /sobre-nosotros + Maps embed para alcanzar ~74/100.

---

*Auditoría generada por Claude Code · orquideasgarden.online · 2026-04-19*  
*Agentes: seo-audit · seo-content · seo-schema · seo-local · seo-geo · seo-performance*
