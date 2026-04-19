import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Orquideas Garden",
    short_name: "OrqGarden",
    description:
      "Floral Boutique en Bogotá: orquídeas premium para regalo, condolencias y ocasiones especiales.",
    start_url: "/",
    display: "standalone",
    theme_color: "#6b3fa0",
    background_color: "#ffffff",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
