#!/usr/bin/env node
/**
 * Bumps the patch segment of `version` in the root package.json.
 * Invoked automatically by the pre-commit git hook.
 *
 * Individual package versions are managed via changesets (Phase 9).
 * This script keeps a monotonically-increasing workspace build counter.
 */
const fs = require("fs")
const path = require("path")

const rootPkg = path.resolve(__dirname, "../package.json")
const pkg = JSON.parse(fs.readFileSync(rootPkg, "utf8"))

const [major, minor, patch] = pkg.version.split(".").map(Number)
pkg.version = `${major}.${minor}.${patch + 1}`

fs.writeFileSync(rootPkg, JSON.stringify(pkg, null, 2) + "\n")
process.stdout.write(`version → ${pkg.version}\n`)
