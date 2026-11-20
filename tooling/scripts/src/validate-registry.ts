#!/usr/bin/env tsx
/**
 * Validates all registry manifests in registry/public and registry/pro.
 * Run with: pnpm --filter @aetherstack/scripts validate-registry
 */
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  validateRegistry,
  findMissingDependencies,
  findDependencyCycles,
} from "@aetherstack/registry-build"
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

  const registry = raw as Registry
  let registryFailed = false

  const missing = findMissingDependencies(registry)
  if (missing.length > 0) {
    // Public registry must resolve every dependency. Pro may reference public
    // items the validator cannot see across namespaces — keep those as warnings.
    if (label === "public") {
      console.error("  ✗ Missing registry dependencies:")
      missing.forEach((m) => console.error(`    - ${m}`))
      registryFailed = true
    } else {
      console.warn("  ⚠ Missing registry dependencies:")
      missing.forEach((m) => console.warn(`    - ${m}`))
    }
  }

  const cycles = findDependencyCycles(registry)
  if (cycles.length > 0) {
    console.error("  ✗ Dependency cycles:")
    cycles.forEach((cycle) => console.error(`    - ${cycle.join(" → ")}`))
    registryFailed = true
  }

  // Enforce AI metadata for public registry items (Phase 5 requirement).
  // Pro registry items are excluded — they may ship AI metadata later.
  if (label === "public") {
    const missingAi = registry.items.filter(
      (item) => !item.ai && !AI_METADATA_EXEMPT.includes(item.name),
    )
    if (missingAi.length > 0) {
      console.error("  ✗ Items missing required AI metadata (add an `ai` block):")
      missingAi.forEach((item) => console.error(`    - ${item.name}`))
      registryFailed = true
    }
  }

  if (registryFailed) {
    hasErrors = true
    continue
  }

  console.log(`  ✓ Valid (${registry.items.length} items)`)
}

if (hasErrors) {
  process.exit(1)
}
