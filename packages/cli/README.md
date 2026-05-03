# @aetherstack/cli

> Aether UI CLI — add components from the Aether UI registry into your project.

The `aether-ui` binary is the primary way to install Aether UI components. It copies component source directly into your project so you own and can edit every file.

## Quick start

```bash
# Scaffold a new project with Aether UI configured
npx aether-ui init

# Add a component (copies source to your project)
npx aether-ui add button
npx aether-ui add data-table
npx aether-ui add dashboard-shell

# List all available components
npx aether-ui list

# Generate a page from a natural-language prompt
npx aether-ui generate "settings page with profile and billing tabs"
npx aether-ui generate "chat interface with sidebar and message thread"
```

## Install globally (optional)

```bash
pnpm add -g @aetherstack/cli
aether-ui init
```

## Commands

| Command | Description |
|---|---|
| `init` | Set up Aether UI in an existing project (creates `aether.json`, installs deps) |
| `add <name>` | Install a component by name, copying source into your project |
| `list` | List all available components in the registry |
| `generate "<prompt>"` | Generate a starter page from a natural-language description |

## Requirements

- Node.js ≥ 18
- A project with React and Tailwind CSS configured

## Documentation

- [CLI reference](https://aether-ui.dev/cli) — full command reference, flags, and `aether.json` schema
- [Installation guide](https://aether-ui.dev/installation) — framework-specific setup guides
- [Component reference](https://aether-ui.dev/components) — browsable catalog of installable components
- [AI & MCP](https://aether-ui.dev/llms) — `generate` command, MCP server, AI prompt recipes

## License

MIT — see [LICENSE](../../LICENSE)
