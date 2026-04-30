import type { Metadata } from "next"
import { BillingOverview } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Billing Overview",
  description: "Current plan card, usage metrics with progress bars, and next billing date.",
}

export default function BillingOverviewPage() {
  return (
    <BlockPage
      name="Billing Overview"
      category="Billing"
      description="Displays the user's current subscription plan, usage metrics with progress bars, and billing actions. Upgrade and manage billing callbacks are passed in."
      cliInstall="npx aether-ui add billing-overview"
      importCode={`import { BillingOverview } from "@aetherstack/blocks"`}
      usageCode={`import { BillingOverview } from "@aetherstack/blocks"

export default function BillingPage() {
  return (
    <BillingOverview
      plan={{
        name: "Pro",
        price: "$29",
        period: "month",
        features: ["Unlimited projects", "10 team members", "Priority support"],
      }}
      usage={[
        { label: "Projects", used: 6, limit: 10 },
        { label: "Team members", used: 3, limit: 10 },
        { label: "API calls", used: 8200, limit: 10000, unit: "calls" },
      ]}
      nextBillingDate="May 15, 2026"
      onUpgrade={() => router.push("/upgrade")}
      onManageBilling={() => window.open(portalUrl)}
    />
  )
}`}
      preview={
        <div className="p-6">
          <BillingOverview
            plan={{
              name: "Pro",
              price: "$29",
              period: "month",
              features: ["Unlimited projects", "10 team members", "Priority support"],
            }}
            usage={[
              { label: "Projects", used: 6, limit: 10 },
              { label: "Team members", used: 3, limit: 10 },
              { label: "API calls", used: 8200, limit: 10000, unit: "calls" },
            ]}
            nextBillingDate="May 15, 2026"
          />
        </div>
      }
      props={[
        { name: "plan", type: "BillingPlan", description: "Current plan details: name, price, period, features." },
        { name: "usage", type: "UsageMetric[]", description: "Array of usage metrics, each with label, used, limit, and optional unit." },
        { name: "nextBillingDate", type: "string", description: "Human-readable next billing date string." },
        { name: "onUpgrade", type: "() => void", description: "Called when the upgrade button is clicked." },
        { name: "onManageBilling", type: "() => void", description: "Called when the manage billing button is clicked." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Progress bars use semantic <progress> element via the Progress primitive with accessible labels.",
        "Plan features list is rendered as a <ul> for correct screen-reader semantics.",
      ]}
    />
  )
}
