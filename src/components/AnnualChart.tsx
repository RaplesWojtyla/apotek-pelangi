'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import {
	ChartConfig,
	ChartContainer,
	ChartLegendContent,
	ChartTooltipContent,
} from "@/components/ui/chart"

interface AnnualChartProps {
	data: { name: string; pemasukan: number; pengeluaran: number }[];
}


const chartConfig = {
	pemasukan: {
		label: "Pemasukan",
		color: "#2ECC71",
	},
	pengeluaran: {
		label: "Pengeluaran",
		color: "#FF5252",
	},
} satisfies ChartConfig

export default function AnnualChart({ data }: AnnualChartProps) {
	return (
		<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid vertical={false} />
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
						tickFormatter={(value) => `Rp${new Intl.NumberFormat('id-ID', {
							notation: 'compact',
							compactDisplay: 'short'
						}).format(value as number)}`}
					/>
					<Tooltip
						cursor={{ fill: 'hsl(var(--muted))' }}
						content={<ChartTooltipContent
							formatter={(value, name) => `${name.toString()} Rp${(value as number).toLocaleString('id-ID')}`}
						/>}
					/>
					<Legend content={<ChartLegendContent />} />
					<Bar dataKey="pemasukan" fill="var(--color-pemasukan)" radius={4} />
					<Bar dataKey="pengeluaran" fill="var(--color-pengeluaran)" radius={4} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	)
}