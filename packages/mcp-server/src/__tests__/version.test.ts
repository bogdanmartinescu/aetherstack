import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { getPackageVersion } from "../version"

describe("getPackageVersion", () => {
  it("matches packages/mcp-server/package.json", () => {
    const pkg = JSON.parse(readFileSync(resolve(__dirname, "../../package.json"), "utf-8")) as {
      version: string
    }
    expect(getPackageVersion()).toBe(pkg.version)
  })
})
