import type { Metadata } from "next"
import { MetricCard } from "@aetherstack/patterns"
import { Users, DollarSign, TrendingUp, ShoppingCart } from "lucide-react"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Metric Card",
  description: "Dashboard stat card: label, value, trend badge, and icon.",
}

export default function MetricCardPage() {
  return (
    <PatternPage
      name="Metric Card"
      description="A dashboard stat card displaying a key metric with optional trend indicator and icon. Composes the Card primitive."
      cliInstall="npx aether-ui add metric-card"
      importCode={`import { MetricCard } from "@aetherstack/patterns"`}
      usageCode={`import { DollarSign, Users, TrendingUp } from "lucide-react"
import { MetricCard } from "@aetherstack/patterns"

<MetricCard
  label="Total Revenue"
  value="$45,231.89"
  change="+20.1%"
  trend="up"
  sublabel="from last month"
  icon={<DollarSign className="h-5 w-5" />}
/>

<MetricCard
  label="Active Users"
  value="2,350"
  change="-4.3%"
  trend="down"
  icon={<Users className="h-5 w-5" />}
/>`}
      preview={
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
          <MetricCard
            label="Total Revenue"
            value="$45,231"
            change="+20.1%"
            trend="up"
            sublabel="from last month"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <MetricCard
            label="Active Users"
            value="2,350"
            change="-4.3%"
            trend="down"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            label="Conversion Rate"
            value="3.24%"
            change="+1.1%"
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            label="Orders"
            value="1,429"
            icon={<ShoppingCart className="h-5 w-5" />}
          />
        </div>
      }
      props={[
        { name: "label", type: "string", required: true, description: "Metric name displayed above the value." },
        { name: "value", type: "string | number", required: true, description: "Primary metric value." },
        { name: "change", type: "string", description: "Change indicator, e.g. \"+20.1%\"." },
        { name: "trend", type: '"up" | "down" | "neutral"', default: '"neutral"', description: "Controls color of the change badge and arrow direction." },
        { name: "icon", type: "ReactNode", description: "Icon displayed in the top-right. Recommended: Lucide icon h-5 w-5." },
        { name: "sublabel", type: "string", description: "Optional sublabel below the value, e.g. \"from last month\"." },
        { name: "className", type: "string", description: "Additional classes on the Card." },
      ]}
    />
  )
}
