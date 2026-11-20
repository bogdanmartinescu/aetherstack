# M0-10 — Release candidate verification

Generated: 2026-11-20T21:23:15.250Z
Git HEAD: `eb3628c`

Local checks follow `docs/roadmap/quality-and-release.md`. External publish/CDN
gates remain owner-authorized. **M0-10 is not DONE while any required check is
FAIL or BLOCKED.**

| Check              | Required | Status      | Duration | Detail                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate-registry  | yes      | **PASS**    | 1027ms   | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| build-registry     | yes      | **PASS**    | 1063ms   | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| registry-freshness | yes      | **PASS**    | 54ms     | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| typecheck          | yes      | **PASS**    | 22634ms  | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| lint               | yes      | **PASS**    | 893ms    | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| test               | yes      | **PASS**    | 2011ms   | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| build-packages     | yes      | **PASS**    | 897ms    | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| consumer-install   | yes      | **PASS**    | 50853ms  | exit 0                                                                                                                                                                                                                                                                                                                                                                                  |
| format:check       | no       | **FAIL**    | 13646ms  | Known pre-existing gap (hundreds of files). Not enforced in CI. Command failed: pnpm format:check                                                                                                                                                                                                                                                                                       |
| live-registry      | yes      | **BLOCKED** | 146ms    | HTTP 404 (expected 200). Owner must deploy per m0-08-cdn-runbook.md. Raw: 404\|{"cache-control":["public, max-age=0, must-revalidate"], "content-type":["text/plain; charset=utf-8"], "date":["Fri, 20 Nov 2026 21:23:15 GMT"], "server":["Vercel"], "strict-transport-security":["max-age=63072000"], "x-vercel-error":["DEPLOYMENT_NOT_FOUND"], "x-vercel-id":["fra1::tl9mt-179520979 |
| npm-publish        | yes      | **BLOCKED** | 0ms      | No release authority granted; do not publish from this harness.                                                                                                                                                                                                                                                                                                                         |

## Summary

- PASS: 8
- FAIL (required): 0
- BLOCKED (required): 2

### Required blockers (owner)

- `live-registry`: HTTP 404 (expected 200). Owner must deploy per m0-08-cdn-runbook.md. Raw: 404|{"cache-control":["public, max-age=0, must-revalidate"],
  "content-type":["text/plain; charset=utf-8"],
  "date":["Fri, 20 Nov 2026 21:23:15 GMT"],
  "server":["Vercel"],
  "strict-transport-security":["max-age=63072000"],
  "x-vercel-error":["DEPLOYMENT_NOT_FOUND"],
  "x-vercel-id":["fra1::tl9mt-179520979
- `npm-publish`: No release authority granted; do not publish from this harness.

## Commands re-run

```bash
pnpm --filter @aetherstack/scripts m0-rc-verify
```

Set `SKIP_CONSUMER_INSTALL=1` to skip the longer pack/fixture step after it has
already passed in the same session.
