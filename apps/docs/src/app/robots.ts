import type { MetadataRoute } from "next"

// Static export has no server runtime for metadata route handlers.
export const dynamic = "force-static"

const BASE_URL = "https://aether-ui.dev"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
