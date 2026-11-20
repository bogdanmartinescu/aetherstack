/**
 * Registry loader for the MCP server.
 *
 * Resolution order (first that succeeds wins):
 *  1. AETHER_REGISTRY_URL env var (remote JSON)
 *  2. AETHER_REGISTRY_FILE env var (local JSON path)
 *  3. Bundled registry.json baked in at build time
 */
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { registrySchema } from "@aetherstack/registry-schema"
import type { Registry } from "@aetherstack/registry-schema"

let _cached: Registry | null = null

export async function loadRegistry(): Promise<Registry> {
  if (_cached) return _cached

  const registryUrl = process.env["AETHER_REGISTRY_URL"]
  const registryFile = process.env["AETHER_REGISTRY_FILE"]

  let raw: unknown
  let source: string

  if (registryUrl) {
    source = registryUrl
    let res: Response
    try {
      res = await fetch(registryUrl, { signal: AbortSignal.timeout(10_000) })
    } catch (err) {
      throw new Error(
        `Failed to reach registry at ${registryUrl}: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
    if (!res.ok) {
      throw new Error(
        `Failed to fetch registry from ${registryUrl}: ${res.status} ${res.statusText}`,
      )
    }
    raw = await res.json()
  } else if (registryFile) {
    source = registryFile
    const absolute = resolve(registryFile)
    if (!existsSync(absolute)) {
      throw new Error(`Registry file not found: ${absolute}`)
    }
    try {
      raw = JSON.parse(readFileSync(absolute, "utf-8"))
    } catch (err) {
      throw new Error(
        `Failed to parse registry file ${absolute}: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  } else {
    // Fall back to bundled registry baked in at build time.
    // __dirname points to dist/ when compiled; in vitest it points at src/.
    const candidates = [
      resolve(__dirname, "registry.json"),
      resolve(__dirname, "..", "dist", "registry.json"),
    ]
    const bundledPath = candidates.find((p) => existsSync(p))
    if (!bundledPath) {
      throw new Error(
        "No registry found. Set AETHER_REGISTRY_URL or AETHER_REGISTRY_FILE, or rebuild the package to bundle registry.json.",
      )
    }
    source = bundledPath
    raw = JSON.parse(readFileSync(bundledPath, "utf-8"))
  }

  const parsed = registrySchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(
      `Invalid registry format from ${source}: ${parsed.error.errors[0]?.message ?? parsed.error.message}`,
    )
  }

  _cached = parsed.data
  return _cached
}

/** Clear the cache — useful in tests. */
export function clearRegistryCache(): void {
  _cached = null
}
