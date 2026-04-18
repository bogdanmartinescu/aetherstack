import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { Command } from "commander"
import ora from "ora"
import pc from "picocolors"
import { loadConfig, writeConfig } from "../config"
import {
  CONFIG_FILE_NAME,
  DEFAULT_REGISTRY_URL,
  DEFAULT_COMPONENTS_DIR,
  DEFAULT_UTILS_DIR,
} from "../constants"

export const initCommand = new Command("init")
  .description("Initialize Aether UI in your project — creates aether.json")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--registry <url>", "Registry base URL", DEFAULT_REGISTRY_URL)
  .option("--components-dir <path>", "Component output directory", DEFAULT_COMPONENTS_DIR)
  .option("--utils-dir <path>", "Utilities output directory", DEFAULT_UTILS_DIR)
  .option("--force", "Overwrite existing aether.json", false)
  .action(async (opts) => {
    const cwd: string = resolve(opts.cwd)
    const configPath = resolve(cwd, CONFIG_FILE_NAME)

    if (existsSync(configPath) && !opts.force) {
      console.log(
        pc.yellow(`  ${CONFIG_FILE_NAME} already exists. Use --force to overwrite.`),
      )
      process.exit(0)
    }

    const spinner = ora("Initializing Aether UI…").start()

    try {
      const config = {
        registry: opts.registry,
        aliases: {
          components: opts.componentsDir,
          utils: opts.utilsDir,
        },
      }

      writeConfig(config, cwd)
      spinner.succeed(pc.green(`Created ${CONFIG_FILE_NAME}`))

      console.log("")
      console.log(pc.dim("  Configuration:"))
      console.log(`    Registry  ${pc.cyan(config.registry)}`)
      console.log(`    Components  ${pc.cyan(config.aliases.components)}`)
      console.log(`    Utils  ${pc.cyan(config.aliases.utils)}`)
      console.log("")
      console.log(`  Run ${pc.cyan("aether-ui list")} to see available components.`)
      console.log(`  Run ${pc.cyan("aether-ui add <component>")} to install one.`)
      console.log("")
    } catch (err) {
      spinner.fail(pc.red("Initialization failed"))
      console.error(pc.red(`  ${err instanceof Error ? err.message : String(err)}`))
      process.exit(1)
    }
  })
