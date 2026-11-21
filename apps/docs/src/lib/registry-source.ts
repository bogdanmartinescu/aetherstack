/**
 * Build-time access to the installable source of a registry item.
 *
 * The docs "Manual" install tab shows exactly what `npx @aetherstack/cli add <name>`
 * writes into a project: the `content` of each file in the generated per-item registry
 * JSON (`apps/registry-public/public/r/<name>.json`). Reading it at build time keeps the
 * documentation from drifting from the registry. CI already verifies those files are
 * committed and current.
 */
import { readFileSync } from "node:fs"
import path from "node:path"

interface RegistryItemFile {
  target?: string
  content?: string
}

const ITEM_NAME = /^[a-z0-9][a-z0-9-]*$/

export function getRegistrySource(name: string): string {
  if (!ITEM_NAME.test(name)) {
    throw new Error(`Invalid registry item name: ${name}`)
  }
  // `next build` runs with apps/docs as the working directory.
  const file = path.resolve(process.cwd(), "../registry-public/public/r", `${name}.json`)
  const item = JSON.parse(readFileSync(file, "utf8")) as { files?: RegistryItemFile[] }
  const sources = (item.files ?? []).flatMap((entry) =>
    typeof entry.content === "string"
      ? [{ target: entry.target ?? name, content: entry.content.trimEnd() }]
      : [],
  )
  if (sources.length === 0) {
    throw new Error(`Registry item ${name} has no inline source in ${file}`)
  }
  if (sources.length === 1) {
    return sources[0]?.content ?? ""
  }
  return sources.map((entry) => `// ${entry.target}\n${entry.content}`).join("\n\n")
}
