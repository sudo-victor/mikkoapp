"use client";
import * as React from "react";
import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "visitors", visitors: 275, fill: "var(--color-visitors)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export const CategoryChart = () => {
  return (
    <div className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          />
        </PieChart>
      </ChartContainer>

      <div>
        {
          chartData.map((data) => (
            <div
              key={data.browser}
              className="py-4 border-b-[0.5px] border-[#D0D0D0] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
                <h3 className="capitalize font-red-hat font-normal text-xs text-[#626262]">
                  {data.browser}
                </h3>
              </div>

              <div className="flex items-center gap-5">
                <p className="font-red-hat font-semibold text-xs text-dark">
                  R$ 2000,00
                </p>
                <p className="font-red-hat font-semibold text-xs text-dark">
                  50%
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
