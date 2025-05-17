import React from "react"
import { Card } from "./ui/card"

const StatCard = ({ icon, title, value } : { icon: React.ReactNode, title: string, value: string }) => {
	return (
		<Card className="flex items-center gap-4 p-4">
			<div className="text-3xl">{icon}</div>
			<div>
				<h2 className="text-sm text-gray-500">{title}</h2>
				<p className="text-xl font-semibold">{value}</p>
			</div>
		</Card>
	)
}

export default StatCard