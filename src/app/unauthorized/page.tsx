import React from 'react'

const Unauthorized = () => {
	return (
		<div className="min-h-screen flex items-center justify-center text-center">
			<div>
				<h1 className="text-3xl font-bold text-red-600">Akses Ditolak</h1>
				<p className="mt-2">Kamu tidak memiliki izin untuk mengakses halaman ini.</p>
			</div>
		</div>
	)
}

export default Unauthorized