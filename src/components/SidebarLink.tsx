import Link from 'next/link'
import React from 'react'

const SidebarLink = ({ href, icon, label } : { href: string, icon: React.ReactNode, label: string }) => {
	return (
		<Link
			href={href}
			className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition"
		>
			{icon}
			<span>{label}</span>
		</Link>
	)
}

export default SidebarLink