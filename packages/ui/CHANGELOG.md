# @aetherstack/ui

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
