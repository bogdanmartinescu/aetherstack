import { resolve } from "node:path"
import { Command } from "commander"
import ora from "ora"
import pc from "picocolors"
import { loadConfig, requireConfig } from "../config"
import { resolveItem } from "../lib/registry"
import { installItem, getConflictingFiles } from "../lib/installer"
import { DEFAULT_REGISTRY_URL } from "../constants"
import type { RegistryItem } from "@aetherstack/registry-schema"

export const addCommand = new Command("add")
  .description("Add a component from the Aether UI registry to your project")
  .argument("<components...>", "Component name(s) to add")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--registry <url>", "Override registry URL")
  .option("--overwrite", "Overwrite existing files", false)
  .option("--dry-run", "Preview what would be written without writing", false)
  .action(async (componentNames: string[], opts) => {
    const cwd = resolve(opts.cwd)
    const config = requireConfig(cwd)
    const registryUrl = opts.registry ?? config.registry ?? DEFAULT_REGISTRY_URL

    for (const name of componentNames) {
      await addOne(name, { cwd, registryUrl, config, overwrite: opts.overwrite, dryRun: opts.dryRun })
    }
  })

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

async function addOne(
  name: string,
  opts: {
    cwd: string
    registryUrl: string
    config: ReturnType<typeof requireConfig>
    overwrite: boolean
    dryRun: boolean
  },
): Promise<void> {
  const { cwd, registryUrl, config, overwrite, dryRun } = opts

  const spinner = ora(`Resolving ${pc.cyan(name)}…`).start()

  let item: RegistryItem | null
  try {
    item = await resolveItem(registryUrl, name)
  } catch (err) {
    spinner.fail(pc.red(`Failed to reach registry`))
    console.error(pc.red(`  ${err instanceof Error ? err.message : String(err)}`))
    process.exit(1)
  }

  if (!item) {
    spinner.fail(pc.red(`Component not found: ${name}`))
    console.log(pc.dim(`  Run ${pc.cyan("aether-ui list")} to see available components.`))
    process.exit(1)
  }

  spinner.text = `Installing ${pc.cyan(name)}…`

  // Warn about conflicts
  if (!overwrite) {
    const conflicts = getConflictingFiles(item, config, cwd)
    if (conflicts.length > 0) {
      spinner.warn(pc.yellow(`Conflict — files already exist:`))
      conflicts.forEach((f) => console.log(`  ${pc.yellow("→")} ${f}`))
      console.log(
        `\n  Run with ${pc.cyan("--overwrite")} to replace them.\n`,
      )
      process.exit(1)
    }
  }

  if (dryRun) {
    spinner.info(pc.dim(`[dry-run] Would write:`))
    for (const file of item.files ?? []) {
      console.log(`  ${pc.dim("→")} ${file.target ?? file.path}`)
    }
    return
  }

  let result
  try {
    result = await installItem(item, config, cwd, { overwrite, baseUrl: registryUrl })
  } catch (err) {
    spinner.fail(pc.red(`Failed to install ${name}`))
    console.error(pc.red(`  ${err instanceof Error ? err.message : String(err)}`))
    process.exit(1)
  }

  spinner.succeed(pc.green(`Added ${name}`))

  // Files written
  if (result.filesWritten.length > 0) {
    for (const f of result.filesWritten) {
      console.log(`  ${pc.dim("→")} ${f}`)
    }
  }

  // npm dependencies to install
  if (result.dependencies.length > 0) {
    console.log("")
    console.log(`  ${pc.yellow("Dependencies required:")}`)
    console.log(`  ${pc.cyan(`pnpm add ${result.dependencies.join(" ")}`)}`)
  }

  if (result.devDependencies.length > 0) {
    console.log(`  ${pc.cyan(`pnpm add -D ${result.devDependencies.join(" ")}`)}`)
  }

  // Registry dependencies that also need to be installed
  if (result.registryDependencies.length > 0) {
    console.log("")
    console.log(`  ${pc.yellow("Registry dependencies:")}`)
    for (const dep of result.registryDependencies) {
      console.log(`  ${pc.cyan(`aether-ui add ${dep}`)}`)
    }
  }

  console.log("")
}
