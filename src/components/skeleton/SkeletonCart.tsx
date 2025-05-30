import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCart = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Skeleton Cart Items */}
			<div className="lg:col-span-2 space-y-4">
				<div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border border-gray-300 shadow-sm bg-white">
					<div className="flex items-start sm:items-center flex-1">
						<Skeleton className="w-16 h-16 rounded-md" />
						<div className="ml-4 sm:ml-6 space-y-2">
							<Skeleton className="w-36 h-4 rounded" />
							<Skeleton className="w-24 h-3 rounded" />
							<Skeleton className="w-32 h-5 rounded" />
						</div>
					</div>

					<div className="mt-2 sm:mt-0 sm:w-28 text-right">
						<Skeleton className="w-20 h-4 ml-auto rounded" />
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border border-gray-300 shadow-sm bg-white">
					<div className="flex items-start sm:items-center flex-1">
						<Skeleton className="w-16 h-16 rounded-md" />
						<div className="ml-4 sm:ml-6 space-y-2">
							<Skeleton className="w-36 h-4 rounded" />
							<Skeleton className="w-24 h-3 rounded" />
							<Skeleton className="w-32 h-5 rounded" />
						</div>
					</div>

					<div className="mt-2 sm:mt-0 sm:w-28 text-right">
						<Skeleton className="w-20 h-4 ml-auto rounded" />
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border border-gray-300 shadow-sm bg-white">
					<div className="flex items-start sm:items-center flex-1">
						<Skeleton className="w-16 h-16 rounded-md" />
						<div className="ml-4 sm:ml-6 space-y-2">
							<Skeleton className="w-36 h-4 rounded" />
							<Skeleton className="w-24 h-3 rounded" />
							<Skeleton className="w-32 h-5 rounded" />
						</div>
					</div>

					<div className="mt-2 sm:mt-0 sm:w-28 text-right">
						<Skeleton className="w-20 h-4 ml-auto rounded" />
					</div>
				</div>
			</div>

			{/* Skeleton Subtotal Section */}
			<div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4 sm:p-6 h-fit space-y-4">
				<Skeleton className="w-48 h-5" />
				<Skeleton className="w-full h-1" />
				<div className="flex justify-between">
					<Skeleton className="w-24 h-4" />
					<Skeleton className="w-20 h-4" />
				</div>
				<Skeleton className="w-full h-10 rounded-full" />
			</div>
		</div>
	);
};
