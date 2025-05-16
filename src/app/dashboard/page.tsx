import { syncUser } from '@/action/user.action'

export default async function Dashboard () {
	const currUser = await syncUser()
	console.log(currUser);

	return (
		<div>Dashboard</div>
	)
}
