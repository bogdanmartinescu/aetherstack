import { resolve, join } from "node:path"
import { writeFileSync, mkdirSync, existsSync } from "node:fs"
import { Command } from "commander"
import ora from "ora"
import pc from "picocolors"
import { loadConfig } from "../config"
import { resolveItem } from "../lib/registry"
import { installItem } from "../lib/installer"
import { resolveGenerate } from "../lib/generate"
import { DEFAULT_REGISTRY_URL } from "../constants"
import type { RegistryItem } from "@aetherstack/registry-schema"

export const generateCommand = new Command("generate")
  .description(
    "Scaffold UI from a natural-language description — resolves to add calls + a starter file",
  )
  .argument("<description>", 'Natural-language UI goal, e.g. "build me a SaaS dashboard"')
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--registry <url>", "Override registry URL")
  .option("--dry-run", "Preview what would be installed without writing files", false)
  .option("--no-starter", "Skip writing the starter file")
  .action(async (description: string, opts) => {
    const cwd = resolve(opts.cwd)
    const config = loadConfig(cwd)
    const registryUrl = opts.registry ?? config?.registry ?? DEFAULT_REGISTRY_URL

    console.log("")
    console.log(`  ${pc.cyan("aether-ui generate")} — ${pc.bold(description)}`)
    console.log("")

    // ------------------------------------------------------------------
    // Step 1: Fetch registry and resolve the prompt
    // ------------------------------------------------------------------
    const fetchSpinner = ora("Fetching registry…").start()

    let allItems: RegistryItem[]
    try {
      const res = await fetch(`${registryUrl}/registry.json`)
      if (!res.ok) throw new Error(`Registry responded with ${res.status}`)
      const data = (await res.json()) as { items?: RegistryItem[] }
      allItems = data.items ?? []
      fetchSpinner.succeed(pc.dim(`Registry loaded (${allItems.length} items)`))
    } catch (err) {
      fetchSpinner.fail(pc.red("Failed to fetch registry"))
      console.error(pc.red(`  ${err instanceof Error ? err.message : String(err)}`))
      process.exit(1)
    }

    const plan = resolveGenerate(description, allItems)

    if (plan.components.length === 0) {
      console.log(pc.yellow("  No matching components found."))
      if (plan.notes) console.log(pc.dim(`  ${plan.notes}`))
      console.log("")
      process.exit(0)
    }

    // ------------------------------------------------------------------
    // Step 2: Print the plan
    // ------------------------------------------------------------------
    console.log(`  ${pc.bold("Components to install:")}`)
    for (const name of plan.components) {
      console.log(`    ${pc.dim("→")} ${pc.cyan(name)}`)
    }
    console.log("")

    if (plan.notes) {
      console.log(`  ${pc.dim(plan.notes)}`)
      console.log("")
    }

    if (opts.dryRun) {
      console.log(pc.dim("  [dry-run] No files written."))
      console.log("")
      if (plan.starterCode && opts.starter) {
        console.log(`  ${pc.bold("Starter file preview:")}`)
        console.log("")
        console.log(plan.starterCode.split("\n").map((l) => `    ${l}`).join("\n"))
      }
      return
    }

    if (!config) {
      console.log(
        pc.yellow(
          `  No aether.json found in ${cwd}. Run ${pc.cyan("aether-ui init")} first, or use --cwd to point to your project.`,
        ),
      )
      console.log("")
      console.log(`  ${pc.bold("Equivalent install command:")}`)
      console.log(`  ${pc.cyan(`aether-ui add ${plan.components.join(" ")}`)}`)
      console.log("")
      process.exit(1)
    }

    // ------------------------------------------------------------------
    // Step 3: Install each component
    // ------------------------------------------------------------------
    for (const name of plan.components) {
      const spinner = ora(`Installing ${pc.cyan(name)}…`).start()

      let item: RegistryItem | null
      try {
        item = await resolveItem(registryUrl, name)
      } catch {
        spinner.warn(pc.yellow(`Skipping ${name} — could not resolve from registry`))
        continue
      }

      if (!item) {
        spinner.warn(pc.yellow(`Skipping ${name} — not found in registry`))
        continue
      }

      try {
        const result = await installItem(item, config, cwd, { overwrite: false, baseUrl: registryUrl })
        spinner.succeed(pc.green(`Added ${name}`))
        for (const f of result.filesWritten) {
          console.log(`    ${pc.dim("→")} ${f}`)
        }
      } catch (err) {
        spinner.warn(pc.yellow(`Skipped ${name} — ${err instanceof Error ? err.message : String(err)}`))
      }
    }

    // ------------------------------------------------------------------
    // Step 4: Write starter file
    // ------------------------------------------------------------------
    if (plan.starterCode && opts.starter) {
      const pagesDir = join(cwd, "app")
      const outputDir = existsSync(pagesDir) ? pagesDir : join(cwd, "src", "app")
      mkdirSync(outputDir, { recursive: true })

      const filename = deriveFilename(description)
      const outputPath = join(outputDir, filename)

      writeFileSync(outputPath, plan.starterCode)
      console.log("")
      console.log(`  ${pc.green("✓")} Starter file written: ${pc.cyan(outputPath)}`)
    }

    console.log("")
    console.log(`  ${pc.green("Done!")} Components installed from: ${pc.bold(description)}`)
    console.log("")
  })

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function deriveFilename(description: string): string {
  const slug = description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40)

  return `${slug}/page.tsx`
}
