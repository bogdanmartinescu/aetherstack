import assert from "node:assert/strict"
import { setTimeout as delay } from "node:timers/promises"

const input = process.argv[2] ?? process.env.DOCS_SMOKE_BASE_URL
assert.ok(input, "Provide DOCS_SMOKE_BASE_URL or an HTTPS URL argument")

const base = new URL(input)
assert.equal(base.protocol, "https:", "Docs smoke requires HTTPS")
assert.ok(
  base.hostname === "aether-ui.dev" || /^aether-ui-docs\.[a-z0-9-]+\.workers\.dev$/.test(base.hostname),
  "Only the production docs domain or an aether-ui-docs workers.dev preview is allowed",
)
assert.equal(base.pathname, "/", "URL must be an origin")
assert.equal(base.search, "", "URL must not contain query parameters")
assert.equal(base.hash, "", "URL must not contain a fragment")
assert.equal(base.username, "", "Credentials are prohibited in the URL")
assert.equal(base.password, "", "Credentials are prohibited in the URL")

async function check(path, expected = 200) {
  let lastError
  for (let n = 1; n <= 3; n++) {
    try {
      const response = await fetch(new URL(path, base), {
        signal: AbortSignal.timeout(15_000),
        redirect: "manual",
      })
      if (response.status === expected) return response
      lastError = new Error(`${path}: expected ${expected} but received ${response.status}`)
    } catch (error) {
      lastError = error
    }
    if (n < 3) await delay(2_000)
  }
  throw lastError
}

const routes = [
  "/",
  "/introduction/",
  "/installation/",
  "/components/",
  "/components/button/",
  "/patterns/",
  "/blocks/",
  "/tokens/",
  "/llms/",
]
for (const route of routes) {
  const response = await check(route)
  assert.match(response.headers.get("content-type") ?? "", /text\/html/i, `Not HTML: ${route}`)
}

const root = await (await check("/")).text()
assert.match(root, /Aether UI/i)
const script = root.match(/src="(\/_next\/static\/[^"]+\.js(?:\?[^"]*)?)"/)
assert.ok(script, "Homepage must reference a bundled Next.js script")
const scriptResponse = await check(script[1])
assert.match(scriptResponse.headers.get("content-type") ?? "", /javascript/i)
assert.match(await (await check("/llms.txt")).text(), /Aether UI/i)
const robotsTxt = await (await check("/robots.txt")).text()
assert.match(robotsTxt, /Sitemap: https:\/\/aether-ui\.dev\/sitemap\.xml/)
const sitemapXml = await (await check("/sitemap.xml")).text()
assert.match(sitemapXml, /<urlset/)
assert.match(sitemapXml, /https:\/\/aether-ui\.dev\//)

const oldSlug = await check("/components/code-block-ai", 301)
assert.match(oldSlug.headers.get("location") ?? "", /\/components\/code-block\/?$/)
await check("/this-documentation-page-does-not-exist/", 404)

console.log(`Docs preview smoke passed at ${base.origin}: ${routes.length} HTML routes plus JS, AI discovery, redirect and 404`)
