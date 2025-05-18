import { checkRole } from "@/lib/clerk"
import { redirect } from "next/navigation"

const DashboardKasir = async () => {
	if (!await checkRole('KASIR')) {
		return redirect('/unauthorized')
	}

	return (
		<div>DashboardKasir</div>
	)
}

export default DashboardKasir