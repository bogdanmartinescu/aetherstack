import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import { join, relative, resolve, sep } from "node:path"

const app = resolve("apps/docs/src/app")
const output = resolve("apps/docs/out")

async function walk(root) {
  const found = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const target = join(root, entry.name)
    if (entry.isDirectory()) found.push(...(await walk(target)))
    else if (entry.isFile()) found.push(target)
  }
  return found
}

const source = await walk(app)
const pages = source.filter((file) => file.endsWith(`${sep}page.tsx`))
assert.ok(pages.length > 100, "Unexpectedly small documentation route inventory")

const routes = pages.map((file) => {
  const segments = relative(app, file).split(sep).slice(0, -1)
  assert.ok(
    segments.every((segment) => !segment.startsWith("[") && !segment.startsWith("@")),
    `Dynamic routes must have an explicit static export plan: ${file}`,
  )
  const cleaned = segments.filter((segment) => !/^\(.*\)$/.test(segment))
  return cleaned.length === 0 ? "index.html" : join(...cleaned, "index.html")
})

assert.equal(new Set(routes).size, routes.length, "Duplicate documentation route outputs")

for (const route of routes) {
  const file = join(output, route)
  assert.ok((await stat(file)).isFile(), `Missing static export for ${route}`)
}

for (const file of ["404.html", "llms.txt", "robots.txt", "sitemap.xml", "_headers", "_redirects"]) {
  assert.ok((await stat(join(output, file))).isFile(), `Missing docs output ${file}`)
}

const [robotsTxt, sitemapXml] = await Promise.all([
  readFile(join(output, "robots.txt"), "utf8"),
  readFile(join(output, "sitemap.xml"), "utf8"),
])
assert.ok(robotsTxt.includes("Sitemap: https://aether-ui.dev/sitemap.xml"), "Wrong robots sitemap")
assert.ok(sitemapXml.includes("<urlset"), "Sitemap is not valid-looking XML")
assert.ok(sitemapXml.includes("https://aether-ui.dev/"), "Sitemap must link to the canonical host")

const redirects = await readFile(join(output, "_redirects"), "utf8")
assert.ok(redirects.includes("/components/code-block-ai"), "Missing legacy redirect")

const nextAssets = await walk(join(output, "_next", "static"))
assert.ok(nextAssets.some((file) => file.endsWith(".js")), "Missing compiled JavaScript assets")
assert.ok(nextAssets.some((file) => file.endsWith(".css")), "Missing compiled CSS assets")

console.log(`Documentation static export verified: ${routes.length} routes, ${nextAssets.length} static assets`)
