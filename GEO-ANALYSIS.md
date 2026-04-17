# GEO Analysis Report — Orquideas Garden

**Domain:** orquideasgarden.store  
**Date:** 2026-04-17  
**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS  
**Analyst:** GEO Specialist (Claude Code)  
**Language:** es-CO

---

## GEO Readiness Score: 54 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| Citability | 25% | 38 / 100 | 9.5 |
| Structural Readability | 20% | 58 / 100 | 11.6 |
| Multi-Modal Content | 15% | 52 / 100 | 7.8 |
| Authority & Brand Signals | 20% | 55 / 100 | 11.0 |
| Technical Accessibility | 20% | 70 / 100 | 14.0 |
| **TOTAL** | | | **53.9** |


---

## Platform-Specific Scores

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 42/100 | Schema present but content blocks too short; no FAQPage schema |
| ChatGPT | 38/100 | ClaudeBot/GPTBot allowed; llms.txt missing RSL; no long-form content |
| Perplexity | 50/100 | PerplexityBot allowed; sitemap present; structured data partial |
| Bing Copilot | 45/100 | OAI-SearchBot not explicitly listed; SSR is strong signal |

---

## 1. AI Crawler Access Status

**File analyzed:** app/robots.ts

| Crawler | Status | Rule Source |
|---------|--------|-------------|
| GPTBot | ALLOWED | Explicit userAgent rule |
| OAI-SearchBot | ALLOWED (*) | Covered by wildcard allow / |
| ClaudeBot | ALLOWED | Explicit userAgent rule |
| PerplexityBot | ALLOWED | Explicit userAgent rule |
| CCBot | ALLOWED (*) | Covered by wildcard — not blocked |
| anthropic-ai | ALLOWED (*) | Covered by wildcard — not blocked |
| cohere-ai | ALLOWED (*) | Covered by wildcard — not blocked |

(*) Training crawlers (CCBot, anthropic-ai, cohere-ai) are not explicitly blocked. If the site owner does not want content used for model training — only for search citation — these should be explicitly disallowed. This is a policy choice, not a technical error.

**Issues found:**
- OAI-SearchBot is not listed in the explicit AI rules block. It currently falls under the wildcard rule and is effectively allowed, but best practice is to list it explicitly alongside GPTBot, ClaudeBot, and PerplexityBot.
- No crawl-delay directive set for AI crawlers.

---

## 2. llms.txt Status

**File analyzed:** public/llms.txt

**Status: PRESENT — Minimal / Incomplete**

**What is present:**
- site, name, description, language, contact fields
- preferred-pages block with 12 correct canonical URLs

**What is missing (high-impact gaps):**

| Missing Field | Why It Matters for AI Citation |
|---------------|--------------------------------|
| license | RSL 1.0 or CC license signals to LLMs whether content is citable |
| instructions | No guidance to AI crawlers on how to use or cite the content |
| topics | Keyword context for AI relevance matching (orquideas, regalo, Bogota) |
| entity-type | Missing LocalBusiness / Florist entity classification |
| geo | No geographic context (Bogota, Colombia, coordinates) |
| social | Instagram/TikTok/Facebook handles not declared |
| avoid | No sections instructed to avoid (checkout redirect pages, etc.) |
| descriptions | Each preferred-page has no summary or description attached |

The current llms.txt meets the bare minimum of the format but provides almost no semantic context for an AI to understand what each page is about. This significantly reduces citation likelihood.

---

## 3. Citability Score: 38 / 100

Citability measures whether AI systems can extract self-contained, attributable passages of 134-167 words that directly answer user questions.

### Passage Length Analysis

All text blocks across the site are dramatically under the optimal 134-167 word citation window:

| Page / Section | Approx. Word Count | Citable? |
|----------------|--------------------|----------|
| sobre-nosotros main copy | ~65 words | No |
| colecciones section intro | ~30 words | No |
| contacto Atencion Comercial | ~35 words | No |
| politica-de-privacidad body | ~55 words | No |
| terminos-y-condiciones body | ~45 words | No |
| Product descripcion_corta each | 10-18 words | No |
| Collection descripcion each | 12-20 words | No |
| Homepage hero subtitle | ~20 words | No |
| FAQ block on product page | ~50 words total | Partial |

No page contains a passage of 134+ words. The longest prose block on the entire site is the Sobre Nosotros section at approximately 65 words. This is the single most critical citability deficit.

### Direct-Answer Density

- The product pages include a 2-question FAQ block, a positive signal, but answers are each only 1-2 sentences (20-30 words) and do not meet the self-contained answer block standard.
- No page answers high-value user questions: Cuanto cuesta un arreglo de orquideas en Bogota? Hacen envio el mismo dia? Que diferencia hay entre Cromadas y la coleccion de Regalo?

### Specific Statistics and Data Points

- Prices are in lib/catalog.ts (89.000-29.000 COP range) but only displayed on product cards, not in indexable narrative prose. An AI cannot cite a price range statement because it does not exist as plain text on any page.
- No delivery time data stated as a citable fact.
- No founding date, delivery volume, or verifiable brand statistics anywhere on the site.

---

## 4. Structural Readability Score: 58 / 100

### Heading Hierarchy

| Page | H1 | H2 | H3 | Assessment |
|------|----|----|----|------------|
| Homepage | 1* | 2 | 0 | H1 rendered inside HeroSection use client component |
| Colecciones | 1 | 0 | 0 | No sub-sections |
| Coleccion [slug] | 1 | 1 | 0 | Minimal hierarchy |
| Producto [slug] | 1 | 1 | 2 | Best structure on the site |
| Sobre Nosotros | 1 | 0 | 0 | No sub-sections |
| Contacto | 1 | 2 | 0 | Good dual-column structure |
| Cotizacion | 1 | 0 | 0 | No sub-sections |

(*) Homepage H1 text is fractured by inline spans inside a use client component. The text renders correctly in HTML but span fracturing can reduce AI text extraction accuracy.

### Question-Based Headings

Only 2 question-based headings exist across the entire site:
- Como finalizo el pedido? (product page FAQ)
- Hacen entregas nacionales? (product page FAQ)

This is a critical gap. Question-format H2/H3 headings are one of the strongest signals for AI citation selection because they match the conversational query format LLMs receive from users.

### Lists and Tables

- Product benefit lists (ul with bullet markers) present on product pages --- positive signal.
- No comparison tables, pricing tables, or delivery information tables anywhere on the site.
- No structured what-is-included lists beyond the 3-item benefit bullets per product.

### Schema Markup

| Schema Type | Present | Location | Completeness |
|-------------|---------|----------|--------------|
| Florist | Yes | app/layout.tsx | Partial: missing openingHours, priceRange, sameAs |
| Product | Yes | producto/[slug] | Partial: missing price value, seller, brand, reviews |
| FAQPage | No | Nowhere | Missing entirely |
| BreadcrumbList | No | Nowhere | Missing entirely |
| LocalBusiness | Partial | Via Florist type | Covers base but lacks hours and price range |

The Product schema declares priceCurrency: COP and availability: InStock but omits the actual numeric price value, making it ineligible for Google rich result display.

---

## 5. Multi-Modal Content Score: 52 / 100

### Images

- Hero section: 5 images with descriptive alt text including brand name --- positive signal.
- Product images: Using FALLBACK_IMAGE placeholder SVG for all 6 products. No real product photography is indexed. This severely limits visual search and AI-generated product citations.
- Collection cards: Also using placeholder image for all 3 collections.
- Logo: Present with correct alt text in header and footer.
- Next.js Image component used throughout with AVIF/WebP formats configured in next.config.ts --- good for performance.

### Video

- No video content present anywhere on the site.
- No YouTube channel URL detected anywhere in the codebase.
- YouTube mention correlation with AI citations is ~0.737 --- the strongest single external citation signal. The absence of YouTube is the most impactful multi-modal gap on the site.

### Interactive Elements

- CotizacionForm is a use client React component. This form is not server-rendered and its label text, field names, and UI copy are invisible to AI crawlers.
- HeroSection is a use client component with an image carousel. The H1 text and subtitle ARE passed as server-side props and are present in the initial HTML response. However, carousel cycling is client-side only --- only the first image appears in the static server-rendered HTML.
- CheckoutLink is a client component for GA4 event tracking. The underlying href is in the server-rendered HTML so checkout URLs are accessible to crawlers.

---

## 6. Authority & Brand Signals Score: 55 / 100

### Schema Entity Signals

- Florist schema present in app/layout.tsx with name, url, logo, email, address, and contactPoint --- valid baseline for entity recognition.
- Missing sameAs array in the Florist schema. The footer contains Instagram, TikTok, and Facebook links but these are not declared in structured data, so knowledge graph systems cannot connect these profiles to the same entity.

### Social Presence (detected in codebase)

| Platform | Present in Code | URL Found |
|----------|-----------------|-----------|
| Instagram | Yes | https://www.instagram.com/orquideasgarden/ |
| TikTok | Yes | https://www.tiktok.com/@orquideasgarden |
| Facebook | Yes | https://www.facebook.com/orquideasgardenbog |
| YouTube | No | Not detected |
| Reddit | No | Not detected |
| Wikipedia | No | No entity page |
| LinkedIn | No | Not detected |
| WhatsApp | Yes | https://wa.me/573208721695 |

YouTube is the single highest-correlation signal for AI citation (~0.737 correlation). Its absence is the most impactful brand signal gap relative to AI visibility.

### Authorship and Dates

- No author attribution on any page.
- No datePublished or dateModified in page metadata or schema.
- The sitemap uses new Date() (current build timestamp) for lastModified --- provides no historical content signal to crawlers.
- No visible last-updated dates on product or content pages.

### Citations and External References

- No external citations, data sources, or expert references in any content.
- No press mentions, awards, or third-party validations referenced on the site.
- Contact email is Gmail (orquideasgarden16@gmail.com), not a domain email --- minor authority signal reduction.

---

## 7. Technical Accessibility Score: 70 / 100

### Server-Side Rendering (SSR)

- Next.js 15 with app/ router: all page components are Server Components by default. This is the best possible configuration for AI crawler accessibility since all content is in the initial HTML response.
- Exceptions: CotizacionForm and HeroSection use the use client directive. The HeroSection H1 and subtitle text are present in the initial server render via props. The CotizacionForm fields are entirely client-side and invisible to crawlers.
- generateStaticParams() is implemented for both collection and product dynamic routes --- all pages are statically generated at build time, ideal for AI crawlers that do not execute JavaScript.

### Sitemap

- app/sitemap.ts generates a full XML sitemap covering all static routes, all 3 collections, and all 6 products (16 URLs total).
- Sitemap is referenced correctly in robots.ts via absoluteUrl("/sitemap.xml").
- Priority scores: 1.0 homepage, 0.8 static pages, 0.9 collections, 0.85 products --- well-configured.
- Weakness: lastModified is set to new Date() at every build rather than tracking actual content modification dates.

### Canonical URLs

- All pages declare canonical URLs via alternates: { canonical: absoluteUrl(...) }.
- OpenGraph url fields are consistent with canonical declarations across all pages.

### Security Headers

- Content Security Policy, X-Frame-Options, Strict-Transport-Security, and Referrer-Policy are configured in next.config.ts. These do not restrict AI crawler access (CSP affects browser rendering, not server-side HTTP crawlers).

### Missing Technical Elements

- OAI-SearchBot not listed explicitly in the AI rules block of app/robots.ts.
- No X-Robots-Tag headers for fine-grained per-route AI crawler control.
- No hreflang tags (single locale site, lower priority).
- llms.txt correctly located at public/llms.txt, serving at orquideasgarden.store/llms.txt.

---

## 8. Brand Mention Analysis

| Signal | Status | AI Citation Impact |
|--------|--------|--------------------|
| YouTube channel | Not found | Critical --- 0.737 correlation |
| Wikipedia entity page | Not found | High gap |
| Reddit presence / mentions | Not found | High gap |
| LinkedIn company page | Not found | Medium gap |
| Instagram (@orquideasgarden) | Present | Low-medium signal |
| TikTok (@orquideasgarden) | Present | Low-medium signal |
| Facebook (orquideasgardenbog) | Present | Low signal |
| Google Business Profile | Unknown | High --- cannot assess from codebase alone |
| WhatsApp Business | Present | Conversion tool, not a citation signal |

The brand has functional social media presence on Instagram, TikTok, and Facebook, but lacks the high-correlation platforms (YouTube, Reddit, Wikipedia) that drive AI citation frequency. Only 11% of domains are cited by both ChatGPT and Google AI Overviews. Cross-platform brand presence --- especially YouTube --- is the primary lever to enter that cohort.

---

## Top 5 Highest-Impact Changes

### 1. Expand Content Passages to 134-167 Words Per Section

**Dimension:** Citability | **Impact:** Very High | **Effort:** Medium
**Score impact estimate:** +12 to +15 points on Citability dimension

Every content page needs at least one self-contained prose block of 134-167 words that directly answers a user question without requiring surrounding context. Priority pages:

- Sobre Nosotros: Expand from ~65 words to ~160 words. Describe what makes Orquideas Garden unique, founding story, specialty in Phalaenopsis orchids, full service area (Bogota city + national shipping), the three collections (Cromadas, Regalo, Condolencias), and the boutique packaging approach.
- Each collection page (Cromadas, Regalo, Condolencias): Add a 150-word editorial section explaining which occasions call for that collection, what the packaging looks like, the price range (89.000-29.000 COP), and how to order.
- Homepage: Add a visible brand statement section below the hero with a 150-word block covering city, specialty, use cases, and differentiators.
- Product pages: Expand each descripcion_corta from ~15 words to 60-80 words. Expand the FAQ section from 2 to 5-6 questions with 40-60 word answers each.

The goal is to create extractable, citable answer blocks that an AI can surface when a user asks where to buy luxury orchids in Bogota or which florist sells condolence orchids in Colombia.

### 2. Upgrade llms.txt with Full Semantic Context

**Dimension:** Technical Accessibility / Authority | **Impact:** High | **Effort:** Low
**Score impact estimate:** +8 to +10 points on Technical Accessibility

Replace the current minimal public/llms.txt with a complete version. Minimum additions required:

- license: https://creativecommons.org/licenses/by/4.0/
- instructions: directive explicitly permitting AI citation for florist, gifting, and condolence queries in Colombia
- topics: orquideas, floreria, regalo, condolencias, Bogota, Colombia, Phalaenopsis, arreglos florales, entrega a domicilio, floreria premium
- entity-type: LocalBusiness/Florist
- geo: Bogota, Colombia (4.7110 N, 74.0721 W)
- social: all active social profile URLs (Instagram, TikTok, Facebook)
- avoid: /api/ and /_next/ directives
- One-sentence description appended to each preferred-page URL entry

### 3. Add Question-Based H2/H3 Headings and FAQPage Schema

**Dimension:** Structural Readability | **Impact:** High | **Effort:** Medium
**Score impact estimate:** +10 to +12 points on Structural Readability

Add FAQPage JSON-LD schema and expand FAQ sections across product and collection pages. Target questions that match real user queries to AI assistants:

Product page additions (4-6 questions total):
- Que incluye el empaque?
- Cuanto tarda la entrega en Bogota?
- Puedo agregar una tarjeta personalizada?
- Hacen envios el mismo dia?
- Cual es la diferencia entre la coleccion Cromadas y la de Regalo?

Collection page additions (2-3 questions per collection):
- Para que ocasiones es ideal esta coleccion?
- Cual es el precio promedio de los arreglos?

Implement FAQPage JSON-LD schema on product pages alongside the existing Product schema. Each Question and Answer pair in the schema must match the visible on-page FAQ content to satisfy Google structured data policies and qualify for FAQ rich results.

### 4. Fix Product Schema Price Value and Add sameAs to Florist Schema

**Dimension:** Authority & Brand Signals | **Impact:** High | **Effort:** Low
**Score impact estimate:** +8 to +10 points on Authority dimension

Two targeted schema fixes:

Fix A --- Product schema price (app/producto/[slug]/page.tsx): The current Offer schema declares priceCurrency: COP and availability: InStock but omits the numeric price field. This makes the schema invalid for Google Rich Results. Extract the numeric price value from product.precio_referencia (e.g. 289000 from 89.000 COP) and add it as the price field in each product Offer object.

Fix B --- Florist sameAs (app/layout.tsx): Add a sameAs array to the root Florist JSON-LD object containing the URLs for Instagram, TikTok, and Facebook. This connects the brand entity across platforms in Google and Bing knowledge graphs, strengthening entity consolidation and citation confidence. Add the YouTube channel URL here once it is created.

### 5. Create YouTube Channel and Embed Videos on Key Pages

**Dimension:** Multi-Modal Content / Authority & Brand Signals | **Impact:** High | **Effort:** High
**Score impact estimate:** +6 to +8 points on Multi-Modal + measurable increase in AI citation frequency over 3-6 months

YouTube mention correlation with AI citation is ~0.737 --- the single strongest external signal identified in GEO research. The absence of YouTube is the largest addressable gap on this site relative to AI discoverability.

Recommended actions in priority order:
1. Create a YouTube channel for Orquideas Garden at @orquideasgarden.
2. Produce 4-6 short videos (60-90 seconds each): product unboxings, packaging process reveal, delivery arrival shots, a buyer guide on how to choose the right arrangement, and a condolencias collection walkthrough.
3. Embed at least one relevant YouTube video on the Homepage (brand overview), each Collection page (collection-specific video), and the Sobre Nosotros page (brand story).
4. Add VideoObject JSON-LD schema to every page with an embedded video.
5. Add the YouTube channel URL to the sameAs array in the Florist schema in app/layout.tsx and to the social list in public/llms.txt.

Even a channel with 5-10 videos and modest view counts creates the cross-platform entity signal that AI systems use to validate brand existence, authority, and citation worthiness.

---

## Additional Recommendations (Lower Priority)

### A. Add datePublished and dateModified to Content Schema
Add visible publication and update dates to product pages and the About page. Include datePublished in each Product JSON-LD schema. Update app/sitemap.ts to track actual content modification dates rather than always using new Date() at build time.

### B. Add BreadcrumbList Schema to All Pages
Implement BreadcrumbList JSON-LD on collection pages (Home > Colecciones > Cromadas) and product pages (Home > Colecciones > Cromadas > Orquidea Cromada Luna Dorada). This helps AI systems understand site hierarchy and improves citation precision by attributing content to the correct sub-page context.

### C. Register a Google Business Profile
A verified Google Business Profile for Orquideas Garden at Calle 97 70c-95 Bogota creates a Knowledge Panel entry. This is the strongest possible Google AI Overview anchor for local business queries such as floreria de orquideas en Bogota, and consolidates the entity across Google Search, Maps, and AI Overviews.

### D. Consider a Domain Email Address
Replace the public-facing Gmail address (orquideasgarden16@gmail.com) with a domain email at @orquideasgarden.store. This is a minor authority signal but contributes to entity consistency across the site, the Florist schema, and llms.txt.

### E. Add a Structured Delivery Information Section
Create a /envios page or add a detailed delivery section within Terminos y Condiciones answering: delivery zones (Bogota neighborhoods plus national coverage), estimated delivery times, same-day availability, pricing by zone, and how to schedule delivery. Delivery queries are a top-5 user question type for floristry businesses and are currently unanswered anywhere on the site --- a direct AI citation opportunity.

### F. Block Training Crawlers If Desired
If the site owner wants content cited by AI search engines but not ingested for model training, add explicit disallow rules in app/robots.ts for CCBot, anthropic-ai, and cohere-ai. Currently these crawlers are implicitly allowed by the wildcard rule.

---

## Summary Table

| Issue | Dimension | Priority | Effort |
|-------|-----------|----------|--------|
| All text passages under 134 words | Citability | Critical | Medium |
| llms.txt missing license, topics, entity | Tech Accessibility | Critical | Low |
| No FAQPage schema | Structural Readability | High | Low |
| Only 2 question-format headings | Structural Readability | High | Medium |
| Product schema missing numeric price | Authority & Brand | High | Low |
| Florist schema missing sameAs | Authority & Brand | High | Low |
| No YouTube presence | Multi-Modal Content | High | High |
| All product images are placeholders | Multi-Modal Content | High | Medium |
| OAI-SearchBot not explicitly listed | Tech Accessibility | Medium | Low |
| CotizacionForm not SSR (use client) | Tech Accessibility | Medium | Medium |
| No Wikipedia entity | Authority & Brand | Medium | High |
| No LinkedIn page | Authority & Brand | Medium | Low |
| No Google Business Profile | Authority & Brand | High | Low |
| Gmail contact vs domain email | Authority & Brand | Low | Low |
| Sitemap lastModified always current date | Tech Accessibility | Low | Low |

---

*Report generated: 2026-04-17 by GEO Specialist analysis of local Next.js codebase.*

*Files analyzed: public/llms.txt, app/robots.ts, app/layout.tsx, app/page.tsx, app/sobre-nosotros/page.tsx, app/colecciones/page.tsx, app/colecciones/[slug]/page.tsx, app/producto/[slug]/page.tsx, app/cotizacion/page.tsx, app/contacto/page.tsx, app/politica-de-privacidad/page.tsx, app/terminos-y-condiciones/page.tsx, app/sitemap.ts, lib/catalog.ts, lib/site.ts, components/site-header.tsx, components/site-footer.tsx, components/product-card.tsx, components/collection-card.tsx, components/cotizacion-form.tsx, components/ui/feature-carousel.tsx, next.config.ts*
