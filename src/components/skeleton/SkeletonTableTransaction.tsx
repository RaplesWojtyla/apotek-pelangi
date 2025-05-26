import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableTransactionSkeleton() {
  return (
    <Table className="h-[400px] overflow-y-hidden ml-8">
      <TableCaption>
        <Skeleton className="h-4 w-56 mx-auto mt-2" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
