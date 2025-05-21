import { Skeleton } from '../ui/skeleton'

const ProductDetailSkeleton = () => {
	return (
		<div className="bg-gray-100 min-h-screen animate-pulse">
			<div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
				<div className="md:col-span-1 flex justify-center">
					<Skeleton className="bg-gray-300 w-64 h-64 rounded-lg" />
				</div>

				<div className="md:col-span-1 space-y-6">
					<Skeleton className="bg-gray-300 h-8 w-1/2 rounded-md" /> 
					<Skeleton className="bg-gray-300 h-6 w-1/4 rounded-md" /> 

					<div className="flex items-center gap-4">
						<Skeleton className="bg-gray-300 h-4 w-12 rounded-md" /> 
						<div className="flex items-center border rounded-md overflow-hidden">
							<Skeleton className="bg-gray-300 h-8 w-8" /> 
							<Skeleton className="bg-gray-300 h-8 w-12" /> 
							<Skeleton className="bg-gray-300 h-8 w-8" /> 
						</div>
					</div>

					<div className="flex w-full gap-2">
						<Skeleton className="bg-gray-300 flex-1 h-10 rounded-md" /> 
						<Skeleton className="bg-gray-300 h-10 w-10 rounded-md" /> 
					</div>

					<div className="space-y-6 text-sm mt-6 leading-relaxed">
						{Array.from({ length: 12 }).map((_, idx) => (
							<div key={idx} className="space-y-2">
								<Skeleton className="bg-gray-300 h-5 w-1/3 rounded-md" /> 
								<Skeleton className="bg-gray-300 h-4 w-full rounded-md" /> 
							</div>
						))}
					</div>
				</div>

				<div className="md:col-span-1 space-y-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="max-w-xs w-full mx-auto">
							<Skeleton className="bg-gray-300 h-32 w-full rounded-lg mb-2" />
							<div className="flex w-full gap-2">
								<Skeleton className="bg-gray-300 flex-1 h-8 rounded-md" />
								<Skeleton className="bg-gray-300 h-8 w-8 rounded-md" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductDetailSkeleton