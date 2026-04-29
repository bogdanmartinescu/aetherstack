/**
 * Registry loader for the MCP server.
 *
 * Resolution order (first that succeeds wins):
 *  1. AETHER_REGISTRY_URL env var (remote JSON)
 *  2. AETHER_REGISTRY_FILE env var (local JSON path)
 *  3. Bundled registry.json baked in at build time
 */
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { registrySchema } from "@aetherstack/registry-schema"
import type { Registry } from "@aetherstack/registry-schema"

let _cached: Registry | null = null

export async function loadRegistry(): Promise<Registry> {
  if (_cached) return _cached

  const registryUrl = process.env["AETHER_REGISTRY_URL"]
  const registryFile = process.env["AETHER_REGISTRY_FILE"]

  let raw: unknown

  if (registryUrl) {
    const res = await fetch(registryUrl)
    if (!res.ok) {
      throw new Error(`Failed to fetch registry from ${registryUrl}: ${res.status} ${res.statusText}`)
    }
    raw = await res.json()
  } else if (registryFile) {
    raw = JSON.parse(readFileSync(resolve(registryFile), "utf-8"))
  } else {
    // Fall back to bundled registry baked in at build time.
    // __dirname points to dist/ when compiled.
    const bundledPath = resolve(__dirname, "registry.json")
    try {
      raw = JSON.parse(readFileSync(bundledPath, "utf-8"))
    } catch {
      throw new Error(
        "No registry found. Set AETHER_REGISTRY_URL or AETHER_REGISTRY_FILE, or rebuild the package to bundle registry.json.",
      )
    }
  }

  const parsed = registrySchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(`Invalid registry format: ${parsed.error.message}`)
  }

  _cached = parsed.data
  return _cached
}

/** Clear the cache — useful in tests. */
export function clearRegistryCache(): void {
  _cached = null
}
