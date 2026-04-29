"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { DollarSign, Users as UsersIcon, ShoppingCart, TrendingUp } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@aetherstack/ui"
import { MetricCard, EmptyState, SectionHeader } from "@aetherstack/patterns"

const REVENUE = [
  { month: "Jan", revenue: 24000, target: 22000 },
  { month: "Feb", revenue: 26500, target: 24000 },
  { month: "Mar", revenue: 30100, target: 28000 },
  { month: "Apr", revenue: 28800, target: 30000 },
  { month: "May", revenue: 35400, target: 32000 },
  { month: "Jun", revenue: 41200, target: 36000 },
  { month: "Jul", revenue: 48295, target: 42000 },
]

const TRAFFIC = [
  { day: "Mon", visitors: 1240 },
  { day: "Tue", visitors: 1380 },
  { day: "Wed", visitors: 1620 },
  { day: "Thu", visitors: 1500 },
  { day: "Fri", visitors: 1890 },
  { day: "Sat", visitors: 2100 },
  { day: "Sun", visitors: 1700 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Revenue"
          value="$48,295"
          change="+12.5%"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          sublabel="vs. last month"
        />
        <MetricCard
          label="Active Users"
          value="3,241"
          change="+8.1%"
          trend="up"
          icon={<UsersIcon className="h-5 w-5" />}
          sublabel="last 30 days"
        />
        <MetricCard
          label="New Orders"
          value="142"
          change="+2.4%"
          trend="up"
          icon={<ShoppingCart className="h-5 w-5" />}
          sublabel="this week"
        />
        <MetricCard
          label="Churn Rate"
          value="1.2%"
          change="-0.3%"
          trend="down"
          icon={<TrendingUp className="h-5 w-5" />}
          sublabel="vs. last month"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs. target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={REVENUE} margin={{ left: 8, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      color: "hsl(var(--popover-foreground))",
                      fontSize: 12,
                    }}
                    formatter={(value: number) =>
                      `$${value.toLocaleString()}`
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#revenue)"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="hsl(var(--muted-foreground))"
                    fill="transparent"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitors this week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={TRAFFIC} margin={{ left: 0, right: 8, top: 8 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      color: "hsl(var(--popover-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty-state pattern */}
      <div>
        <SectionHeader title="Recent activity" description="Live events from your workspace." />
        <Card className="mt-3">
          <CardContent className="p-0">
            <EmptyState
              title="No recent events"
              description="Once your team starts working, activity will show up here."
              action={<Button size="sm">Connect a data source</Button>}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
