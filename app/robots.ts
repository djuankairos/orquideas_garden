import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
