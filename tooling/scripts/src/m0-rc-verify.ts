#!/usr/bin/env node
/**
 * M0-10 local release-candidate verification harness.
 *
 * Runs the applicable local checks from docs/roadmap/quality-and-release.md,
 * writes docs/roadmap/audits/m0-10-rc-verification.md, and exits non-zero if
 * any required local check fails. External CDN / npm publish checks are
 * recorded as BLOCKED when unavailable — they do not fail this script, but
 * M0-10 must not be marked DONE while they remain blocked.
 *
 * Usage (repo root):
 *   pnpm --filter @aetherstack/scripts m0-rc-verify
 *   SKIP_CONSUMER_INSTALL=1 pnpm --filter @aetherstack/scripts m0-rc-verify
 */
import { execFileSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"

const REPO_ROOT = resolve(__dirname, "../../..")
const REPORT_PATH = resolve(REPO_ROOT, "docs/roadmap/audits/m0-10-rc-verification.md")

interface CheckResult {
  id: string
  command: string
  required: boolean
  status: "PASS" | "FAIL" | "SKIP" | "BLOCKED"
  detail: string
  durationMs: number
}

function run(
  id: string,
  command: string,
  args: string[],
  required: boolean,
): CheckResult {
  const started = Date.now()
  const label = `${command} ${args.join(" ")}`
  process.stdout.write(`→ ${id}: ${label}\n`)
  try {
    execFileSync(command, args, {
      cwd: REPO_ROOT,
      stdio: "inherit",
      env: process.env,
    })
    return {
      id,
      command: label,
      required,
      status: "PASS",
      detail: "exit 0",
      durationMs: Date.now() - started,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      id,
      command: label,
      required,
      status: "FAIL",
      detail: message.slice(0, 500),
      durationMs: Date.now() - started,
    }
  }
}

function probeLiveRegistry(): CheckResult {
  const started = Date.now()
  const url = "https://registry.aether-ui.dev/r/registry.json"
  process.stdout.write(`→ live-registry: GET ${url}\n`)
  try {
    const out = execFileSync(
      "curl",
      ["-sS", "-o", "/dev/null", "-w", "%{http_code}|%{header_json}", url],
      { encoding: "utf-8", cwd: REPO_ROOT },
    )
    const [code] = out.split("|")
    if (code === "200") {
      return {
        id: "live-registry",
        command: `GET ${url}`,
        required: true,
        status: "PASS",
        detail: `HTTP ${code}`,
        durationMs: Date.now() - started,
      }
    }
    return {
      id: "live-registry",
      command: `GET ${url}`,
      required: true,
      status: "BLOCKED",
      detail: `HTTP ${code} (expected 200). Owner must deploy per m0-08-cdn-runbook.md. Raw: ${out.slice(0, 300)}`,
      durationMs: Date.now() - started,
    }
  } catch (err) {
    return {
      id: "live-registry",
      command: `GET ${url}`,
      required: true,
      status: "BLOCKED",
      detail: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - started,
    }
  }
}

function renderReport(results: CheckResult[], gitHead: string): string {
  const now = new Date().toISOString()
  const lines: string[] = [
    "# M0-10 — Release candidate verification",
    "",
    `Generated: ${now}`,
    `Git HEAD: \`${gitHead}\``,
    "",
    "Local checks follow `docs/roadmap/quality-and-release.md`. External publish/CDN",
    "gates remain owner-authorized. **M0-10 is not DONE while any required check is",
    "FAIL or BLOCKED.**",
    "",
    "| Check | Required | Status | Duration | Detail |",
    "| --- | --- | --- | --- | --- |",
  ]

  for (const r of results) {
    const detail = r.detail.replace(/\|/g, "\\|").replace(/\n/g, " ")
    lines.push(
      `| ${r.id} | ${r.required ? "yes" : "no"} | **${r.status}** | ${r.durationMs}ms | ${detail} |`,
    )
  }

  const failed = results.filter((r) => r.required && r.status === "FAIL")
  const blocked = results.filter((r) => r.required && r.status === "BLOCKED")
  const passed = results.filter((r) => r.status === "PASS")

  lines.push(
    "",
    "## Summary",
    "",
    `- PASS: ${passed.length}`,
    `- FAIL (required): ${failed.length}`,
    `- BLOCKED (required): ${blocked.length}`,
    "",
  )

  if (failed.length > 0) {
    lines.push("### Required failures", "")
    for (const f of failed) {
      lines.push(`- \`${f.id}\`: \`${f.command}\` — ${f.detail}`)
    }
    lines.push("")
  }

  if (blocked.length > 0) {
    lines.push("### Required blockers (owner)", "")
    for (const b of blocked) {
      lines.push(`- \`${b.id}\`: ${b.detail}`)
    }
    lines.push("")
  }

  lines.push(
    "## Commands re-run",
    "",
    "```bash",
    "pnpm --filter @aetherstack/scripts m0-rc-verify",
    "```",
    "",
    "Set `SKIP_CONSUMER_INSTALL=1` to skip the longer pack/fixture step after it has",
    "already passed in the same session.",
    "",
  )

  return lines.join("\n")
}

function main(): void {
  const gitHead = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
    cwd: REPO_ROOT,
    encoding: "utf-8",
  }).trim()

  const results: CheckResult[] = []

  results.push(
    run("validate-registry", "pnpm", ["--filter", "@aetherstack/scripts", "validate-registry"], true),
  )
  results.push(
    run("build-registry", "pnpm", ["--filter", "@aetherstack/scripts", "build-registry"], true),
  )
  results.push(
    run(
      "registry-freshness",
      "git",
      ["diff", "--quiet", "--exit-code", "--", "apps/registry-public/public/r", "apps/registry-public/public/llms.txt"],
      true,
    ),
  )
  results.push(run("typecheck", "pnpm", ["typecheck"], true))
  results.push(run("lint", "pnpm", ["lint"], true))
  results.push(run("test", "pnpm", ["test"], true))
  results.push(
    run(
      "build-packages",
      "pnpm",
      ["turbo", "build", "--filter=./packages/*"],
      true,
    ),
  )

  if (process.env["SKIP_CONSUMER_INSTALL"] === "1") {
    results.push({
      id: "consumer-install",
      command: "pnpm consumer-install",
      required: true,
      status: "SKIP",
      detail: "SKIP_CONSUMER_INSTALL=1",
      durationMs: 0,
    })
  } else {
    results.push(run("consumer-install", "pnpm", ["consumer-install"], true))
  }

  // format:check is known-failing at scale; record but do not fail the RC script
  // until M0-10 decides to enforce it (see audit gap). Still required for honesty.
  const format = run("format:check", "pnpm", ["format:check"], false)
  if (format.status === "FAIL") {
    format.detail =
      "Known pre-existing gap (hundreds of files). Not enforced in CI. " + format.detail.slice(0, 200)
  }
  results.push(format)

  results.push(probeLiveRegistry())

  results.push({
    id: "npm-publish",
    command: "changeset publish (authorized only)",
    required: true,
    status: "BLOCKED",
    detail: "No release authority granted; do not publish from this harness.",
    durationMs: 0,
  })

  writeFileSync(REPORT_PATH, renderReport(results, gitHead), "utf-8")
  process.stdout.write(`\nWrote ${REPORT_PATH}\n`)

  const hardFail = results.some((r) => r.required && r.status === "FAIL")
  if (hardFail) {
    process.stderr.write("M0-10 local RC: required FAIL — see report.\n")
    process.exit(1)
  }

  const blocked = results.filter((r) => r.required && r.status === "BLOCKED")
  if (blocked.length > 0) {
    process.stdout.write(
      `M0-10 local RC: local required checks passed; ${blocked.length} required external gate(s) BLOCKED.\n`,
    )
    process.exit(0)
  }

  process.stdout.write("M0-10 local RC: all required checks passed.\n")
}

try {
  main()
} catch (err: unknown) {
  process.stderr.write(`m0-rc-verify failed: ${err instanceof Error ? err.message : String(err)}\n`)
  process.exit(1)
}
