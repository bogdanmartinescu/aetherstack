import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"
import {
  CONFIG_FILE_NAME,
  DEFAULT_REGISTRY_URL,
  DEFAULT_COMPONENTS_DIR,
  DEFAULT_UTILS_DIR,
} from "./constants"

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

export const aetherConfigSchema = z.object({
  $schema: z.string().optional(),
  /** Base URL of the registry to install from. */
  registry: z.string().url().default(DEFAULT_REGISTRY_URL),
  aliases: z
    .object({
      /** Where UI components are written (e.g. "src/components/ui"). */
      components: z.string().default(DEFAULT_COMPONENTS_DIR),
      /** Where utility files are written (e.g. "src/lib"). */
      utils: z.string().default(DEFAULT_UTILS_DIR),
    })
    .default({}),
})

export type AetherConfig = z.infer<typeof aetherConfigSchema>

// ---------------------------------------------------------------------------
// Read / write
// ---------------------------------------------------------------------------

export function loadConfig(cwd = process.cwd()): AetherConfig | null {
  const configPath = resolve(cwd, CONFIG_FILE_NAME)
  if (!existsSync(configPath)) return null

  try {
    const raw = JSON.parse(readFileSync(configPath, "utf-8"))
    const result = aetherConfigSchema.safeParse(raw)
    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "))
    }
    return result.data
  } catch (err) {
    throw new Error(
      `Failed to parse ${CONFIG_FILE_NAME}: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

export function writeConfig(config: AetherConfig, cwd = process.cwd()): void {
  const configPath = resolve(cwd, CONFIG_FILE_NAME)
  const output = {
    $schema: `${config.registry}/schema.json`,
    registry: config.registry,
    aliases: config.aliases,
  }
  writeFileSync(configPath, JSON.stringify(output, null, 2) + "\n", "utf-8")
}

export function requireConfig(cwd = process.cwd()): AetherConfig {
  const config = loadConfig(cwd)
  if (!config) {
    throw new Error(
      `No ${CONFIG_FILE_NAME} found. Run \`aether-ui init\` to set up your project.`,
    )
  }
  return config
}
