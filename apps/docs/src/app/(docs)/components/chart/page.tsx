import type { Metadata } from "next"
import { BarChart, LineChart } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Chart",
  description: "Recharts wrapper components with token-based colors and sensible defaults.",
}

const MANUAL_SOURCE = `import * as React from "react"
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

// Full source: packages/ui/src/components/chart.tsx`

const SAMPLE_DATA = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
]

const LINE_DATA = [
  { month: "Jan", users: 240 },
  { month: "Feb", users: 380 },
  { month: "Mar", users: 320 },
  { month: "Apr", users: 500 },
  { month: "May", users: 480 },
  { month: "Jun", users: 620 },
]

export default function ChartPage() {
  return (
    <ComponentPage
      name="Chart"
      description="Recharts wrapper components with token-based colors and sensible defaults. Ships Bar, Line, Area, Pie, and Donut chart variants — all responsive by default."
      features={[
        "Bar, Line, Area, Pie, and Donut variants",
        "Responsive by default (100% width)",
        "Token-based color palette via CSS variables",
        "Accepts series array with optional per-series colors",
      ]}
      preview={
        <div className="w-full max-w-lg">
          <BarChart
            data={SAMPLE_DATA}
            series={[{ dataKey: "revenue", color: "hsl(var(--primary))" }]}
            height={220}
          />
        </div>
      }
      previewCode={`import { BarChart } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
]

export function ChartDemo() {
  return (
    <BarChart
      data={data}
      series={[{ dataKey: "revenue" }]}
      height={220}
    />
  )
}`}
      cliInstall={`npx aether-ui add chart`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install recharts`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Bar chart",
          description: "Display categorical data as vertical bars.",
          preview: (
            <div className="w-full max-w-lg">
              <BarChart
                data={SAMPLE_DATA}
                series={[{ dataKey: "revenue", color: "hsl(var(--primary))" }]}
                height={200}
              />
            </div>
          ),
          code: `<BarChart
  data={data}
  series={[{ dataKey: "revenue", color: "hsl(var(--primary))" }]}
  height={200}
/>`,
        },
        {
          title: "Line chart",
          description: "Track trends over time with a line chart.",
          preview: (
            <div className="w-full max-w-lg">
              <LineChart
                data={LINE_DATA}
                series={[{ dataKey: "users", color: "hsl(var(--primary))" }]}
                height={200}
              />
            </div>
          ),
          code: `<LineChart
  data={data}
  series={[{ dataKey: "users", color: "hsl(var(--primary))" }]}
  height={200}
/>`,
        },
        {
          title: "Multi-series",
          description: "Pass multiple series objects to overlay data sets.",
          preview: (
            <div className="w-full max-w-lg">
              <BarChart
                data={[
                  { month: "Jan", revenue: 4000, cost: 2400 },
                  { month: "Feb", revenue: 3000, cost: 1398 },
                  { month: "Mar", revenue: 5000, cost: 2800 },
                  { month: "Apr", revenue: 4500, cost: 3000 },
                ]}
                series={[
                  { dataKey: "revenue", color: "hsl(var(--primary))" },
                  { dataKey: "cost", color: "hsl(var(--muted-foreground))" },
                ]}
                height={200}
              />
            </div>
          ),
          code: `<BarChart
  data={data}
  series={[
    { dataKey: "revenue", color: "hsl(var(--primary))" },
    { dataKey: "cost", color: "hsl(var(--muted-foreground))" },
  ]}
  height={200}
/>`,
        },
      ]}
      props={[
        {
          name: "data",
          type: "Record<string, unknown>[]",
          description: "Array of data objects. Each key maps to a dataKey in series.",
        },
        {
          name: "series",
          type: "{ dataKey: string; color?: string }[]",
          description: "Defines which keys to render. Optional color overrides the default token.",
        },
        {
          name: "height",
          type: "number",
          default: "300",
          description: "Fixed pixel height of the chart container.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes on the wrapper element.",
        },
      ]}
      a11yNotes={[
        "Charts are rendered as SVG — add an aria-label or visually hidden description for screen reader users.",
        "Recharts tooltips are not keyboard accessible by default; consider pairing with a data table for full accessibility.",
        "Use sufficient color contrast when overriding series colors.",
      ]}
    />
  )
}
