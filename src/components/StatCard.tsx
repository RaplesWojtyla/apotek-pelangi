import React from "react"
import { Card } from "./ui/card"

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => {
	return (
		<Card className="flex flex-col items-center justify-center text-center gap-2 py-6 h-36">
			<div className="text-3xl">{icon}</div>
			<h2 className="text-sm text-gray-500">{title}</h2>
			<p className="text-xl font-semibold">{value}</p>
			{/* <Skeleton className="h-6 w-24 mt-1" /> */}
		</Card>
	)
}

export default StatCard