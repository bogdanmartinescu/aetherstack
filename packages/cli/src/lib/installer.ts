import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { RegistryItem } from "@aetherstack/registry-schema"
import type { AetherConfig } from "../config"
import { assertSafeRegistryFilePath, resolveInsideProject } from "./paths"

export interface InstallResult {
  filesWritten: string[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

export interface InstallOptions {
  overwrite?: boolean
  baseUrl?: string
  /** When true, resolve and validate targets but do not write files. */
  dryRun?: boolean
}

/**
 * Installs a registry item's files into the user's project.
 *
 * File placement rules (in priority order):
 *   1. Use `file.target` if present (explicit placement).
 *   2. For `registry:ui` files → write to `config.aliases.components`.
 *   3. For `registry:util` files → write to `config.aliases.utils`.
 *   4. Default → `config.aliases.components`.
 *
 * Writes are confined to `cwd`. On mid-install failure, files created in this
 * call are removed (best-effort rollback). Pre-existing files are never deleted.
 */
export async function installItem(
  item: RegistryItem,
  config: AetherConfig,
  cwd: string,
  options: InstallOptions = {},
): Promise<InstallResult> {
  const { overwrite = false, baseUrl, dryRun = false } = options
  const filesWritten: string[] = []
  const newlyCreated: string[] = []

  // Validate every target before any write so traversal fails atomically.
  const planned = (item.files ?? []).map((file) => {
    const targetRelative = resolveTarget(file, config)
    const targetAbsolute = resolveInsideProject(cwd, targetRelative)
    return { file, targetRelative, targetAbsolute }
  })

  try {
    for (const { file, targetRelative, targetAbsolute } of planned) {
      if (existsSync(targetAbsolute) && !overwrite) {
        throw new Error(`File already exists: ${targetRelative}\nUse --overwrite to replace it.`)
      }

      if (dryRun) {
        filesWritten.push(targetRelative)
        continue
      }

      let content = file.content

      if (!content) {
        if (!baseUrl) {
          throw new Error(`No inline content for ${file.path} and no registry URL to fetch from.`)
        }
        content = await fetchFileContent(baseUrl, file.path)
      }

      const existed = existsSync(targetAbsolute)
      mkdirSync(dirname(targetAbsolute), { recursive: true })
      writeFileSync(targetAbsolute, content, "utf-8")
      filesWritten.push(targetRelative)
      if (!existed) {
        newlyCreated.push(targetAbsolute)
      }
    }
  } catch (err) {
    for (const path of newlyCreated.reverse()) {
      try {
        unlinkSync(path)
      } catch {
        // best-effort rollback
      }
    }
    throw err
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
  const safePath = assertSafeRegistryFilePath(filePath)
  const url = `${baseUrl.replace(/\/$/, "")}/r/${safePath}`
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
    .map((f) => {
      const target = resolveTarget(f, config)
      resolveInsideProject(cwd, target)
      return target
    })
    .filter((target) => existsSync(resolveInsideProject(cwd, target)))
}
