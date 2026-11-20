import { registrySchema, registryItemSchema } from "@aetherstack/registry-schema"
import type { Registry, RegistryItem } from "@aetherstack/registry-schema"

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * Validates a full registry manifest against the schema.
 */
export function validateRegistry(data: unknown): ValidationResult {
  const result = registrySchema.safeParse(data)
  if (result.success) {
    return { valid: true, errors: [] }
  }
  return {
    valid: false,
    errors: result.error.errors.map((e) => `[${e.path.join(".")}] ${e.message}`),
  }
}

/**
 * Validates a single registry item.
 */
export function validateRegistryItem(data: unknown): ValidationResult {
  const result = registryItemSchema.safeParse(data)
  if (result.success) {
    return { valid: true, errors: [] }
  }
  return {
    valid: false,
    errors: result.error.errors.map((e) => `[${e.path.join(".")}] ${e.message}`),
  }
}

/**
 * Validates that all `registryDependencies` referenced within items actually
 * exist in the same registry. Returns names of any missing dependencies.
 */
export function findMissingDependencies(registry: Registry): string[] {
  const itemNames = new Set(registry.items.map((item) => item.name))
  const missing: string[] = []

  for (const item of registry.items) {
    for (const dep of item.registryDependencies ?? []) {
      if (!itemNames.has(dep)) {
        missing.push(`${item.name} → ${dep}`)
      }
    }
  }

  return missing
}

/**
 * Detects cycles in `registryDependencies` within a single registry.
 * Each cycle is returned as the path of item names ending back at the start.
 */
export function findDependencyCycles(registry: Registry): string[][] {
  const deps = new Map(
    registry.items.map((item) => [item.name, item.registryDependencies ?? []] as const),
  )
  const cycles: string[][] = []
  const state = new Map<string, "visiting" | "done">()
  const stack: string[] = []

  const visit = (name: string) => {
    const current = state.get(name)
    if (current === "done") return
    if (current === "visiting") {
      cycles.push([...stack.slice(stack.indexOf(name)), name])
      return
    }
    state.set(name, "visiting")
    stack.push(name)
    for (const dep of deps.get(name) ?? []) {
      if (deps.has(dep)) visit(dep)
    }
    stack.pop()
    state.set(name, "done")
  }

  for (const name of deps.keys()) visit(name)
  return cycles
}

export type { Registry, RegistryItem }
