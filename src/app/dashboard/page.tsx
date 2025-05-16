import { syncUser } from '@/action/user.action'
import React from 'react'

const Dashboard = async () => {
	const currUser = await syncUser()
	console.log(currUser);

	return (
		<div>Dashboard</div>
	)
}

export default Dashboard