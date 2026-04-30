# @aetherstack/mcp-server

> Aether UI MCP server — exposes the component registry to LLM agents via the Model Context Protocol.

Part of the [Aetherstack](https://aetherui.dev) design system monorepo.

## What this is

`@aetherstack/mcp-server` is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI coding assistants (Cursor, Claude Desktop, and compatible tools) direct access to the Aether UI registry. Agents can list, describe, and install components through natural-language prompts.

## MCP tools exposed

| Tool | Description |
|---|---|
| `list_components` | List all available registry items with descriptions |
| `get_component` | Get full details (props, AI metadata, source) for a component |
| `install_component` | Install a component into the current project via the CLI |
| `compose_block` | Compose a block from multiple components based on a description |

## Setup — Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"]
    }
  }
}
```

## Setup — Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"]
    }
  }
}
```

## Documentation

[aetherui.dev/llms](https://aetherui.dev/llms)

## License

MIT — see [LICENSE](../../LICENSE)
