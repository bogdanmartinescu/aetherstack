import { describe, expect, it } from "vitest"
import { resolve } from "node:path"
import { assertSafeRegistryFilePath, isInsideProject, resolveInsideProject } from "../paths"

const CWD = resolve("/tmp/aether-project")

describe("resolveInsideProject", () => {
  it("resolves a relative path under the project root", () => {
    expect(resolveInsideProject(CWD, "src/components/ui/button.tsx")).toBe(
      resolve(CWD, "src/components/ui/button.tsx"),
    )
  })

  it("rejects absolute paths", () => {
    expect(() => resolveInsideProject(CWD, "/etc/passwd")).toThrow(/absolute/i)
  })

  it("rejects parent-directory traversal", () => {
    expect(() => resolveInsideProject(CWD, "../secrets.txt")).toThrow(/outside project/i)
    expect(() => resolveInsideProject(CWD, "src/../../outside.tsx")).toThrow(/outside project/i)
  })

  it("rejects null bytes", () => {
    expect(() => resolveInsideProject(CWD, "src/\0evil.tsx")).toThrow(/null byte/i)
  })
})

describe("assertSafeRegistryFilePath", () => {
  it("accepts simple relative paths", () => {
    expect(assertSafeRegistryFilePath("button.tsx")).toBe("button.tsx")
    expect(assertSafeRegistryFilePath("ui/button.tsx")).toBe("ui/button.tsx")
  })

  it("rejects traversal and absolute paths", () => {
    expect(() => assertSafeRegistryFilePath("../secret.tsx")).toThrow(/Unsafe/)
    expect(() => assertSafeRegistryFilePath("/etc/passwd")).toThrow(/Unsafe/)
    expect(() => assertSafeRegistryFilePath("foo/../../bar.tsx")).toThrow(/Unsafe/)
  })
})

describe("isInsideProject", () => {
  it("returns true for the root and descendants", () => {
    expect(isInsideProject(CWD, CWD)).toBe(true)
    expect(isInsideProject(CWD, resolve(CWD, "a/b.ts"))).toBe(true)
  })

  it("returns false outside the root", () => {
    expect(isInsideProject(CWD, resolve(CWD, "..", "other"))).toBe(false)
  })
})
