import { Command } from "commander"
import { addCommand } from "./commands/add"
import { listCommand } from "./commands/list"
import { initCommand } from "./commands/init"

const program = new Command()

program
  .name("aether-ui")
  .description("Aether UI CLI — install components from the Aether UI registry")
  .version("0.0.1")
  .helpOption("-h, --help", "Show help")

program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)

program.parse(process.argv)
