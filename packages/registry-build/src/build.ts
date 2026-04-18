import { validateRegistry, findMissingDependencies } from "./validate"
import type { Registry, RegistryItem } from "@aetherstack/registry-schema"

export interface BuildOptions {
  /** Emit warnings instead of throwing on non-critical issues. */
  strict?: boolean
}

export interface BuildResult {
  registry: Registry
  warnings: string[]
}

/**
 * Processes a raw registry manifest: validates it, checks dependency
 * integrity, and returns a cleaned result ready for serialization.
 *
 * Throws if the registry fails schema validation.
 * In strict mode, also throws on dependency warnings.
 */
export function buildRegistry(
  data: unknown,
  options: BuildOptions = {},
): BuildResult {
  const { strict = false } = options

  const validation = validateRegistry(data)
  if (!validation.valid) {
    throw new Error(
      `Registry validation failed:\n${validation.errors.join("\n")}`,
    )
  }

  const registry = data as Registry
  const warnings: string[] = []

  const missingDeps = findMissingDependencies(registry)
  if (missingDeps.length > 0) {
    const msg = `Missing registry dependencies:\n${missingDeps.map((d) => `  - ${d}`).join("\n")}`
    if (strict) throw new Error(msg)
    warnings.push(msg)
  }

  return { registry, warnings }
}

/**
 * Sorts registry items: themes first, then by type alphabetically, then by name.
 * Useful for deterministic output.
 */
export function sortRegistryItems(items: RegistryItem[]): RegistryItem[] {
  return [...items].sort((a, b) => {
    if (a.type === "registry:theme" && b.type !== "registry:theme") return -1
    if (b.type === "registry:theme" && a.type !== "registry:theme") return 1
    if (a.type !== b.type) return a.type.localeCompare(b.type)
    return a.name.localeCompare(b.name)
  })
}
