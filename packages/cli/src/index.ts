import { Command } from "commander"
import cliPackage from "../package.json"
import { addCommand } from "./commands/add"
import { listCommand } from "./commands/list"
import { initCommand } from "./commands/init"
import { generateCommand } from "./commands/generate"

const program = new Command()

program
  .name("aether-ui")
  .description("Aether UI CLI — install components from the Aether UI registry")
  .version(cliPackage.version)
  .helpOption("-h, --help", "Show help")

program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)
program.addCommand(generateCommand)

program.parse(process.argv)
