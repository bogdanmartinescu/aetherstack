---
"@aetherstack/mcp-server": patch
---

Fix MCP packaging so the bundled registry stays current and the binary runs

- Bundle `@aetherstack/*` into the CJS build (Node can no longer load raw `.ts` exports)
- Copy canonical `registry/public/registry.json` into `dist/` at build time and fail if missing/empty
- Remove duplicate shebang that crashed `node dist/index.js`
- Align MCP handshake version with `package.json`; clearer missing/invalid registry errors
