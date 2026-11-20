import { readFileSync } from "node:fs"
import { resolve } from "node:path"

/**
 * Package version for MCP handshake metadata.
 * Reads adjacent package.json so published artifacts stay in sync without
 * hardcoding a second version string.
 */
export function getPackageVersion(): string {
  try {
    const pkgPath = resolve(__dirname, "..", "package.json")
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as { version?: string }
    if (typeof pkg.version === "string" && pkg.version.length > 0) {
      return pkg.version
    }
  } catch {
    // fall through
  }
  return "0.0.0"
}
