#!/usr/bin/env tsx
/**
 * Validates all registry manifests in registry/public and registry/pro.
 * Run with: pnpm --filter @aetherstack/scripts validate-registry
 */
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { validateRegistry, findMissingDependencies } from "@aetherstack/registry-build"
import type { Registry } from "@aetherstack/registry-schema"

// Items in this list are exempt from the AI metadata requirement (pro placeholders, etc.)
const AI_METADATA_EXEMPT: string[] = []

// tsx runs in CJS mode — use __dirname rather than import.meta.dirname
const ROOT = resolve(__dirname, "../../../")

const registries = [
  { label: "public", path: resolve(ROOT, "registry/public/registry.json") },
  { label: "pro", path: resolve(ROOT, "registry/pro/registry.json") },
]

let hasErrors = false

for (const { label, path } of registries) {
  console.log(`\nValidating registry/${label}/registry.json …`)

  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(path, "utf-8"))
  } catch {
    console.error(`  ✗ Could not read file: ${path}`)
    hasErrors = true
    continue
  }

  const result = validateRegistry(raw)
  if (!result.valid) {
    console.error("  ✗ Schema errors:")
    result.errors.forEach((e) => console.error(`    - ${e}`))
    hasErrors = true
    continue
  }

  const missing = findMissingDependencies(raw as Registry)
  if (missing.length > 0) {
    console.warn("  ⚠ Missing registry dependencies:")
    missing.forEach((m) => console.warn(`    - ${m}`))
  }

  // Enforce AI metadata for public registry items (Phase 5 requirement).
  // Pro registry items are excluded — they may ship AI metadata later.
  if (label === "public") {
    const registry = raw as Registry
    const missingAi = registry.items.filter(
      (item) => !item.ai && !AI_METADATA_EXEMPT.includes(item.name),
    )
    if (missingAi.length > 0) {
      console.error("  ✗ Items missing required AI metadata (add an `ai` block):")
      missingAi.forEach((item) => console.error(`    - ${item.name}`))
      hasErrors = true
      continue
    }
  }

  console.log(`  ✓ Valid (${(raw as Registry).items.length} items)`)
}

if (hasErrors) {
  process.exit(1)
}
