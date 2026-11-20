import { isAbsolute, normalize, relative, resolve, sep } from "node:path"

/**
 * Resolves `candidate` against `cwd` and asserts the result stays inside the
 * project root. Rejects absolute paths, `..` escapes, and null bytes.
 */
export function resolveInsideProject(cwd: string, candidate: string): string {
  if (candidate.includes("\0")) {
    throw new Error(`Invalid path (null byte): ${candidate}`)
  }

  if (isAbsolute(candidate)) {
    throw new Error(`Refusing absolute install path: ${candidate}`)
  }

  const root = resolve(cwd)
  const absolute = resolve(root, candidate)
  const rel = relative(root, absolute)

  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`Refusing to write outside project root: ${candidate}`)
  }

  return absolute
}

/**
 * Validates a registry-relative content path used in fetch URLs.
 * Rejects traversal, absolute paths, and backslashes.
 */
export function assertSafeRegistryFilePath(filePath: string): string {
  if (!filePath || filePath.includes("\0")) {
    throw new Error(`Invalid registry file path: ${filePath}`)
  }

  const normalized = normalize(filePath).replace(/\\/g, "/")

  if (
    isAbsolute(normalized) ||
    normalized.startsWith("../") ||
    normalized === ".." ||
    normalized.includes("/../") ||
    normalized.startsWith("/")
  ) {
    throw new Error(`Unsafe registry file path: ${filePath}`)
  }

  return normalized
}

/** True when `absolutePath` is the project root or a descendant of it. */
export function isInsideProject(cwd: string, absolutePath: string): boolean {
  const root = resolve(cwd)
  const target = resolve(absolutePath)
  if (target === root) return true
  return target.startsWith(root + sep)
}
