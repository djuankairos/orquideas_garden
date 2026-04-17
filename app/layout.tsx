import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Jost } from "next/font/google";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Floral Boutique en Bogotá`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${SITE_NAME} | Floral Boutique en Bogotá`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
    images: [{ url: absoluteUrl("/brand/logo-garden-morado.png"), width: 991, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Floral Boutique en Bogotá`,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/brand/logo-garden-morado.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: SITE_NAME,
    slogan: "Floral Boutique · Bogotá",
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo-garden-morado.png"),
    image: [
      absoluteUrl("/brand/logo-garden-morado.png"),
      absoluteUrl("/hero/accordion/mg-0567.jpg"),
      absoluteUrl("/hero/accordion/mg-0577.jpg"),
    ],
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Bogotá",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 97#70c-95",
      addressLocality: "Bogotá",
      addressRegion: "Bogotá",
      addressCountry: "CO",
      postalCode: "110911",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_PHONE,
        contactType: "sales",
        areaServed: "CO",
        availableLanguage: "Spanish",
      },
    ],
    sameAs: [
      "https://www.instagram.com/orquideasgarden/",
      "https://www.tiktok.com/@orquideasgarden",
      "https://www.facebook.com/orquideasgardenbog",
    ],
  };

  return (
    <html lang="es-CO" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
