export default function LogPenjualanSkeleton() {
	return (
		<div className="p-4 max-w-[1240px] mx-auto mb-10 animate-pulse">
			<div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>

			<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
				<div className="h-[100px] bg-gray-200 rounded-xl w-full sm:w-[280px]"></div>
				<div className="h-[100px] bg-gray-200 rounded-xl w-full sm:w-[280px]"></div>
				<div className="h-[100px] bg-gray-200 rounded-xl w-full sm:w-[280px]"></div>
			</div>

			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<div className="h-10 bg-gray-200 rounded w-full md:w-64"></div>
					<div className="h-10 bg-gray-200 rounded w-10"></div>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg shadow">
				<div className="min-w-full bg-white">
					<div className="bg-gray-100">
						<div className="flex">
							{Array.from({ length: 7 }).map((_, i) => (
								<div key={i} className="px-3 py-4 flex-1">
									<div className="h-4 bg-gray-300 rounded w-3/4"></div>
								</div>
							))}
						</div>
					</div>
					<div>
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="flex border-t">
								{Array.from({ length: 7 }).map((_, j) => (
									<div key={j} className="px-3 py-4 flex-1">
										<div className="h-4 bg-gray-200 rounded"></div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-center">
				<div className="h-10 bg-gray-200 rounded w-1/3"></div>
			</div>
		</div>
	);
}