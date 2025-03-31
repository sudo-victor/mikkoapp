"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", value: 1860 },
  { month: "February", value: 3050 },
  { month: "March", value: 2370 },
  { month: "April", value: 730 },
  { month: "May", value: 2090 },
  { month: "June", value: 2140 },
  { month: "July", value: 2140 },
  { month: "Augost", value: 2140 },
  { month: "September", value: 2140 },
  { month: "Octuber", value: 2140 },
  { month: "November", value: 2140 },
  { month: "December", value: 2140 },
]

const chartConfig = {
  value: {
    label: "Valor (R$)",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export function ProjectionChart() {
  return (
    <div className="flex-1 pb-0">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis 
            label={{ angle: -90, position: 'insideLeft', style: { textAnchor: 'start' } }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" className="fill-secondary" radius={8}>
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
