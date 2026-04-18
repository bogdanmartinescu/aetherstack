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
    errors: result.error.errors.map(
      (e) => `[${e.path.join(".")}] ${e.message}`,
    ),
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
    errors: result.error.errors.map(
      (e) => `[${e.path.join(".")}] ${e.message}`,
    ),
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

export type { Registry, RegistryItem }
