/**
 * Build-time component count stats sourced from the canonical registry
 * manifest at registry/public/registry.json. The introduction page reads
 * these so the numbers it displays can never drift from the registry truth.
 *
 * Imported as a JSON module so Next.js inlines the contents at build time.
 */
import registry from "../../../../registry/public/registry.json"

interface RegistryItem {
  name: string
  type: string
}

const items = (registry as { items: RegistryItem[] }).items

export const REGISTRY_STATS = {
  primitives: items.filter((i) => i.type === "registry:ui").length,
  patterns: items.filter((i) => i.type === "registry:pattern").length,
  blocks: items.filter((i) => i.type === "registry:block").length,
  total: items.length,
} as const
