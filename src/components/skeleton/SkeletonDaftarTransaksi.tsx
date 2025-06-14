import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DaftarTransaksiSkeleton() {
  return (
    // Wrapper utama sekarang memiliki space-y-6 untuk jarak antar elemen di dalamnya
    <div className="space-y-6">

      {/* Skeleton HANYA untuk Tabel */}
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-medium">
                  <Skeleton className={`h-6 rounded-md 'w-3/4' : 'w-5/6'}`} />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-28 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-7 w-24 rounded-full" />
                </TableCell>
                <TableCell className="flex justify-end">
                  <Skeleton className="h-9 w-20 rounded-md" />
                </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Membuat 5 baris skeleton untuk meniru daftar data */}
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell className="font-medium">
                  <Skeleton className={`h-6 rounded-md ${index % 2 === 0 ? 'w-3/4' : 'w-5/6'}`} />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-28 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-7 w-24 rounded-full" />
                </TableCell>
                <TableCell className="flex justify-end">
                  <Skeleton className="h-9 w-20 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Skeleton HANYA untuk Paginasi */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-80 rounded-md" />
      </div>
    </div>
  )
}
