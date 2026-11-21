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

// Technical SEO: every exported page needs unique, canonical, share-ready metadata.
const SITE = "https://aether-ui.dev"
const ENTITIES = { "&amp;": "&", "&quot;": '"', "&#x27;": "'", "&lt;": "<" }
const decode = (value) => value.replace(/&(?:amp|quot|#x27|lt);/g, (entity) => ENTITIES[entity])
function metaContent(html, attribute, name) {
  const tag = html.match(new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*>`))?.[0]
  const content = tag?.match(/content="([^"]*)"/)?.[1]
  return content === undefined ? undefined : decode(content)
}
const seenTitles = new Map()
const seenDescriptions = new Map()
for (const route of routes) {
  const html = await readFile(join(output, route), "utf8")
  const where = `/${route.replace(/index\.html$/, "")}`
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  assert.ok(title, `Missing <title> on ${where}`)
  assert.ok(title.length <= 70, `Title too long (${title.length}) on ${where}`)
  assert.ok(!seenTitles.has(title), `Duplicate title on ${where} and ${seenTitles.get(title)}`)
  seenTitles.set(title, where)
  const description = metaContent(html, "name", "description")
  assert.ok(description, `Missing meta description on ${where}`)
  assert.ok(
    description.length >= 50 && description.length <= 175,
    `Meta description length ${description.length} out of range on ${where}`,
  )
  assert.ok(
    !seenDescriptions.has(description),
    `Duplicate description on ${where} and ${seenDescriptions.get(description)}`,
  )
  seenDescriptions.set(description, where)
  const canonicalTag = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? ""
  const canonical = canonicalTag.match(/href="([^"]*)"/)?.[1]
  assert.equal(canonical, `${SITE}${where}`, `Wrong canonical on ${where}`)
  assert.equal(
    metaContent(html, "property", "og:image"),
    `${SITE}/og.png`,
    `Missing og:image on ${where}`,
  )
  assert.ok(metaContent(html, "property", "og:title"), `Missing og:title on ${where}`)
  assert.equal(
    metaContent(html, "name", "twitter:card"),
    "summary_large_image",
    `Missing twitter:card on ${where}`,
  )
}
assert.ok((await stat(join(output, "og.png"))).isFile(), "Missing social preview image og.png")

const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.ok(sitemapUrls.length > 100, "Sitemap lists unexpectedly few URLs")
for (const url of sitemapUrls) {
  assert.ok(
    url.startsWith(SITE) && url.endsWith("/"),
    `Sitemap URL must be canonical with a trailing slash: ${url}`,
  )
}
assert.ok(
  !sitemapUrls.includes(`${SITE}/pricing/`),
  "Noindex pricing page must not be in the sitemap",
)

const redirects = await readFile(join(output, "_redirects"), "utf8")
assert.ok(redirects.includes("/components/code-block-ai"), "Missing legacy redirect")

const nextAssets = await walk(join(output, "_next", "static"))
assert.ok(
  nextAssets.some((file) => file.endsWith(".js")),
  "Missing compiled JavaScript assets",
)
assert.ok(
  nextAssets.some((file) => file.endsWith(".css")),
  "Missing compiled CSS assets",
)

console.log(
  `Documentation static export verified: ${routes.length} routes, ${nextAssets.length} static assets`,
)
