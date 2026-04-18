import { registrySchema, registryItemSchema } from "@aetherstack/registry-schema"
import type { Registry, RegistryItem } from "@aetherstack/registry-schema"
import { REGISTRY_MANIFEST_PATH } from "../constants"

export type { Registry, RegistryItem }

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

/**
 * Fetches and validates the full registry manifest from the given base URL.
 */
export async function fetchRegistry(baseUrl: string): Promise<Registry> {
  const url = `${baseUrl.replace(/\/$/, "")}${REGISTRY_MANIFEST_PATH}`

  let res: Response
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    throw new Error(
      `Could not reach registry at ${url}. Is the registry running?\n  ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  if (!res.ok) {
    throw new Error(`Registry returned ${res.status} ${res.statusText} for ${url}`)
  }

  const data: unknown = await res.json()
  const result = registrySchema.safeParse(data)
  if (!result.success) {
    throw new Error(`Registry manifest is invalid: ${result.error.errors[0]?.message}`)
  }

  return result.data
}

/**
 * Fetches a single registry item by name from the individual item endpoint
 * (`/r/[name].json`). Falls back to searching the full manifest if the
 * individual endpoint is not available.
 */
export async function fetchRegistryItem(
  baseUrl: string,
  name: string,
): Promise<RegistryItem | null> {
  const url = `${baseUrl.replace(/\/$/, "")}/r/${name}.json`

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return null

    const data: unknown = await res.json()
    const result = registryItemSchema.safeParse(data)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

/**
 * Resolves a component by name: tries the individual endpoint first, then
 * falls back to fetching the full manifest and finding by name.
 */
export async function resolveItem(
  baseUrl: string,
  name: string,
): Promise<RegistryItem | null> {
  const individual = await fetchRegistryItem(baseUrl, name)
  if (individual) return individual

  const registry = await fetchRegistry(baseUrl)
  return registry.items.find((item) => item.name === name) ?? null
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatItemType(type: string): string {
  return type.replace("registry:", "")
}
