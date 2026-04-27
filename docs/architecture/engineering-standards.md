# Engineering Standards

This document defines the coding, architecture, and maintainability standards for Aetherstack.

These rules apply to all packages and apps unless a documented exception exists.

## Goals

We optimize for:

- correctness
- maintainability
- consistency
- installability
- clarity
- product-quality developer experience

Aetherstack is intended to become a serious commercial design-system and registry product. Code should reflect that standard.

---

## Core Principles

1. Prefer simple, explicit solutions over clever abstractions.
2. Keep package boundaries clean.
3. Design APIs deliberately and consistently.
4. Avoid duplication, but do not abstract prematurely.
5. Use strict typing at all important boundaries.
6. Make public-facing code production-quality.
7. Treat docs and examples as part of the product.

---

## Monorepo Architecture Rules

Aetherstack is organized into four primary layers:

1. Tokens
2. Primitives
3. Patterns
4. Blocks

### Dependency rules

- `tokens` must not depend on `ui`, `patterns`, or `blocks`
- `ui` may depend on `tokens` and `utils`
- `patterns` may depend on `ui`, `tokens`, and `utils`
- `blocks` may depend on `patterns`, `ui`, `tokens`, and `utils`
- `themes` should extend token usage, not fork shared logic
- `registry-*` packages should not own UI behavior
- apps may consume shared packages but should not reimplement shared logic that belongs in packages

### Boundary discipline

- Do not place product-specific compositions in `ui`
- Do not place primitive logic in `blocks`
- Do not copy component logic between packages
- If functionality is reused across multiple consumers, move it to the lowest appropriate layer

---

## TypeScript Standards

### General

- TypeScript must be strict
- Avoid `any`
- Avoid `as any`
- Avoid unsafe casts unless there is no practical alternative
- Prefer inferred local types and explicit exported types
- Public functions, exported components, and shared utilities should have explicit signatures where useful

### Preferred patterns

- Use discriminated unions for variant-heavy state models
- Use `readonly` where it improves intent for immutable structures
- Use `zod` or equivalent validation at external or registry boundaries
- Prefer narrow types over broad permissive types
- Model invalid states out of the type system where practical

### Avoid

- giant generic utility types that reduce readability
- overcomplicated conditional typing without strong payoff
- leaking internal implementation types into public package APIs

---

## React / Next.js Standards

### Component design

- Components should be small, focused, and composable
- Prefer composition over prop explosion
- Avoid deeply nested boolean prop APIs
- Prefer expressive subcomponents or pattern wrappers when complexity grows
- Default to server components in app code where appropriate
- Use `"use client"` only when actually needed

### Hooks

- Keep custom hooks focused on one concern
- Name hooks clearly
- Do not hide significant side effects in generic-looking hooks
- Avoid hooks that return ambiguous bags of state unless the shape is well-documented

### State

- Keep local UI state local unless shared state is necessary
- Avoid unnecessary global state
- Prefer controlled/uncontrolled APIs deliberately and document behavior
- Derived state should usually be computed, not duplicated

### File size guidance

These are guidelines, not rigid limits:

- utility modules: keep concise
- components: prefer under ~250 lines
- complex pattern/block files: split when responsibility becomes unclear
- avoid “god files” that mix rendering, logic, styles, and transformations without structure

---

## API Design Standards

### Naming

- Use clear, boring names
- Prioritize predictability over originality
- Similar components should use similar prop names
- Variant names must be consistent across the system where possible

### Variants

If a variant system is used:

- keep variant names predictable
- avoid visual one-offs becoming first-class variants too early
- do not introduce inconsistent size names across similar components
- favor a small set of durable variants

### Public API stability

- Think carefully before exporting new utilities
- Avoid exposing unstable internals
- Prefer adding capabilities through composition before expanding the public API surface
- Once a public API is documented, treat changes as deliberate

---

## Styling Standards

### Token-first styling

- Do not hardcode colors, spacing, radii, shadows, or typography values where tokens should be used
- Prefer semantic tokens over raw visual values
- Themeability must be preserved

### Class composition

- Keep class composition readable
- Avoid unreadable class piles with no grouping or structure
- Use shared helpers consistently
- Do not create local stylistic conventions that conflict with the system

### Theming

- New styles should align with the token model
- Do not implement one-off themes by bypassing tokens
- Dark mode should remain structurally supported even if not the immediate focus of a task

---

## Accessibility Standards

Accessibility is required, not optional.

### Minimum expectations

- keyboard interaction must work correctly
- focus states must be preserved
- ARIA should be used appropriately, not excessively
- semantic HTML should be preferred whenever possible
- dialogs, menus, popovers, and other interactive patterns must respect accessibility expectations
- color contrast should be considered in token/theme work

### Avoid

- clickable non-button elements without strong reason
- missing labels for form controls
- inaccessible icon-only actions
- hiding focus styles without replacement

---

## Testing Standards

### What to test

Prioritize tests for:

- shared utilities
- token transformations
- registry schema validation
- install/build tooling
- non-trivial component behavior
- complex pattern logic

### Testing philosophy

- test meaningful behavior, not implementation trivia
- avoid brittle snapshot-heavy approaches as the primary strategy
- prefer focused unit tests and targeted interaction tests
- add tests where regression risk is meaningful

### Minimum expectation

Shared packages with logic should not rely solely on manual testing.

---

## Documentation Standards

Documentation is part of the product.

### Required when adding meaningful functionality

Update or create relevant docs when you add:

- new package responsibilities
- new public exports
- new patterns or blocks
- new registry behavior
- new conventions that other contributors must follow

### Docs expectations

- explain intent, not only syntax
- include usage examples where useful
- keep docs aligned with the actual package structure
- do not leave stale docs after changing behavior

---

## File and Folder Standards

### File naming

- use consistent, predictable naming
- avoid overly abbreviated file names
- group related functionality clearly
- keep public entry points obvious

### Exports

- maintain clean package entry points
- do not expose internal-only files by accident
- prefer deliberate exports over wildcard export sprawl where it harms clarity

### Colocation

- colocate files when it improves comprehension
- separate files when responsibilities diverge
- do not create excessive micro-files for trivial logic

---

## Dependency Standards

Before adding a dependency:

1. confirm there is no good existing internal solution
2. confirm the dependency materially improves speed, safety, or maintainability
3. avoid overlapping utility libraries
4. prefer stable, well-understood libraries

Do not add dependencies casually for trivial helpers.

---

## Error Handling Standards

- fail loudly at important boundaries
- validate external or generated data
- use useful error messages
- avoid silent failure in build and registry tooling
- preserve debuggability

For internal utilities:
- return clear error states or throw deliberately
- do not swallow errors without a documented reason

---

## Performance Standards

Performance matters, but clarity comes first.

- avoid unnecessary rerenders in shared UI primitives
- avoid premature optimization
- measure before introducing complexity
- be careful with large dependency weight in public packages
- keep install footprint in mind for registry consumers

---

## Review Checklist

Before considering work complete, verify:

- package boundaries are respected
- types are sound
- exports are intentional
- styling uses tokens where appropriate
- accessibility is preserved
- docs are updated if needed
- tests exist where the logic justifies them
- naming is consistent with the system

---

## Prohibited Patterns

Do not:

- use `any` casually
- hardcode brand values throughout the codebase
- duplicate components across layers
- hide unstable logic behind public exports
- create parallel APIs for the same concept without a strong reason
- introduce circular dependencies
- mix demo-only hacks into shared packages
- overabstract early-phase code

---

## Decision Heuristics

When there is ambiguity:

1. choose the most maintainable option
2. choose the narrowest correct scope
3. preserve system consistency
4. optimize for future reuse only when reuse is already credible
5. prefer boring code that the next engineer can read quickly

---

## Standards Priority Order

When tradeoffs exist, prioritize in this order:

1. correctness
2. maintainability
3. consistency
4. accessibility
5. installability
6. polish
7. speed of implementation