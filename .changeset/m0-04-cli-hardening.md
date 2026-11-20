---
"@aetherstack/cli": patch
---

Harden CLI registry fetch, path safety, and dry-run behavior (M0-04)

- `aether-ui generate` now uses `fetchRegistry` (`/r/registry.json` + Zod) instead of an unvalidated `/registry.json` cast
- Install targets and config aliases reject absolute paths and `..` escapes; registry file fetches reject unsafe paths
- Mid-install failures roll back newly created files; `add`/`init` dry-run validate without writing
