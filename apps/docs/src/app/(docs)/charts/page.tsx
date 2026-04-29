"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { CodeBlock } from "@/components/code-block"

// ── Demo data ─────────────────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: "Jan", revenue: 18400, users: 820 },
  { month: "Feb", revenue: 21200, users: 940 },
  { month: "Mar", revenue: 19800, users: 870 },
  { month: "Apr", revenue: 25600, users: 1120 },
  { month: "May", revenue: 23100, users: 1050 },
  { month: "Jun", revenue: 28900, users: 1280 },
  { month: "Jul", revenue: 31400, users: 1390 },
  { month: "Aug", revenue: 29700, users: 1310 },
  { month: "Sep", revenue: 34200, users: 1540 },
  { month: "Oct", revenue: 38100, users: 1680 },
  { month: "Nov", revenue: 42600, users: 1870 },
  { month: "Dec", revenue: 48300, users: 2120 },
]

const weeklyStats = [
  { day: "Mon", sessions: 1420, conversions: 68 },
  { day: "Tue", sessions: 1860, conversions: 92 },
  { day: "Wed", sessions: 2100, conversions: 115 },
  { day: "Thu", sessions: 1780, conversions: 84 },
  { day: "Fri", sessions: 2340, conversions: 127 },
  { day: "Sat", sessions: 1050, conversions: 43 },
  { day: "Sun", sessions: 890, conversions: 38 },
]

const planDistribution = [
  { name: "Enterprise", value: 12, color: "hsl(269 74% 57%)" },
  { name: "Pro", value: 38, color: "hsl(269 74% 70%)" },
  { name: "Starter", value: 35, color: "hsl(269 74% 82%)" },
  { name: "Free", value: 15, color: "hsl(0 0% 85%)" },
]

// ── Shared tooltip style ──────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function ChartSection({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Live chart preview */}
      <div className="overflow-hidden rounded-lg border border-border bg-card p-6">
        {children}
      </div>

      {/* Code */}
      <CodeBlock code={code} filename={`${title.toLowerCase().replace(/ /g, "-")}.tsx`} />
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChartsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Charts</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Data visualisation built with{" "}
          <a
            href="https://recharts.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Recharts
          </a>{" "}
          — a composable charting library for React. Charts use Aether UI CSS variables so they
          automatically respect your active theme and dark mode.
        </p>

        {/* Install */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-foreground">Installation</p>
          <CodeBlock code="pnpm add recharts" filename="terminal" />
        </div>
      </div>

      <div className="space-y-14">
        {/* ── Area Chart ─────────────────────────────────────────────────── */}
        <ChartSection
          title="Area Chart"
          description="Great for showing trends over time. Use gradient fills to add visual depth."
          code={`"use client"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jan", revenue: 18400 },
  { month: "Feb", revenue: 21200 },
  // ...
]

export function RevenueAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => \`$\${(v/1000).toFixed(0)}k\`} />
        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem" }} />
        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}`}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(269 74% 57%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(269 74% 57%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(269 74% 70%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(269 74% 70%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "16px", color: "hsl(var(--muted-foreground))" }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue ($)"
                stroke="hsl(269 74% 57%)"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="hsl(269 74% 70%)"
                strokeWidth={2}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* ── Bar Chart ──────────────────────────────────────────────────── */}
        <ChartSection
          title="Bar Chart"
          description="Compare values across categories or time periods. Supports grouped bars for multi-series."
          code={`"use client"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", sessions: 1420, conversions: 68 },
  { day: "Tue", sessions: 1860, conversions: 92 },
  // ...
]

export function WeeklyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem" }} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="sessions" name="Sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="conversions" name="Conversions" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}`}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyStats} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "16px", color: "hsl(var(--muted-foreground))" }}
              />
              <Bar dataKey="sessions" name="Sessions" fill="hsl(269 74% 57%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" name="Conversions" fill="hsl(269 74% 82%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* ── Line Chart ─────────────────────────────────────────────────── */}
        <ChartSection
          title="Line Chart"
          description="Track multiple metrics simultaneously with distinct line styles. Ideal for comparison over time."
          code={`"use client"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

export function MultiLineChart({ data }: { data: typeof monthlyRevenue }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem" }} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="users" name="Users" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}`}
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "16px", color: "hsl(var(--muted-foreground))" }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="hsl(269 74% 57%)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "hsl(269 74% 57%)" }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="hsl(0 0% 60%)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* ── Pie Chart ──────────────────────────────────────────────────── */}
        <ChartSection
          title="Pie / Donut Chart"
          description="Show part-to-whole relationships. Use the innerRadius prop to create a donut variant."
          code={`"use client"
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Enterprise", value: 12, color: "hsl(var(--primary))" },
  { name: "Pro",        value: 38, color: "hsl(269 74% 70%)" },
  { name: "Starter",   value: 35, color: "hsl(269 74% 82%)" },
  { name: "Free",      value: 15, color: "hsl(var(--muted))" },
]

export function PlanPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem" }} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  )
}`}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", paddingTop: "8px", color: "hsl(var(--muted-foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        {/* ── Notes ──────────────────────────────────────────────────────── */}
        <section className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">Using Aether UI tokens in charts</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs text-foreground">
              hsl(var(--token-name))
            </code>{" "}
            as the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs text-foreground">stroke</code> or{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs text-foreground">fill</code> prop
            to automatically inherit light/dark theme colours. Key tokens:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["--primary", "Brand accent — main chart lines/bars"],
              ["--muted-foreground", "Axis labels, grid lines"],
              ["--border", "Grid stroke, tooltip borders"],
              ["--card", "Tooltip background"],
              ["--foreground", "Tooltip text"],
              ["--destructive", "Negative / error series"],
            ].map(([token, desc]) => (
              <div key={token} className="flex items-start gap-2 text-sm">
                <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {token}
                </code>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
