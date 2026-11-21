import type { MetadataRoute } from "next"

// Static export has no server runtime for metadata route handlers.
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://registry.aether-ui.dev/sitemap.xml",
  }
}
