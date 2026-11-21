import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const read = (path) => readFileSync(resolve(root, path), "utf8")

const manifest = JSON.parse(read("packages/cli/package.json"))
const source = read("packages/cli/src/index.ts")
const cliDocs = read("apps/docs/src/app/(docs)/cli/page.tsx")
const installDocs = read("apps/docs/src/app/(docs)/installation/page.tsx")

assert.equal(manifest.name, "@aetherstack/cli")
assert.equal(manifest.bin["aether-ui"], "./dist/index.js")
assert.match(source, /\.version\(cliPackage\.version\)/, "CLI version must come from package metadata")

const commands = [...source.matchAll(/program\.addCommand\((\w+)Command\)/g)].map((match) => match[1])
assert.deepEqual(commands.sort(), ["add", "generate", "init", "list"])
for (const command of commands) {
  assert.ok(cliDocs.includes(`command="aether-ui ${command}`) || cliDocs.includes(`command={'aether-ui ${command}`),
    `Documentation is missing registered CLI command ${command}`)
}

for (const name of ["diff", "update", "remove", "migrate"]) {
  assert.ok(!new RegExp(`command="aether-ui ${name}\\b`).test(cliDocs), `Unimplemented command documented: ${name}`)
}

for (const [file, content] of [
  ["CLI documentation", cliDocs],
  ["installation documentation", installDocs],
]) {
  assert.ok(!/\bnpx\s+aether-ui(?:@|\s|$)/m.test(content), `${file} advertises an unscoped npx package`)
  assert.ok(!/\b(?:npm install -g|pnpm add -g)\s+aether-ui(?:\s|$)/m.test(content),
    `${file} advertises an unscoped global npm package`)
  assert.ok(content.includes("@aetherstack/cli"), `${file} must show the published package name`)
}

console.log(`Public CLI documentation verified: ${commands.join(", ")}; package version ${manifest.version}`)
