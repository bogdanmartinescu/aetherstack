# M0-02 — License provenance and MIT consistency

- Audited commit: branch `chore/m0-02-licenses` based on M0-01 `ebabd81`.
- Date: 2026-11-20.
- Scope: root and package license declarations, presence of LICENSE text in published artifacts, third-party / asset provenance, and copyright holder for the MIT notice.

## Policy (proposed and applied)

Public Aetherstack / Aether UI Core remains **MIT**, free for personal and commercial use. This matches:

- every publishable package's existing `"license": "MIT"` field,
- [GOAL.md](../../../GOAL.md) and [platform-strategy.md](../../product/platform-strategy.md),
- no evidence of a prior non-MIT grant that would require relicensing.

This change **does not relicense** anything. It supplies the missing LICENSE text that the packages already claimed.

**Copyright holder** used in the MIT notice: `Bogdan Martinescu`, year `2026`.

Evidence:

- Sole human git author across the history (`git shortlog -sn`): Bogdan Martinescu.
- First commit 2026-04-18; all work in calendar year 2026.
- No `author` field on packages; no prior COPYRIGHT or NOTICE file naming a different holder.
- If the owner later wants an entity name (for example a company), replace the copyright line in every `LICENSE` file in one mechanical pass. Do not invent a different holder without an owner decision.

## Before / after

| Location                              | Before            | After                                                              |
| ------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Root `LICENSE`                        | missing           | MIT, Copyright (c) 2026 Bogdan Martinescu                          |
| Root `package.json` `license`         | missing           | `MIT`                                                              |
| `packages/*` `license` field          | `MIT` on all 14   | unchanged                                                          |
| `packages/*/LICENSE`                  | missing on all 14 | identical MIT text                                                 |
| `packages/*/package.json` `files`     | omitted `LICENSE` | includes `LICENSE` so `npm pack` ships it                          |
| `apps/*`, `tooling/scripts` `license` | missing           | `MIT` (private packages; no separate LICENSE required for publish) |

## Third-party and asset provenance

| Class                                                               | Finding                                                                                                                                             | Action                                                                                                                            |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| npm runtime dependencies (Radix, cmdk, recharts, zod, commander, …) | Consumed as packages; their licenses remain theirs. No vendored copies of those package trees in source.                                            | None beyond normal npm license compliance at install time.                                                                        |
| UI source style                                                     | Components are Aetherstack TypeScript/React. They import Radix / lucide / cva; they do not embed foreign SPDX headers or third-party LICENSE blobs. | Keep writing original wrappers; do not paste upstream LICENSE text into component files.                                          |
| Icons (`packages/icons`)                                            | Four original React SVG marks under `src/aether/`. No third-party icon pack LICENSE.                                                                | Covered by the package MIT LICENSE.                                                                                               |
| Fonts                                                               | Apps load Google fonts through `next/font/google` (Inter, JetBrains Mono, and docs-specific faces). No font binaries are checked into the repo.     | Font licenses are those of the served faces; not part of the npm package tarballs.                                                |
| Registry Pro (`registry/pro`)                                       | Two sample Pro blocks live in this MIT monorepo today. Strategy says future paid kits are separate.                                                 | Still MIT while they remain here. Extracting them to a proprietary tree is an M4 concern, not a silent license flip in this repo. |
| Generated registry / docs                                           | Built from source under the same MIT terms.                                                                                                         | No extra notice file.                                                                                                             |

No `NOTICE`, `COPYING`, or third-party LICENSE files were found under `packages/`, `apps/`, or `tooling/` (excluding `node_modules` and build outputs).

## Consistency checks run

```bash
# Every publishable package declares MIT and ships LICENSE in its pack list
node -e '
const fs = require("fs"); const path = require("path");
for (const dir of fs.readdirSync("packages")) {
  const pkgPath = path.join("packages", dir, "package.json");
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const licenseFile = fs.existsSync(path.join("packages", dir, "LICENSE"));
  const inFiles = Array.isArray(pkg.files) ? pkg.files.includes("LICENSE") : true;
  console.log(pkg.name, "license="+pkg.license, "LICENSE="+licenseFile, "filesHasLicense="+inFiles);
}
'

# Sample pack includes LICENSE
pnpm --filter @aetherstack/utils exec npm pack --dry-run
```

Expected: each package prints `license=MIT LICENSE=true filesHasLicense=true`, and the dry-run pack listing for utils includes `LICENSE`.

## Open items (not blockers for M0-02)

- Owner may rename the copyright line to a legal entity; track as a one-line follow-up if needed.
- M0-09 will cover contribution / security / governance docs that should point at this LICENSE.
- M4 must not move already-MIT files behind a paid license; new proprietary material belongs in a separate repository.

## Acceptance

- [x] Provenance report checked in (this file).
- [x] Root and package LICENSE text present and identical MIT.
- [x] Published packages include LICENSE in `files` so the tarball carries it.
- [x] No retroactive relicensing; declarations already said MIT.
- [x] Copyright holder taken from sole git authorship; entity rename left as an optional owner edit.
