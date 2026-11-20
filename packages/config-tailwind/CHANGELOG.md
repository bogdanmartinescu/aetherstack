# @aetherstack/tailwind-config

## 0.1.0

### Minor Changes

- f571ca3: UX, accessibility, and capability pass across core and AI primitives

  **Bug fixes:**
  - `StreamingText` no longer restarts (and drops text) when `onComplete` is an inline function; stream errors are caught
  - `PromptInput` can now be used uncontrolled (previously it ignored typing without `onValueChange`), shrinks back after being cleared, and ignores Enter during IME composition
  - `CodeBlock` clears its "Copied" timer on unmount and handles clipboard rejection; trailing newlines no longer add an empty numbered line
  - `MarkdownRenderer` no longer leaks the `node` prop onto DOM elements or drops styling on fenced code
  - `ToolCallCard` no longer crashes on circular / BigInt results and shows string results without JSON quotes
  - `SidebarMenuButton` now implements `asChild` (previously forwarded to the DOM)
  - `PaginationPrevious` / `PaginationNext` are sized to fit their labels
  - All internal buttons use `type="button"` so they don't submit enclosing forms

  **New capabilities:**
  - `Button`: full interaction states
    - `loading` keeps the button focusable (`aria-disabled` + `aria-busy`), ignores clicks and form submission, swaps the leading icon for a spinner, and sweeps a highlight across the label (`animate-button-sweep`, new in `@aetherstack/tailwind-config`)
    - `icon` / `iconRight` props; an icon with no children renders a square button
    - new `xs`, `icon-xs`, `icon-sm` and `icon-lg` sizes, and a `quiet` variant (text-only, no press scale)
    - filled variants scale to 97% while pressed; hover styles no longer apply when disabled; every size is one step taller on coarse (touch) pointers; press and sweep are off under `prefers-reduced-motion`
  - `Progress`: `indicatorClassName`, value clamping
  - `PaginationLink`: `isDisabled` and `size`
  - `Input` / `Textarea`: destructive styling via `aria-invalid`
  - `PromptInput`: `defaultValue`, `onStop` (stop-generating button), `maxHeight`, `aria-label`, ref forwarding
  - `FeedbackButtons`: controlled `value` / `defaultValue` / `onValueChange`, vote switching and clearing, `disabled`
  - `CodeBlock`: `highlightLines`
  - `MarkdownRenderer`: fenced code renders via `CodeBlock` (language label + copy), `components` overrides, images, `h4`
  - `ToolCallCard`: `duration`, `defaultOpen`; static header when there are no details
  - `ReasoningBlock`: `isStreaming`, `duration`, `title`, controlled `open` / `onOpenChange`
  - `ThinkingIndicator`: `state="loading"` now renders a spinner
  - `AttachmentChip`: file-type icons, `status` (`uploading` / `error`), full-name tooltip
  - `SourceCard`: citation `index`, favicon fallback
  - `TokenCounter`: `label`, `warnAt`; amber warning tier before destructive at 100%
  - `ChatBubble`: distinct `system` styling; long unbroken strings wrap
  - AI primitive prop types are now exported (e.g. `PromptInputProps`)

  **Accessibility:** `aria-pressed` on feedback buttons, `role="status"` on `ThinkingIndicator`, labelled `TokenCounter` progress bar, focus-visible rings on all AI interactive elements, keyboard-focusable scroll regions, "opens in a new tab" hints on external links, and `motion-reduce` fallbacks for every animation.

  **Behaviour changes:** `FeedbackButtons` no longer disables the opposite button after a vote; `TokenCounter` shows amber (not destructive) between `warnAt` and 100%.
