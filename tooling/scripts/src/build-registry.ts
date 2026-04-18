#!/usr/bin/env tsx
/**
 * Builds the public registry manifest and copies it to apps/registry-public
 * for static export.
 *
 * Run with: pnpm --filter @aetherstack/scripts build-registry
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { buildRegistry, sortRegistryItems } from "@aetherstack/registry-build"

// tsx runs in CJS mode — use __dirname rather than import.meta.dirname
const ROOT = resolve(__dirname, "../../../")

const INPUT = resolve(ROOT, "registry/public/registry.json")
const OUTPUT_DIR = resolve(ROOT, "apps/registry-public/public/r")
const OUTPUT_FILE = resolve(OUTPUT_DIR, "registry.json")

console.log("Building public registry …")

const raw = JSON.parse(readFileSync(INPUT, "utf-8"))
const { registry, warnings } = buildRegistry(raw)

for (const warning of warnings) {
  console.warn(`  ⚠ ${warning}`)
}

const output = {
  ...registry,
  items: sortRegistryItems(registry.items),
}

mkdirSync(OUTPUT_DIR, { recursive: true })
writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n")

console.log(`  ✓ Written to apps/registry-public/public/r/registry.json`)
console.log(`  ✓ ${output.items.length} items`)
