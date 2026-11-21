import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// Emit the sitemap at build time for Cloudflare Workers Static Assets.
export const dynamic = "force-static"

/** Routes that must stay out of the sitemap (they are also marked noindex). */
const EXCLUDED = new Set(["/pricing/"])

const DOCS_ROOT = resolve(process.cwd(), "src/app/(docs)")

/** Collects every directory below `dir` that contains a page.tsx, as a route path. */
function discoverRoutes(dir: string, prefix: string): string[] {
  const routes: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const route = `${prefix}${entry.name}/`
    if (existsSync(resolve(dir, entry.name, "page.tsx"))) routes.push(route)
    routes.push(...discoverRoutes(resolve(dir, entry.name), route))
  }
  return routes
}

/**
 * Canonical URLs always carry a trailing slash (`trailingSlash: true`), so crawlers are
 * never sent through a redirect. `lastModified` is deliberately omitted: file timestamps
 * in a CI checkout all equal the checkout time and would be a misleading freshness signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = discoverRoutes(DOCS_ROOT, "/").filter((route) => !EXCLUDED.has(route))
  routes.sort((a, b) => a.localeCompare(b))
  return ["/", ...routes].map((route) => ({ url: `${SITE_URL}${route}` }))
}
