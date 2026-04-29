import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { loadConfig, writeConfig, requireConfig } from "../config"
import {
  CONFIG_FILE_NAME,
  DEFAULT_COMPONENTS_DIR,
  DEFAULT_UTILS_DIR,
  DEFAULT_REGISTRY_URL,
} from "../constants"

let cwd: string

beforeEach(() => {
  cwd = mkdtempSync(resolve(tmpdir(), "aether-cli-config-"))
})

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true })
})

describe("loadConfig", () => {
  it("returns null when no config file exists", () => {
    expect(loadConfig(cwd)).toBeNull()
  })

  it("parses a valid config file", () => {
    writeFileSync(
      resolve(cwd, CONFIG_FILE_NAME),
      JSON.stringify({
        registry: "https://example.com",
        aliases: { components: "src/ui", utils: "src/utils" },
      }),
    )

    const config = loadConfig(cwd)
    expect(config).not.toBeNull()
    expect(config?.registry).toBe("https://example.com")
    expect(config?.aliases.components).toBe("src/ui")
    expect(config?.aliases.utils).toBe("src/utils")
  })

  it("applies defaults for missing optional fields", () => {
    writeFileSync(
      resolve(cwd, CONFIG_FILE_NAME),
      JSON.stringify({ registry: "https://example.com" }),
    )

    const config = loadConfig(cwd)
    expect(config?.aliases.components).toBe(DEFAULT_COMPONENTS_DIR)
    expect(config?.aliases.utils).toBe(DEFAULT_UTILS_DIR)
  })

  it("throws when registry URL is invalid", () => {
    writeFileSync(
      resolve(cwd, CONFIG_FILE_NAME),
      JSON.stringify({ registry: "not-a-url" }),
    )

    expect(() => loadConfig(cwd)).toThrow(/Failed to parse aether\.json/)
  })

  it("throws when JSON is malformed", () => {
    writeFileSync(resolve(cwd, CONFIG_FILE_NAME), "{ not valid json")
    expect(() => loadConfig(cwd)).toThrow(/Failed to parse aether\.json/)
  })
})

describe("writeConfig", () => {
  it("writes a config with $schema URL derived from registry", () => {
    writeConfig(
      {
        registry: "https://registry.example.com",
        aliases: { components: "src/components/ui", utils: "src/lib" },
      },
      cwd,
    )

    const written = loadConfig(cwd)
    expect(written?.registry).toBe("https://registry.example.com")

    const raw = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("node:fs").readFileSync(resolve(cwd, CONFIG_FILE_NAME), "utf-8"),
    )
    expect(raw.$schema).toBe("https://registry.example.com/schema.json")
  })
})

describe("requireConfig", () => {
  it("returns the config when present", () => {
    writeConfig(
      {
        registry: DEFAULT_REGISTRY_URL,
        aliases: { components: DEFAULT_COMPONENTS_DIR, utils: DEFAULT_UTILS_DIR },
      },
      cwd,
    )
    expect(requireConfig(cwd).registry).toBe(DEFAULT_REGISTRY_URL)
  })

  it("throws a helpful error when no config exists", () => {
    expect(() => requireConfig(cwd)).toThrow(/No aether\.json found/)
  })
})
