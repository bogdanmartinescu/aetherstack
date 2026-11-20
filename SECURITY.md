# Security Policy

## Supported versions

Security fixes are applied to the current published `@aetherstack/*` packages on npm and to the
`main` branch of this repository. Older published versions may not receive backports unless a
maintainer explicitly commits to them.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security reports.

Email the maintainer at the address on the GitHub profile that owns this repository, with:

- A description of the issue and its impact
- Steps to reproduce (PoC if available)
- Affected package name and version, CLI command, or registry URL when relevant

You should receive an acknowledgement within a few business days. We will coordinate disclosure
timing after a fix is available or after we agree the report is not actionable.

## Scope notes for this project

In scope examples:

- Path traversal or overwrite bugs in `aether-ui` install/update paths
- Registry manifest/schema validation bypasses that lead to unexpected file writes
- Credential or secret leakage in CI workflows or published packages
- XSS or unsafe HTML sinks in shipped UI that execute untrusted content by default

Out of scope examples:

- Issues that require a malicious local project the user already trusts
- Vulnerabilities only present when consuming untrusted registry URLs the user explicitly configured
- Dependency CVEs with no demonstrated impact on Aetherstack packages (report upstream when possible)

## Hardening expectations

CLI and MCP tooling must treat registry content as **data**, validate at trust boundaries, confine
writes to the project root, and prefer dry-run/read-only defaults for discovery commands. See
[`AGENTS.md`](AGENTS.md) and [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md).
