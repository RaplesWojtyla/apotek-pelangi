import { syncUser } from '@/action/user.action'

export const page = async () => {
	const currUser = await syncUser()
	console.log(currUser);

	return (
		<div>Dashboard</div>
	)
}

export default page