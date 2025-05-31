"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Pemasukan",
    color: "#2563eb",
  },
  mobile: {
    label: "Pengeluaran",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function BarGraph() {
  return (
    <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} tickFormatter={(v) => v.slice(0, 3)} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
