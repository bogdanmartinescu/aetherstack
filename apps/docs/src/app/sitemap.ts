import { readdirSync } from "node:fs"
import { resolve } from "node:path"
import type { MetadataRoute } from "next"

const BASE_URL = "https://aether-ui.dev"

/**
 * Read directory slugs for a given docs sub-path.
 * Each entry that contains a page.tsx is a valid route.
 */
function slugs(docsSubPath: string): string[] {
  const dir = resolve(process.cwd(), "src/app/(docs)", docsSubPath)
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/introduction`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/installation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cli`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/components`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/patterns`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blocks`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tokens`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/icons`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/fonts`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/llms`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/charts`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/forms/react-hook-form`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  const componentRoutes: MetadataRoute.Sitemap = slugs("components").map((slug) => ({
    url: `${BASE_URL}/components/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const patternRoutes: MetadataRoute.Sitemap = slugs("patterns").map((slug) => ({
    url: `${BASE_URL}/patterns/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blockRoutes: MetadataRoute.Sitemap = slugs("blocks").map((slug) => ({
    url: `${BASE_URL}/blocks/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...componentRoutes, ...patternRoutes, ...blockRoutes]
}
