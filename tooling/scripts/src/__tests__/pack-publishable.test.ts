import { describe, expect, it } from "vitest"
import { toPublishManifest, type PackageManifest } from "../lib/pack-publishable"

describe("toPublishManifest", () => {
  it("applies publishConfig and rewrites workspace dependencies", () => {
    const pkg: PackageManifest = {
      name: "@aetherstack/ui",
      version: "0.4.0",
      main: "./src/index.ts",
      types: "./src/index.ts",
      exports: { ".": "./src/index.ts" },
      dependencies: {
        "@aetherstack/utils": "workspace:*",
        clsx: "^2.1.1",
      },
      devDependencies: {
        typescript: "^5.4.5",
      },
      publishConfig: {
        main: "./dist/index.js",
        module: "./dist/index.mjs",
        types: "./dist/index.d.ts",
        exports: {
          ".": {
            import: "./dist/index.mjs",
            require: "./dist/index.js",
            types: "./dist/index.d.ts",
          },
        },
      },
    }

    const versions = new Map([["@aetherstack/utils", "0.1.1"]])
    const published = toPublishManifest(pkg, versions)

    expect(published.main).toBe("./dist/index.js")
    expect(published.module).toBe("./dist/index.mjs")
    expect(published.types).toBe("./dist/index.d.ts")
    expect(published.publishConfig).toBeUndefined()
    expect(published.devDependencies).toBeUndefined()
    expect(published.dependencies?.["@aetherstack/utils"]).toBe("0.1.1")
    expect(published.dependencies?.clsx).toBe("^2.1.1")
  })

  it("throws when a workspace dependency has no version mapping", () => {
    const pkg: PackageManifest = {
      name: "@aetherstack/ui",
      version: "0.4.0",
      dependencies: { "@aetherstack/utils": "workspace:*" },
    }
    expect(() => toPublishManifest(pkg, new Map())).toThrow(/no version map/)
  })
})
