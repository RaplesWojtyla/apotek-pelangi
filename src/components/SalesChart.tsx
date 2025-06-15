'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import {
	ChartContainer,
	ChartTooltipContent,
} from "@/components/ui/chart"

interface SalesChartProps {
	data: { name: string; total: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
	const chartConfig = {
		total: {
			label: "Total",
			color: "hsl(var(--primary))",
		},
	}

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} />
					<XAxis
						dataKey="name"
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `Rp${(value as number / 1000).toLocaleString('id-ID')}k`}
					/>
					<Tooltip content={<ChartTooltipContent />} />
					<Bar dataKey="total" fill="var(--color-total)" radius={4} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	)
}