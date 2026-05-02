import type { Metadata } from "next"
import { AIUsageDashboard } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "AI Usage Dashboard",
  description: "A dashboard for visualizing AI API usage — request counts, token consumption, estimated cost, and per-model breakdown.",
}

const DEMO_STATS = {
  totalRequests: 14820,
  totalTokens: 3_200_000,
  estimatedCost: 12.48,
  period: "May 2026",
}

const DEMO_MODELS = [
  { model: "gpt-4o", tokens: 1_800_000, cost: 9.0 },
  { model: "gpt-4o-mini", tokens: 900_000, cost: 1.8 },
  { model: "claude-3-5-sonnet", tokens: 500_000, cost: 1.68 },
]

const DEMO_DAILY = [
  { date: "04-25", requests: 380, tokens: 82000 },
  { date: "04-26", requests: 510, tokens: 110000 },
  { date: "04-27", requests: 290, tokens: 64000 },
  { date: "04-28", requests: 620, tokens: 135000 },
  { date: "04-29", requests: 740, tokens: 160000 },
  { date: "04-30", requests: 855, tokens: 185000 },
  { date: "05-01", requests: 1020, tokens: 220000 },
]

export default function AIUsageDashboardPage() {
  return (
    <BlockPage
      name="AI Usage Dashboard"
      category="AI"
      description="A monitoring dashboard for AI API consumption. Displays three KPI stat cards (requests, tokens, cost), a bar chart of request volume over time using an inline SVG renderer, and a sortable per-model usage breakdown table."
      cliInstall="npx aether-ui add ai-usage-dashboard"
      previewHeight="400px"
      importCode={`import { AIUsageDashboard } from "@aetherstack/blocks"`}
      usageCode={`import { AIUsageDashboard } from "@aetherstack/blocks"

export function UsagePage() {
  return (
    <AIUsageDashboard
      stats={{
        totalRequests: 14820,
        totalTokens: 3_200_000,
        estimatedCost: 12.48,
        period: "May 2026",
      }}
      tokensByModel={[
        { model: "gpt-4o", tokens: 1_800_000, cost: 9.0 },
        { model: "gpt-4o-mini", tokens: 900_000, cost: 1.8 },
        { model: "claude-3-5-sonnet", tokens: 500_000, cost: 1.68 },
      ]}
      requestsOverTime={[
        { date: "04-28", requests: 620, tokens: 135000 },
        { date: "04-29", requests: 740, tokens: 160000 },
        { date: "04-30", requests: 855, tokens: 185000 },
        { date: "05-01", requests: 1020, tokens: 220000 },
      ]}
    />
  )
}`}
      preview={
        <div className="p-4 h-full overflow-auto">
          <AIUsageDashboard
            stats={DEMO_STATS}
            tokensByModel={DEMO_MODELS}
            requestsOverTime={DEMO_DAILY}
          />
        </div>
      }
      props={[
        { name: "stats", type: "UsageStats", description: "Summary KPI object with totalRequests, totalTokens, estimatedCost, and an optional period label." },
        { name: "tokensByModel", type: "ModelUsage[]", default: "[]", description: "Per-model breakdown rows displayed in the usage table." },
        { name: "requestsOverTime", type: "DailyUsage[]", default: "[]", description: "Daily usage series rendered as a mini bar chart." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "The bar chart is rendered as an <svg> with aria-label='Bar chart'. Each bar includes a <title> element with the data point label and value.",
        "Large numbers are formatted with K/M suffixes; the raw values are available via the bar <title> elements.",
        "The usage table uses semantic <table>, <thead>, and <tbody> elements with column headers.",
      ]}
    />
  )
}
