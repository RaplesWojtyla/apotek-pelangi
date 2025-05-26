import { Skeleton } from "@/components/ui/skeleton";

export default function BarGraphSkeleton() {
  return (
    <div className="h-[400px] w-full bg-white border rounded-md p-6 flex flex-col justify-between">
      {/* Area batang chart */}
      <div className="flex-1 flex items-end justify-between gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {/* Batang */}
            <Skeleton
              className="w-4 rounded-md"
              style={{
                height: `${40 + (i % 5) * 20}px`, // tinggi bervariasi tapi konsisten
              }}
            />
            {/* Label bulan (skeleton) */}
            <Skeleton className="h-4 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
