# @aetherstack/ui

## 0.5.0

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

## 0.4.0

### Minor Changes

- df4b1eb: Phase 7.5 — Component Completeness

  Track A (Shadcn Parity Primitives): ButtonGroup, Carousel, Chart, DatePicker, InputGroup, InputOTP, NavigationMenu, Sidebar, Sonner, AspectRatio, Menubar, Resizable

  Track B (SaaS Patterns): DateRangePicker, MultiSelect, SearchInput, ConfirmDialog, NotificationBell, ProfileDropdown, InlineEdit, SortableList, ThemeSwitcher, ChatMessageList, UploadProgress, TimelineFeed

  Track C (Marketing + Utility Blocks): AppHeader, MarketingNavbar, FooterSection, LandingHero, FeaturesSection, TestimonialsSection, CTASection, FAQSection, LogoCloud, StatsSection, UserProfilePage, ErrorPage, PricingComparison, WaitlistBlock, ChangelogBlock

  Track D (AI-Native UI): StreamingText, ThinkingIndicator, MarkdownRenderer, CodeBlock, PromptInput, ChatBubble, SourceCard, FeedbackButtons, ModelBadge, TokenCounter, PromptSuggestion, ToolCallCard, ReasoningBlock, AttachmentChip, ConversationThread, PromptBuilder, ModelSelector, AIResponseCard, PromptLibrary, ToolCallSequence, ConversationStarter, VoiceInput, AIErrorState, AISettingsPanel, ChatLayout, ChatSidebar, AIAssistantPanel, AIOnboarding, AgentWorkspace, CompareOutput, AISettings, PromptLibraryPage, AIUsageDashboard

### Patch Changes

- 287b767: missing components and blocks
- Updated dependencies [df4b1eb]
- Updated dependencies [287b767]
  - @aetherstack/utils@0.1.1

## 0.3.0

### Minor Changes

- Phase 7.5 — Component Completeness

  **@aetherstack/ui**
  - Track A: Added ButtonGroup, Carousel, Chart, DatePicker, InputGroup, InputOTP, NavigationMenu, Sidebar, Sonner, AspectRatio, Menubar, Resizable, VisuallyHidden primitives
  - Track D AI Primitives: StreamingText, ThinkingIndicator, MarkdownRenderer, CodeBlock, PromptInput, ChatBubble, SourceCard, FeedbackButtons, ModelBadge, TokenCounter, PromptSuggestion, ToolCallCard, ReasoningBlock, AttachmentChip

  **@aetherstack/patterns**
  - Track B SaaS Patterns: DateRangePicker, MultiSelect, SearchInput, ConfirmDialog, NotificationBell, ProfileDropdown, InlineEdit, SortableList, ThemeSwitcher, ChatMessageList, UploadProgress, TimelineFeed
  - Track D AI Patterns: ConversationThread, PromptBuilder, ModelSelector, AIResponseCard, PromptLibrary, ToolCallSequence, ConversationStarter, VoiceInput, AIErrorState, AISettingsPanel

  **@aetherstack/blocks**
  - Track C Marketing Blocks: AppHeader, MarketingNavbar, FooterSection, LandingHero, FeaturesSection, TestimonialsSection, CTASection, FAQSection, LogoCloud, StatsSection, UserProfilePage, ErrorPage, PricingComparison, WaitlistBlock, ChangelogBlock
  - Track D AI Blocks: ChatLayout, ChatSidebar, AIAssistantPanel, AIOnboarding, AgentWorkspace, CompareOutput, AISettings, PromptLibraryPage, AIUsageDashboard

## 0.2.0

### Minor Changes

- 4d7ede2: Add 7 new UI components and overhaul Toast

  **New components:**
  - `Alert` — semantic alert with default/success/warning/info/destructive variants
  - `AlertDialog` — Radix UI-based modal for critical confirmations
  - `Popover` — Radix UI floating overlay
  - `Collapsible` — expandable/collapsible content section
  - `Spinner` — animated loading indicator with size variants
  - `Kbd` — keyboard key badge component
  - `Drawer` — vaul-based bottom sheet drawer

  **Toast overhaul:**
  - Added `success`, `warning`, `info` variants (alongside existing `default` and `destructive`)
  - Each variant now includes an automatic semantic icon (CheckCircle2, AlertTriangle, Info, XCircle)
  - Added `<Toaster />` convenience component — drop it once in your root layout and call `toast()` anywhere
  - Fixed `TOAST_REMOVE_DELAY` from 1,000,000ms to 1,000ms so toasts clean up properly
  - Improved layout: `items-start gap-3` with icon column + content column
  - Updated `ToastViewport` to consistently render at `bottom-0 right-0`

## 0.1.0

### Minor Changes

- Initial public release (0.1.0)

  First stable public release of Aether UI — an open-code, AI-native design system and component registry.

  **@aetherstack/ui** — 31 primitives including Accordion, Avatar, Calendar, Combobox, ContextMenu, DropdownMenu, HoverCard, Pagination, Progress, ScrollArea, Separator, Slider, Toast, Toggle, ToggleGroup, and all original 16 components.

  **@aetherstack/patterns** — 20 higher-level patterns including DataTable, CommandPalette, StatGroup, Stepper, ActivityFeed, FileDropzone, Kanban, ColorPicker, and all original 12 patterns.

  **@aetherstack/blocks** — 10 full-section blocks including AccountSettings, BillingOverview, EmptyDashboard, NotificationCenter, OnboardingChecklist, PricingSection, TeamSettings, DashboardShell, LoginBlock, SignupBlock.

  **@aetherstack/tokens** — Design token contract: colors, spacing, typography, radius, shadows, motion.

  **@aetherstack/utils** — Shared `cn` utility (clsx + tailwind-merge).

  **@aetherstack/cli** — `aether-ui` CLI: `init`, `add`, `list`, `generate` commands.

  **@aetherstack/mcp-server** — MCP server exposing the registry to LLM agents (Cursor, Claude Desktop).

  All packages ship AI metadata (`intent`, `prompts`, `composition`, `slots`) on every registry item, a machine-readable `llms.txt`, and 58 installable registry items with per-item JSON.

### Patch Changes

- Updated dependencies
  - @aetherstack/utils@0.1.0
