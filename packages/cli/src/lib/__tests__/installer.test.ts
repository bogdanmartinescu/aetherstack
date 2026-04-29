import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { RegistryItem } from "@aetherstack/registry-schema"
import type { AetherConfig } from "../../config"
import { installItem, getConflictingFiles } from "../installer"

const CONFIG: AetherConfig = {
  registry: "https://registry.example.com",
  aliases: {
    components: "src/components/ui",
    utils: "src/lib",
  },
}

let cwd: string

beforeEach(() => {
  cwd = mkdtempSync(resolve(tmpdir(), "aether-cli-installer-"))
})

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true })
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const inlineItem = (overrides: Partial<RegistryItem> = {}): RegistryItem => ({
  name: "button",
  type: "registry:ui",
  title: "Button",
  author: "aetherstack",
  files: [
    {
      path: "button.tsx",
      type: "registry:ui",
      target: "components/ui/button.tsx",
      content: "export const Button = () => null\n",
    },
  ],
  ...overrides,
})

describe("installItem", () => {
  it("writes inline file content to the target path", async () => {
    const result = await installItem(inlineItem(), CONFIG, cwd)

    const written = resolve(cwd, "components/ui/button.tsx")
    expect(existsSync(written)).toBe(true)
    expect(readFileSync(written, "utf-8")).toContain("Button")
    expect(result.filesWritten).toEqual(["components/ui/button.tsx"])
  })

  it("respects file.target when set", async () => {
    await installItem(
      inlineItem({
        files: [
          {
            path: "anything.tsx",
            type: "registry:ui",
            target: "src/custom/elsewhere.tsx",
            content: "x",
          },
        ],
      }),
      CONFIG,
      cwd,
    )

    expect(existsSync(resolve(cwd, "src/custom/elsewhere.tsx"))).toBe(true)
  })

  it("places registry:ui files under aliases.components when no target is set", async () => {
    await installItem(
      inlineItem({
        files: [
          { path: "card.tsx", type: "registry:ui", content: "x" },
        ],
      }),
      CONFIG,
      cwd,
    )

    expect(existsSync(resolve(cwd, "src/components/ui/card.tsx"))).toBe(true)
  })

  it("places registry:util files under aliases.utils when no target is set", async () => {
    await installItem(
      inlineItem({
        name: "cn",
        files: [{ path: "cn.ts", type: "registry:util", content: "export const cn = () => ''" }],
      }),
      CONFIG,
      cwd,
    )

    expect(existsSync(resolve(cwd, "src/lib/cn.ts"))).toBe(true)
  })

  it("creates intermediate directories", async () => {
    await installItem(
      inlineItem({
        files: [
          {
            path: "deep.tsx",
            type: "registry:ui",
            target: "deeply/nested/folder/deep.tsx",
            content: "x",
          },
        ],
      }),
      CONFIG,
      cwd,
    )

    expect(existsSync(resolve(cwd, "deeply/nested/folder/deep.tsx"))).toBe(true)
  })

  it("throws when target file exists and overwrite is false", async () => {
    const target = resolve(cwd, "components/ui/button.tsx")
    mkdirSync(resolve(cwd, "components/ui"), { recursive: true })
    writeFileSync(target, "existing content")

    await expect(installItem(inlineItem(), CONFIG, cwd)).rejects.toThrow(
      /already exists/,
    )
  })

  it("overwrites when overwrite is true", async () => {
    const target = resolve(cwd, "components/ui/button.tsx")
    mkdirSync(resolve(cwd, "components/ui"), { recursive: true })
    writeFileSync(target, "old content")

    await installItem(inlineItem(), CONFIG, cwd, { overwrite: true })
    expect(readFileSync(target, "utf-8")).toContain("Button")
  })

  it("returns dependency metadata", async () => {
    const result = await installItem(
      inlineItem({
        dependencies: ["lucide-react"],
        devDependencies: ["@types/node"],
        registryDependencies: ["card"],
      }),
      CONFIG,
      cwd,
    )

    expect(result.dependencies).toEqual(["lucide-react"])
    expect(result.devDependencies).toEqual(["@types/node"])
    expect(result.registryDependencies).toEqual(["card"])
  })

  it("fetches file content over HTTP when not inlined", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("export const Card = () => null\n", { status: 200 }),
      ),
    )

    const item: RegistryItem = inlineItem({
      files: [
        {
          path: "card.tsx",
          type: "registry:ui",
          target: "components/ui/card.tsx",
        },
      ],
    })

    await installItem(item, CONFIG, cwd, { baseUrl: "https://registry.example.com" })

    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "https://registry.example.com/r/card.tsx",
      expect.any(Object),
    )
    expect(readFileSync(resolve(cwd, "components/ui/card.tsx"), "utf-8")).toContain(
      "Card",
    )
  })

  it("throws when no inline content and no baseUrl", async () => {
    const item: RegistryItem = inlineItem({
      files: [{ path: "card.tsx", type: "registry:ui", target: "ui/card.tsx" }],
    })

    await expect(installItem(item, CONFIG, cwd)).rejects.toThrow(
      /No inline content/,
    )
  })

  it("propagates errors when remote fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("err", { status: 500, statusText: "Internal Server Error" }),
      ),
    )

    const item: RegistryItem = inlineItem({
      files: [{ path: "card.tsx", type: "registry:ui", target: "ui/card.tsx" }],
    })

    await expect(
      installItem(item, CONFIG, cwd, { baseUrl: "https://registry.example.com" }),
    ).rejects.toThrow(/Failed to fetch/)
  })
})

describe("getConflictingFiles", () => {
  it("returns paths that already exist", () => {
    mkdirSync(resolve(cwd, "components/ui"), { recursive: true })
    writeFileSync(resolve(cwd, "components/ui/button.tsx"), "")

    const conflicts = getConflictingFiles(inlineItem(), CONFIG, cwd)
    expect(conflicts).toEqual(["components/ui/button.tsx"])
  })

  it("returns empty when no conflicts", () => {
    expect(getConflictingFiles(inlineItem(), CONFIG, cwd)).toEqual([])
  })
})
