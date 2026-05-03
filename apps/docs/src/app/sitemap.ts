import { existsSync, readdirSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { MetadataRoute } from "next"

const BASE_URL = "https://aether-ui.dev"

/**
 * Returns the last-modified date of a file, falling back to now.
 * Used to give Google accurate freshness signals per page.
 */
function mtime(filePath: string): Date {
  try {
    return statSync(filePath).mtime
  } catch {
    return new Date()
  }
}

/**
 * Scans a docs sub-path and returns the slugs of every direct subdirectory
 * that contains a page.tsx. Directories with only preview.tsx or other files
 * are excluded — they don't produce real navigable routes.
 */
function pageRoutes(
  docsSubPath: string,
  prefix: string,
  priority = 0.8,
): MetadataRoute.Sitemap {
  const dir = resolve(process.cwd(), "src/app/(docs)", docsSubPath)
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      const pagePath = resolve(dir, entry.name, "page.tsx")
      return existsSync(pagePath)
    })
    .map((entry) => {
      const pagePath = resolve(dir, entry.name, "page.tsx")
      return {
        url: `${BASE_URL}/${prefix}/${entry.name}`,
        lastModified: mtime(pagePath),
        changeFrequency: "monthly" as const,
        priority,
      }
    })
    .sort((a, b) => a.url.localeCompare(b.url))
}

/**
 * Scans a flat docs sub-path for a page.tsx and returns a single entry.
 * Used for top-level section pages like /components, /patterns, /blocks.
 */
function staticEntry(
  docsSubPath: string,
  priority = 0.8,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
): MetadataRoute.Sitemap[number] {
  const pagePath = resolve(process.cwd(), "src/app/(docs)", docsSubPath, "page.tsx")
  return {
    url: `${BASE_URL}/${docsSubPath}`,
    lastModified: mtime(pagePath),
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const rootPage = resolve(process.cwd(), "src/app/page.tsx")

  return [
    // ── Home ─────────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/`,
      lastModified: mtime(rootPage),
      changeFrequency: "monthly",
      priority: 1.0,
    },

    // ── Primary docs pages ────────────────────────────────────────────────
    staticEntry("introduction", 0.9, "monthly"),
    staticEntry("installation", 0.9, "monthly"),
    staticEntry("cli", 0.85, "monthly"),
    staticEntry("llms", 0.8, "monthly"),
    staticEntry("tokens", 0.75, "monthly"),
    staticEntry("pricing", 0.65, "monthly"),
    staticEntry("icons", 0.65, "monthly"),
    staticEntry("fonts", 0.6, "monthly"),
    staticEntry("charts", 0.65, "monthly"),

    // ── Section index pages ───────────────────────────────────────────────
    staticEntry("components", 0.9, "weekly"),
    staticEntry("patterns", 0.9, "weekly"),
    staticEntry("blocks", 0.9, "weekly"),

    // ── Forms (nested, discover dynamically) ─────────────────────────────
    ...pageRoutes("forms", "forms", 0.6),

    // ── Component pages (auto-discovered, page.tsx required) ──────────────
    ...pageRoutes("components", "components", 0.8),

    // ── Pattern pages (auto-discovered, page.tsx required) ────────────────
    ...pageRoutes("patterns", "patterns", 0.8),

    // ── Block pages (auto-discovered, page.tsx required) ──────────────────
    ...pageRoutes("blocks", "blocks", 0.8),
  ]
}
