import { Command } from "commander"
import ora from "ora"
import pc from "picocolors"
import { loadConfig } from "../config"
import { fetchRegistry, formatItemType } from "../lib/registry"
import { DEFAULT_REGISTRY_URL } from "../constants"

export const listCommand = new Command("list")
  .description("List all available components in the registry")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--registry <url>", "Override registry URL")
  .option("--type <type>", "Filter by type (ui, block, pattern, theme, …)")
  .action(async (opts) => {
    const config = loadConfig(opts.cwd)
    const registryUrl = opts.registry ?? config?.registry ?? DEFAULT_REGISTRY_URL

    const spinner = ora("Fetching registry…").start()

    let registry
    try {
      registry = await fetchRegistry(registryUrl)
      spinner.stop()
    } catch (err) {
      spinner.fail(pc.red("Could not fetch registry"))
      console.error(pc.red(`  ${err instanceof Error ? err.message : String(err)}`))
      process.exit(1)
    }

    let items = registry.items
    if (opts.type) {
      items = items.filter((item) => item.type.endsWith(opts.type))
    }

    if (items.length === 0) {
      console.log(pc.dim(`  No items found${opts.type ? ` with type "${opts.type}"` : ""}.`))
      process.exit(0)
    }

    console.log("")
    console.log(
      `  ${pc.bold(registry.name)} registry — ${pc.dim(registryUrl)}`,
    )
    console.log("")

    // Group by type
    const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
      const key = formatItemType(item.type)
      acc[key] ??= []
      acc[key].push(item)
      return acc
    }, {})

    for (const [type, group] of Object.entries(grouped).sort()) {
      console.log(`  ${pc.bold(pc.cyan(type))}`)
      for (const item of group.sort((a, b) => a.name.localeCompare(b.name))) {
        const title = item.title ? ` ${pc.dim("·")} ${item.title}` : ""
        const deps =
          (item.dependencies?.length ?? 0) > 0
            ? ` ${pc.dim(`[${item.dependencies!.join(", ")}]`)}`
            : ""
        console.log(`    ${pc.green(item.name)}${title}${deps}`)
        if (item.description) {
          console.log(`      ${pc.dim(item.description)}`)
        }
      }
      console.log("")
    }

    console.log(
      `  ${pc.dim(`${items.length} item${items.length !== 1 ? "s" : ""} available`)}`,
    )
    console.log("")
  })
