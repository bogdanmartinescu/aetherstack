import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import type { RegistryItem } from "@aetherstack/registry-schema"
import type { AetherConfig } from "../config"

export interface InstallResult {
  filesWritten: string[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

/**
 * Installs a registry item's files into the user's project.
 *
 * File placement rules (in priority order):
 *   1. Use `file.target` if present (explicit placement).
 *   2. For `registry:ui` files → write to `config.aliases.components`.
 *   3. For `registry:util` files → write to `config.aliases.utils`.
 *   4. Default → `config.aliases.components`.
 */
export async function installItem(
  item: RegistryItem,
  config: AetherConfig,
  cwd: string,
  options: { overwrite?: boolean; baseUrl?: string } = {},
): Promise<InstallResult> {
  const { overwrite = false, baseUrl } = options
  const filesWritten: string[] = []

  for (const file of item.files ?? []) {
    const targetRelative = resolveTarget(file, config)
    const targetAbsolute = resolve(cwd, targetRelative)

    if (existsSync(targetAbsolute) && !overwrite) {
      throw new Error(
        `File already exists: ${targetRelative}\nUse --overwrite to replace it.`,
      )
    }

    let content = file.content

    if (!content) {
      if (!baseUrl) {
        throw new Error(
          `No inline content for ${file.path} and no registry URL to fetch from.`,
        )
      }
      content = await fetchFileContent(baseUrl, file.path)
    }

    mkdirSync(dirname(targetAbsolute), { recursive: true })
    writeFileSync(targetAbsolute, content, "utf-8")
    filesWritten.push(targetRelative)
  }

  return {
    filesWritten,
    dependencies: item.dependencies ?? [],
    devDependencies: item.devDependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function resolveTarget(
  file: { path: string; type: string; target?: string | undefined },
  config: AetherConfig,
): string {
  if (file.target) return file.target

  const filename = file.path.split("/").pop() ?? file.path

  if (file.type === "registry:util") {
    return `${config.aliases.utils}/${filename}`
  }

  return `${config.aliases.components}/${filename}`
}

async function fetchFileContent(baseUrl: string, filePath: string): Promise<string> {
  const url = `${baseUrl.replace(/\/$/, "")}/r/${filePath}`
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
  return res.text()
}

/**
 * Checks whether a given file already exists in the project.
 * Used before asking for overwrite confirmation.
 */
export function getConflictingFiles(
  item: RegistryItem,
  config: AetherConfig,
  cwd: string,
): string[] {
  return (item.files ?? [])
    .map((f) => resolveTarget(f, config))
    .filter((target) => existsSync(resolve(cwd, target)))
}
