# @aetherstack/utils

## 0.1.1

### Patch Changes

- df4b1eb: Phase 7.5 — Component Completeness

  Track A (Shadcn Parity Primitives): ButtonGroup, Carousel, Chart, DatePicker, InputGroup, InputOTP, NavigationMenu, Sidebar, Sonner, AspectRatio, Menubar, Resizable

  Track B (SaaS Patterns): DateRangePicker, MultiSelect, SearchInput, ConfirmDialog, NotificationBell, ProfileDropdown, InlineEdit, SortableList, ThemeSwitcher, ChatMessageList, UploadProgress, TimelineFeed

  Track C (Marketing + Utility Blocks): AppHeader, MarketingNavbar, FooterSection, LandingHero, FeaturesSection, TestimonialsSection, CTASection, FAQSection, LogoCloud, StatsSection, UserProfilePage, ErrorPage, PricingComparison, WaitlistBlock, ChangelogBlock

  Track D (AI-Native UI): StreamingText, ThinkingIndicator, MarkdownRenderer, CodeBlock, PromptInput, ChatBubble, SourceCard, FeedbackButtons, ModelBadge, TokenCounter, PromptSuggestion, ToolCallCard, ReasoningBlock, AttachmentChip, ConversationThread, PromptBuilder, ModelSelector, AIResponseCard, PromptLibrary, ToolCallSequence, ConversationStarter, VoiceInput, AIErrorState, AISettingsPanel, ChatLayout, ChatSidebar, AIAssistantPanel, AIOnboarding, AgentWorkspace, CompareOutput, AISettings, PromptLibraryPage, AIUsageDashboard

- 287b767: missing components and blocks

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
