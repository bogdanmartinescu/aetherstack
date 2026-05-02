"use client"

import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import { cn } from "@aetherstack/utils"

type ChartRecord = Record<string, string | number>

export interface ChartSeries {
  dataKey: string
  color?: string
}

export interface ChartProps {
  data: ChartRecord[]
  series: ChartSeries[]
  height?: number
  className?: string
  showGrid?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

function resolveColor(series: ChartSeries, index: number): string {
  return series.color ?? CHART_COLORS[index % CHART_COLORS.length] ?? "hsl(var(--chart-1))"
}

function ChartTooltipContent({
  active,
  payload,
  label,
}: TooltipProps<number | string, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-md">
      {label != null && (
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div key={`${String(entry.dataKey ?? entry.name)}-${i}`} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="font-medium">{entry.name}</span>
          <span className="ml-auto pl-4 font-mono text-muted-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function BarChart({
  data,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-border" />}
          {showXAxis && <XAxis dataKey="name" className="text-xs fill-muted-foreground" />}
          {showYAxis && <YAxis className="text-xs fill-muted-foreground" />}
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Bar key={s.dataKey} dataKey={s.dataKey} fill={resolveColor(s, i)} radius={[4, 4, 0, 0]} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

function LineChart({
  data,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-border" />}
          {showXAxis && <XAxis dataKey="name" className="text-xs fill-muted-foreground" />}
          {showYAxis && <YAxis className="text-xs fill-muted-foreground" />}
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              stroke={resolveColor(s, i)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

function AreaChart({
  data,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-border" />}
          {showXAxis && <XAxis dataKey="name" className="text-xs fill-muted-foreground" />}
          {showYAxis && <YAxis className="text-xs fill-muted-foreground" />}
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
          {series.map((s, i) => {
            const color = resolveColor(s, i)
            return (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={color}
                fill={color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            )
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface PieChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  className?: string
  showLegend?: boolean
}

function PieChart({ data, height = 300, className, showLegend = true }: PieChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
          <Pie data={data} cx="50%" cy="50%" outerRadius="80%" dataKey="value" label>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

function DonutChart({ data, height = 300, className, showLegend = true }: PieChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

function ChartContainer({ title, description, className, children, ...props }: ChartContainerProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)} {...props}>
      {(title || description) && (
        <div className="mb-4">
          {title && <p className="text-sm font-semibold">{title}</p>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export { BarChart, LineChart, AreaChart, PieChart, DonutChart, ChartContainer }
