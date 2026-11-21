import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import { join, resolve } from "node:path"

const output = resolve("apps/registry-public/out")
const registryDir = join(output, "r")

async function readText(relativePath) {
  return readFile(join(output, relativePath), "utf8")
}

async function readJson(relativePath) {
  return JSON.parse(await readText(relativePath))
}

const manifest = await readJson("r/registry.json")
assert.equal(manifest.name, "aether-ui", "Unexpected public registry name")
assert.ok(Array.isArray(manifest.items), "Registry manifest must contain items")
assert.ok(manifest.items.length > 0, "Registry manifest must not be empty")

const names = manifest.items.map((item) => item.name)
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
assert.ok(names.every((name) => namePattern.test(name)), "Invalid registry item name")
assert.equal(new Set(names).size, names.length, "Duplicate registry item names")
assert.ok(names.includes("button"), "Registry must publish the button")

const expectedFiles = ["registry.json", ...names.map((name) => `${name}.json`)].sort()
const actualFiles = (await readdir(registryDir)).filter((file) => file.endsWith(".json")).sort()
assert.deepEqual(actualFiles, expectedFiles, "Registry output and manifest differ")

for (const name of names) {
  const item = await readJson(`r/${name}.json`)
  assert.equal(item.name, name, `Wrong item name for ${name}`)
  assert.ok(Array.isArray(item.files) && item.files.length > 0, `Missing files for ${name}`)
}

const [llms, assetHeaders, index] = await Promise.all([
  readText("llms.txt"),
  readText("_headers"),
  stat(join(output, "index.html")),
])
assert.ok(llms.includes("Aether UI"), "Missing AI discovery content")
assert.ok(assetHeaders.includes("Access-Control-Allow-Origin: *"), "Missing public CORS")
assert.ok(assetHeaders.includes("Cache-Control:"), "Missing cache policy")
assert.ok(index.isFile(), "Registry landing page was not exported")

console.log(`Registry export verified: ${names.length} items, ${actualFiles.length} JSON files`)
