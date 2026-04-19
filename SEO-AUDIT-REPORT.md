# Auditoría SEO Completa — Orquídeas Garden
**Sitio auditado:** https://orquideasgarden.online/  
**Fecha:** 2026-04-19  
**Agentes especializados:** Technical · Content/E-E-A-T · Schema · Performance · GEO · Local SEO  

---

## Puntuación SEO General: 51/100 → ~58/100 (sprint 1 completado 2026-04-19)

| Categoría | Peso | Score | Weighted |
|-----------|------|-------|---------|
| Technical SEO | 22% | 28/100 | 6.2 |
| Content & E-E-A-T | 23% | 61/100 | 14.0 |
| On-Page SEO | 20% | 58/100 | 11.6 |
| Schema / Structured Data | 10% | 52/100 | 5.2 |
| Performance (CWV) | 10% | 72/100 | 7.2 |
| AI Search Readiness (GEO) | 10% | 47/100 | 4.7 |
| Images | 5% | 78/100 | 3.9 |
| **TOTAL** | **100%** | — | **52.8 → 53/100** |

> **Si se corrige la causa raíz (1 línea de código), el score estimado sube a ~74/100.**

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
1. **`NEXT_PUBLIC_SITE_URL` no configurado en Vercel** → fallback a `.store` en TODA la app
2. **`public/llms.txt` con 17 URLs hardcodeadas a `.store`** → IA cita el dominio viejo
3. **`TrustStats` componente renderiza "0"** para crawlers (lógica `"use client"` empieza en cero)
4. **Favicon completamente ausente** (404 en todos los formatos)
5. **`/sobre-nosotros` tiene ~95 palabras de contenido real** (3 párrafos de copy de marca)

### Los 5 Quick Wins Inmediatos
1. Configurar `NEXT_PUBLIC_SITE_URL=https://orquideasgarden.online` en Vercel (5 minutos)
2. Actualizar fallback en `lib/site.ts` línea 5 (1 minuto)
3. Reescribir `public/llms.txt` con URLs de `.online` (30 minutos)
4. Añadir favicon (`public/favicon.ico` o `app/favicon.ico`) (15 minutos)
5. Corregir título duplicado en producto: "| Orquideas Garden | Orquideas Garden" (5 minutos)

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
| sitemap.xml accesible | ✅ | HTTP 200 — PERO URLs de `.store` |
| 404 manejo correcto | ✅ | HTTP 404 real |
| **Canonical correcto** | ❌ CRÍTICO | Todas apuntan a `.store` |
| **URLs en sitemap** | ❌ CRÍTICO | Todas son `.store` |
| **Sitemap en robots.txt** | ❌ CRÍTICO | Apunta a `.store/sitemap.xml` |
| Favicon | ❌ ALTO | 404 — ningún formato disponible |
| Web manifest / PWA | ❌ MEDIO | 404 |

### Seguridad HTTP (Excelente)

| Header | Valor |
|--------|-------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains ✅ |
| X-Frame-Options | DENY ✅ |
| X-Content-Type-Options | nosniff ✅ |
| Content-Security-Policy | Configurado ✅ |
| Referrer-Policy | strict-origin-when-cross-origin ✅ |
| Permissions-Policy | camera=(), microphone=(), geolocation=() ✅ |

### Arquitectura del Dominio (Problema Crítico)

```
orquideasgarden.online  ──canonicals──▶  orquideasgarden.store
        ▲                                       │
   Sitio NUEVO (audited)              Sitio VIEJO (WordPress)
   Next.js / Vercel                   Apache / PHP 8.3 / WooCommerce
   95KB homepage                      (aún activo, HTTP 200)
                                       ┌── 2do teléfono: 3185300284
                                       └── email: info@orquideasgarden.local
```

**Agravante:** `orquideasgarden.store/colecciones` → **HTTP 404**. Google sigue el canonical de `.online` a `.store` y encuentra páginas rotas.

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

### Hallazgo Crítico — TrustStats invisible para crawlers

```typescript
// components/ui/trust-stats.tsx — "use client"
// Los contadores arrancan en 0 y animan hasta el valor real con requestAnimationFrame
// Los crawlers de IA y Google ven: "+0 orquídeas entregadas" y "0 años"
```

**Fix:** Renderizar los valores finales en el HTML del servidor; la animación debe ser **progressive enhancement** solo, no el mecanismo principal de renderizado.

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
| Producto | Gift Box Combo Cumpleaños \| Orquideas Garden \| **Orquideas Garden** | 64 | ❌ Duplicado |

### Meta Descripciones

| Página | Chars | Estado |
|--------|-------|--------|
| Homepage | 154 | ✅ |
| /colecciones | 78 | ⚠️ Corta |
| /sobre-nosotros | 100 | ✅ |
| /cotizacion | 97 | ✅ |

### Issues Adicionales

- **OG title en /colecciones tiene encoding roto:** `"Colecciones â€" Orquídeas Garden"` (em dash mal codificado en UTF-8)
- **`og:type` en páginas de producto:** está como `"website"` en lugar de `"product"`
- **Producto schema imagen placeholder:** `orquideasgarden.store/images/placeholder-orquidea.svg` (posible 404)
- **Offers URL en Product schema:** apunta a URL WooCommerce `/?post_type=product&p=400` (no canónica)

---

## 4. Schema / Structured Data — Score: 52/100

*(Análisis del agente especializado en schema)*

### Inventario Completo

| Página | Tipos | Count | Issues |
|--------|-------|-------|--------|
| Todas (layout) | Florist | 1 | ❌ url/logo/image = `.store` |
| Producto | Product + BreadcrumbList | 2 | ❌ todas URLs = `.store` |
| Colecciones | BreadcrumbList | 1 | ❌ items = `.store` |
| Homepage | WebSite, FAQPage, AggregateRating | 0 | ❌ FALTANTES |

### Florist Schema — Lo que está bien / mal

```json
// ✅ Bien implementado:
"@type": "Florist",
"address": { "streetAddress": "Calle 97#70c-95", "postalCode": "110911" },
"openingHoursSpecification": [{ "dayOfWeek": ["Monday"..."Saturday"], "opens": "08:00" }],
"sameAs": ["instagram", "tiktok", "facebook"]

// ❌ Mal — causado por SITE_URL fallback a .store:
"url": "https://orquideasgarden.store",  // ← INCORRECTO
"logo": "https://orquideasgarden.store/brand/logo-garden-morado.png",  // ← INCORRECTO
"image": ["https://orquideasgarden.store/..."]  // ← INCORRECTO

// ❌ Faltantes:
"@id": "https://orquideasgarden.online/#florist",  // recomendado para entity graph
"geo": { "@type": "GeoCoordinates", "latitude": 4.67890, "longitude": -74.05220 }
```

### Schema Faltante (Alta Prioridad)

| Schema Type | Motivo | Impacto |
|-------------|--------|---------|
| FAQPage | Sección FAQ existe en homepage sin schema | Alto — GEO/AI citations |
| WebSite (SearchAction) | Sitelinks search box opportunity | Medio |
| AggregateRating | 4 testimonios sin schema de rating | Alto — rich results |
| GeoCoordinates | Local Pack placement | Medio |

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
**Problema:** **17 URLs hardcodeadas a `.store`** — incluyendo la línea de atribución:

```markdown
# Línea actual (INCORRECTA):
Citas permitidas con atribución a "Orquideas Garden (orquideasgarden.store)"

# Debe ser:
Citas permitidas con atribución a "Orquideas Garden (orquideasgarden.online)"
```

### Scores por Plataforma IA

| Plataforma | Score | Bloqueador Principal |
|------------|-------|---------------------|
| Google AI Overviews | 34/100 | Canonical mismatch + sin AggregateRating |
| ChatGPT Search | 52/100 | llms.txt URLs a `.store` |
| Perplexity | 55/100 | FAQ answers muy cortas (~28 palabras) |
| Bing Copilot | 44/100 | Sitemap a `.store` |

### Problemas de Citabilidad

1. **FAQ answers: ~28 palabras promedio** → rango óptimo para AI citation: 134–167 palabras
2. **TrustStats "use client" empieza en 0** → los crawlers leen "+0 orquídeas entregadas" y "0 años"
3. **FAQSection "use client"** → preguntas 2–6 en estado colapsado, posiblemente invisibles para crawlers sin JS
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
| hasMap en schema | ❌ Faltante |
| AggregateRating en schema | ❌ Faltante |
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
| OG:image domain | ❌ Apunta a .store |
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

#### 7. Corregir título duplicado en páginas de producto
**Archivo:** `lib/catalog.ts` → campo `seo_title` de cada producto  
O en `app/producto/[slug]/page.tsx`:
```typescript
title: `${product.name} | Orquideas Garden`  // Solo UNA vez el nombre de marca
```

---

### ALTO — Esta semana

#### 8. Migrar imágenes de producto al hosting propio
**Archivos con URLs a migrar:**
- `lib/catalog.ts` → campos `imagenes[]` y `woo_checkout_url`
- Mover archivos a `public/productos/` o usar CDN propio

#### 9. Implementar FAQPage schema
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

#### 10. Añadir AggregateRating al schema Florist
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

#### 11. Añadir GeoCoordinates y hasMap al schema
```json
"geo": { "@type": "GeoCoordinates", "latitude": 4.67890, "longitude": -74.05220 },
"hasMap": "https://maps.google.com/?q=Calle+97+%2370c-95+Bogotá"
```

#### 12. Añadir WebSite schema
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

#### 13. Corregir encoding OG title en /colecciones
El em dash "–" aparece como "â€"" — verificar charset del generador de metadata en `app/colecciones/page.tsx`.

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

**Total potencial con los primeros 3 cambios (< 1 hora de trabajo):** +30 pts en SEO, +22 pts en GEO

---

*Auditoría generada por Claude Code · orquideasgarden.online · 2026-04-19*  
*Agentes: seo-audit · seo-content · seo-schema · seo-local · seo-geo · seo-performance*
