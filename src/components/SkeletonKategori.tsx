import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonKategori() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Card
              key={index}
              className="h-32 flex flex-col items-center justify-center p-4"
            >
              <CardContent className="flex flex-col items-center justify-center gap-2 p-0 w-full">
                <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
                <Skeleton className="w-20 h-4 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
