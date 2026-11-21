import type { MetadataRoute } from "next"

// Static export has no server runtime for metadata route handlers.
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://registry.aether-ui.dev/" }]
}
