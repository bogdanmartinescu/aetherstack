import { z } from "zod"

// ---------------------------------------------------------------------------
// Item types — mirrors shadcn/ui registry item type taxonomy
// ---------------------------------------------------------------------------

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:block",
  "registry:component",
  "registry:pattern",
  "registry:example",
  "registry:hook",
  "registry:util",
  "registry:page",
  "registry:theme",
])

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>

// ---------------------------------------------------------------------------
// File entry within a registry item
// ---------------------------------------------------------------------------

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
})

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>

// ---------------------------------------------------------------------------
// Tailwind config overrides bundled with a registry item
// ---------------------------------------------------------------------------

export const registryItemTailwindSchema = z.object({
  config: z
    .object({
      content: z.array(z.string()).optional(),
      theme: z.record(z.unknown()).optional(),
      plugins: z.array(z.string()).optional(),
    })
    .optional(),
})

export type RegistryItemTailwind = z.infer<typeof registryItemTailwindSchema>

// ---------------------------------------------------------------------------
// CSS variable overrides bundled with a registry item
// ---------------------------------------------------------------------------

export const registryItemCssVarsSchema = z.object({
  light: z.record(z.string()).optional(),
  dark: z.record(z.string()).optional(),
})

export type RegistryItemCssVars = z.infer<typeof registryItemCssVarsSchema>

// ---------------------------------------------------------------------------
// A single registry item (component, block, theme, etc.)
// ---------------------------------------------------------------------------

export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string().min(1),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  /** Names of other registry items this item depends on. */
  registryDependencies: z.array(z.string()).optional(),
  /** npm package dependencies required by this item. */
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  files: z.array(registryItemFileSchema).optional(),
  /** Arbitrary metadata for tooling (not displayed to users). */
  meta: z.record(z.unknown()).optional(),
  /** Whether this item is part of the pro tier. */
  pro: z.boolean().optional(),
})

export type RegistryItem = z.infer<typeof registryItemSchema>

// ---------------------------------------------------------------------------
// Top-level registry manifest
// ---------------------------------------------------------------------------

export const registrySchema = z.object({
  $schema: z.string().optional(),
  name: z.string().min(1),
  homepage: z.string().url().optional(),
  version: z.string().optional(),
  items: z.array(registryItemSchema),
})

export type Registry = z.infer<typeof registrySchema>
