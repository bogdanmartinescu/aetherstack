import assert from "node:assert/strict"
import { setTimeout as sleep } from "node:timers/promises"

const input = process.argv[2] ?? process.env.REGISTRY_SMOKE_BASE_URL
assert.ok(input, "Pass the registry preview URL or set REGISTRY_SMOKE_BASE_URL")

const base = new URL(input)
const host = base.hostname.toLowerCase()
assert.equal(base.protocol, "https:", "Smoke tests require HTTPS")
assert.ok(
  host === "registry.aether-ui.dev" || host.endsWith(".workers.dev"),
  "Only the registry custom domain or a workers.dev preview is permitted",
)
assert.equal(base.username, "", "Do not embed credentials in the URL")
assert.equal(base.password, "", "Do not embed credentials in the URL")
assert.equal(base.pathname, "/", "Use the origin URL without a path")
assert.equal(base.search, "", "Remove query parameters from the origin URL")
assert.equal(base.hash, "", "Remove URL fragments from the origin URL")

async function check(path, expectedStatus = 200) {
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(new URL(path, base), {
        signal: AbortSignal.timeout(15_000),
        redirect: "error",
      })
      if (response.status === expectedStatus) return response
      lastError = new Error(`${path}: expected ${expectedStatus}, received ${response.status}`)
    } catch (error) {
      lastError = error
    }
    if (attempt < 3) await sleep(2_000)
  }
  throw lastError
}

const manifestResponse = await check("/r/registry.json")
assert.match(
  manifestResponse.headers.get("content-type") ?? "",
  /application\/json/i,
  "Registry manifest must be JSON",
)
assert.equal(manifestResponse.headers.get("access-control-allow-origin"), "*")
assert.match(manifestResponse.headers.get("cache-control") ?? "", /max-age=60/)
const manifest = await manifestResponse.json()
assert.equal(manifest.name, "aether-ui")
assert.ok(Array.isArray(manifest.items) && manifest.items.length > 0)

const buttonResponse = await check("/r/button.json")
assert.equal(buttonResponse.headers.get("access-control-allow-origin"), "*")
assert.equal((await buttonResponse.json()).name, "button")
const llmsResponse = await check("/llms.txt")
assert.match(await llmsResponse.text(), /Aether UI/)
await check("/")
await check("/r/aether-ui-nonexistent-component.json", 404)

console.log(`Registry smoke passed: ${base.origin}, ${manifest.items.length} items`)
