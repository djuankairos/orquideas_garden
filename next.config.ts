import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const cspValue = isProd
  ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com"
  : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws: wss: http: https:;";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orquideasgarden.store",
      },
      {
        protocol: "https",
        hostname: "www.orquideasgarden.store",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspValue,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.orquideasgarden.store" }],
        destination: "https://orquideasgarden.store/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.orquideasgarden.online" }],
        destination: "https://orquideasgarden.online/:path*",
        permanent: true,
      },
      {
        source: "/tienda",
        destination: "/colecciones",
        permanent: true,
      },
      {
        source: "/aviso-de-privacidad",
        destination: "/politica-de-privacidad",
        permanent: true,
      },
      {
        source: "/politicas-de-envios-y-entregas",
        destination: "/terminos-y-condiciones",
        permanent: true,
      },
      {
        source: "/orquideas-garden-2",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
