# M0-01 — Baseline repository and distribution audit

- Audited commit: `main` at `6942f57` (merge of PR #6), on branch `chore/m0-01-baseline-audit`.
- Date: 2026-11-20.
- Environment: macOS, Node v26.13.1 (CI uses Node 22; `engines` requires >=20), pnpm 9.1.0.
- Scope: what actually exists in the tree, what the registry installs, what npm and the public endpoints serve, and what the docs claim. Earlier figures (README "138", registry "58") are not reused; every number below comes from a command in this document.

## Reproduce

```bash
# Inventory (read-only, JSON on stdout). Run tsx directly so pnpm's .npmrc warnings stay off stdout.
cd tooling/scripts && ./node_modules/.bin/tsx src/audit-inventory.ts > /tmp/aether-inventory.json

# Baseline checks (from repo root)
pnpm install --frozen-lockfile
pnpm --filter @aetherstack/scripts validate-registry
pnpm --filter @aetherstack/scripts build-registry && git status --short apps/registry-public apps/docs/public
pnpm typecheck && pnpm lint && pnpm test && pnpm build
pnpm format:check

# Distribution (network)
npm view @aetherstack/<pkg> version
curl -s -o /dev/null -w "%{http_code}\n" https://registry.aether-ui.dev/r/registry.json
curl -sI https://registry.aether-ui.dev/r/button.json
curl -s -o /dev/null -w "%{http_code}\n" https://aether-ui.dev/llms.txt
npm pack @aetherstack/mcp-server@latest && tar -xzf aetherstack-mcp-server-*.tgz && jq '.items|length' package/dist/registry.json
```

`audit-inventory.ts` counts component modules under each package's `src/components` (including `ai/`), follows the barrel's relative re-exports, maps registry file paths back to source modules, compares docs routes under `apps/docs/src/app/(docs)/{components,patterns,blocks}` with registry names, and checks registry integrity (duplicates, AI metadata, missing files, targets, dangling dependencies, dependency cycles) and generated `r/*.json` freshness.

## Inventory

| Layer     | Source modules | of which AI | Exported from barrel | Registry items | Source modules not in registry | Docs routes | Docs routes without registry item |
| --------- | -------------- | ----------- | -------------------- | -------------- | ------------------------------ | ----------- | --------------------------------- |
| ui        | 78             | 14          | 78                   | 44             | 34                             | 77          | 34                                |
| patterns  | 39             | 10          | 39                   | 17             | 22                             | 46          | 29                                |
| blocks    | 34             | 9           | 34                   | 10             | 24                             | 34          | 24                                |
| **Total** | **151**        | **33**      | **151**              | **71**         | **80**                         | **157**     | **87**                            |

Registry (`registry/public/registry.json`): 71 items (44 `registry:ui`, 17 `registry:pattern`, 10 `registry:block`); `registry/pro/registry.json`: 2 items. No duplicate names, no missing AI metadata, no missing source files, no non-standard targets, no dangling dependencies within the public registry, no dependency cycles. Generated artefacts: 71 per-item files plus `registry.json` in `apps/registry-public/public/r`, none missing or stale; `build-registry` produced no diff.

### Source modules that cannot be installed through the registry

- **ui (34):** all 14 AI primitives (attachment-chip, chat-bubble, code-block, feedback-buttons, markdown-renderer, model-badge, prompt-input, prompt-suggestion, reasoning-block, source-card, streaming-text, thinking-indicator, token-counter, tool-call-card) and alert, alert-dialog, aspect-ratio, button-group, carousel, chart, collapsible, date-picker, drawer, input-group, input-otp, kbd, menubar, navigation-menu, popover, resizable, sidebar, sonner, spinner, visually-hidden.
- **patterns (22):** all 10 AI patterns (ai-error-state, ai-response-card, ai-settings-panel, conversation-starter, conversation-thread, model-selector, prompt-builder, prompt-library, tool-call-sequence, voice-input) and chat-message-list, confirm-dialog, date-range-picker, inline-edit, multi-select, notification-bell, profile-dropdown, search-input, sortable-list, theme-switcher, timeline-feed, upload-progress.
- **blocks (24):** all 9 AI blocks (agent-workspace, ai-assistant-panel, ai-onboarding, ai-settings, ai-usage-dashboard, chat-layout, chat-sidebar, compare-output, prompt-library-page) and app-header, changelog-block, cta-section, error-page, faq-section, features-section, footer-section, landing-hero, logo-cloud, marketing-navbar, pricing-comparison, stats-section, testimonials-section, user-profile-page, waitlist-block.

Docs routes without a registry item are the same set, plus pattern routes for sub-exports or docs-only pages (breadcrumb, contact-form, filter-toolbar, login-form, profile-form, settings-section, signup-form) and the ui route `code-block-ai`, whose name differs from its module. `context-menu` is in the registry but has no docs route.

## Baseline checks

| Check                            | Result                                                                                                                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | pass                                                                                                                                                                                                                                              |
| `validate-registry`              | pass; public 71 valid. Pro 2 valid with "missing registry dependencies" warnings (crm-dashboard, billing-table depend on public items such as `table`, `badge`, `metric-card`, `table-toolbar`; the validator does not resolve across namespaces) |
| `build-registry` + diff          | pass, no drift                                                                                                                                                                                                                                    |
| `pnpm typecheck`                 | pass, 16/16 tasks                                                                                                                                                                                                                                 |
| `pnpm lint`                      | pass, 4/4 tasks, 7 warnings (unused imports in `apps/docs`)                                                                                                                                                                                       |
| `pnpm test`                      | pass, 14/14 tasks; 728 tests: ui 313, patterns 194, blocks 81, cli 44, registry-schema 28, tokens 26, registry-build 19, utils 12, mcp-server 11                                                                                                  |
| `pnpm build`                     | pass, 11/11 tasks                                                                                                                                                                                                                                 |
| `pnpm format:check`              | **fail**: 528 git-tracked files unformatted; `.prettierignore` also does not exclude `.worktrees/`, adding 529 files from a local worktree. CI does not run `format:check`                                                                        |

## Distribution

| Item                                           | Observed                                                                                                                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| npm versions                                   | ui 0.4.0, patterns 0.3.0, blocks 0.3.0, cli 0.1.1, mcp-server 0.1.1, tokens 0.1.1, utils 0.1.1, registry-build 0.0.2, registry-schema 0.0.2, themes 0.0.3, icons 0.0.1 — all match the workspace |
| `https://registry.aether-ui.dev` (CLI default) | **404 on every path** (`/`, `/r/registry.json`, `/r/button.json`); Vercel returns `x-vercel-error: DEPLOYMENT_NOT_FOUND`. DNS resolves, nothing is deployed                                      |
| `https://aether-ui.dev` and `/llms.txt`        | 200                                                                                                                                                                                              |
| Published `@aetherstack/mcp-server@0.1.1`      | bundles 58 registry items; the workspace build bundles 71                                                                                                                                        |
| Root and package `LICENSE` files               | none in the repo root or any package, although public packages declare `"license": "MIT"`                                                                                                        |

## Gap list

Ordered by user impact. Each gap names the backlog task that owns it.

1. **The CLI cannot install anything by default (M0-08).** `aether-ui add` and `list` resolve against `registry.aether-ui.dev`, which has no deployment. Every published CLI user hits 404s unless they pass `--registry`.
2. **80 of 151 component modules are not installable (M0-03).** All 33 AI-native components and 47 others exist in source, are exported from the package barrels and have docs pages, but have no registry item. Docs pages for 87 routes show install instructions that cannot work.
3. **`aether-ui generate` fetches the wrong manifest path (M0-04).** `packages/cli/src/commands/generate.ts` requests `${registryUrl}/registry.json`, while the build emits `/r/registry.json` and `REGISTRY_MANIFEST_PATH` is `/r/registry.json`. The response is also cast without schema validation, contrary to the Zod-at-trust-boundaries rule.
4. **No license files (M0-02).** Packages declare MIT but ship no LICENSE text; the root has none.
5. **Published MCP server is stale (M0-05).** It bundles 58 items against 71 in the workspace, and neither matches the source inventory.
6. **Count claims disagree with each other and with the tree (M0-06).**
   - `README.md` package table: 51 + 14 ui, 29 + 10 patterns, 25 + 9 blocks, and versions "0.1.0" for packages now at 0.4.0 / 0.3.0.
   - `packages/ui/README.md`: "all 65 components"; `apps/docs` installation and introduction pages: "65+ components"; `apps/docs/.../llms/page.tsx`: same breakdown as README.
   - `packages/patterns/README.md` (39) and `packages/blocks/README.md` (34) match source modules but not the registry (17, 10).
   - `CLAUDE.md` phase context: "28 items", "16 UI primitives", "38 UI primitives".
   - The tree has 78 / 39 / 34 modules; the registry has 44 / 17 / 10. Public copy must say which number it means.
7. **Formatting is not enforced (M0-10 / quality gate).** 528 tracked files fail `format:check`, and CI does not run it. Fixing this is a single mechanical commit, but it touches most of the repo and should land separately from functional work.
8. **Validator gaps (M0-03).** `validate-registry` only warns on missing dependencies, has no cycle check, and cannot resolve pro-to-public dependencies. The inventory script covers cycles today; the validator should enforce them.
9. **Lint covers apps only.** Packages have no `lint` script, so turbo lint runs 4 tasks. 7 unused-import warnings in `apps/docs`.
10. **Contributor docs are wrong (M0-09).** `CONTRIBUTING.md` says Node 18+ (engines say >=20) and references root scripts `pnpm validate:registry` / `pnpm build:registry` that do not exist.

## Not covered by this audit

- Clean consuming-project installs (Next.js, Vite) — M0-07.
- Accessibility and visual review of the 80 unregistered components — part of M0-03 when each is registered.
- Ownership of the `aether-ui.dev` Vercel project and DNS — needs the owner; required before M0-08.
