import { Skeleton } from "../ui/skeleton";

export default function SkeletonKeranjang() {
  return (
    <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-[540px] pt-18 bg-white p-6 border-l shadow-lg overflow-y-auto z-40">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600">🛒 Keranjang</h2>

      <ul className="divide-y divide-gray-200 mb-4 max-h-64 overflow-y-auto space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="py-2 space-y-2">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 space-y-4 text-sm">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <Skeleton className="h-10 w-full mt-3 rounded-md" />
      </div>
    </div>
  )
}
