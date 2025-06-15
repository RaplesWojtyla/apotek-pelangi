'use client'

import React, { useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import toast from "react-hot-toast"
import { deleteFakturPembelian, getDetailLogPembelian, FakturPembelianWithRelations } from "@/action/admin/purchase.action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Pagination from "@/components/Pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { ClipboardList, Plus, Search, Loader2, Trash2, MoreVertical, Eye } from "lucide-react"

interface LogPembelianClientProps {
    initialLogs: any[]
    totalLogs: number
    totalPages: number
}

// Skeleton loading untuk detail dialog
const DetailLoadingSkeleton = () => (
    <div className="mt-4 space-y-4">
        <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-40 w-full" />
        <div className="flex justify-end">
            <Skeleton className="h-8 w-1/3" />
        </div>
    </div>
)

export default function LogPembelianClient({ initialLogs, totalLogs, totalPages }: LogPembelianClientProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [isPending, startTransition] = useTransition()
    const [detailLog, setDetailLog] = useState<FakturPembelianWithRelations | null>(null)
    const [isDetailLoading, setIsDetailLoading] = useState(false)

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handleViewDetail = async (id: string) => {
        setIsDetailLoading(true)
        setDetailLog(null)
        const result = await getDetailLogPembelian(id)
        if (result.success && result.data) {
            setDetailLog(result.data)
        } else {
            toast.error(result.message || "Gagal memuat detail.")
        }
        setIsDetailLoading(false)
    }

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteFakturPembelian(id)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        })
    }

    return (
        <>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[280px] mb-6">
                <div className="p-4 rounded-full bg-blue-100"><ClipboardList className="text-blue-600 w-6 h-6" /></div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Faktur Pembelian</p>
                    <h3 className="text-2xl font-bold">{totalLogs}</h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Input placeholder="Cari No. Faktur / Vendor..." className="w-full md:w-64" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} />
                    <Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
                </div>
                <Link href="/admin/logpembelian/tambah">
                    <Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"><Plus className="w-4 h-4" />Tambah Pembelian</Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No. Faktur</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Pencatat</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialLogs.length > 0 ? initialLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">{log.nomor_faktur}</TableCell>
                                <TableCell>{log.vendor.nama_vendor}</TableCell>
                                <TableCell>{log.user.nama}</TableCell>
                                <TableCell>{new Date(log.tanggal_faktur).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</TableCell>
                                <TableCell>Rp{log.total.toLocaleString('id-ID')}</TableCell>
                                <TableCell className="text-right">
                                    {/* ==========================================================
                                      PERUBAHAN KUNCI: Menggunakan DropdownMenu untuk Aksi
                                      ==========================================================
                                    */}
                                    <Dialog onOpenChange={(open) => !open && setDetailLog(null)}>
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={() => handleViewDetail(log.id)} className="cursor-pointer gap-2">
                                                            <Eye className="h-4 w-4" />
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-500 focus:text-red-500" onSelect={(e) => e.preventDefault()}>
                                                            <Trash2 className="h-4 w-4" />
                                                            Hapus
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {/* Konten Dialog Detail (tidak terlihat hingga dipicu) */}
                                            <DialogContent className="max-w-3xl">
                                                <DialogHeader className="text-left">
                                                    <DialogTitle className="text-xl">Detail Faktur Pembelian</DialogTitle>
                                                    {isDetailLoading ? <Skeleton className="h-5 w-3/4 mt-1" /> : (
                                                        <DialogDescription>
                                                            No. Faktur: <span className="font-semibold text-primary">{detailLog?.nomor_faktur}</span> dari <span className="font-semibold text-primary">{detailLog?.vendor.nama_vendor}</span>
                                                        </DialogDescription>
                                                    )}
                                                </DialogHeader>
                                                {isDetailLoading ? <DetailLoadingSkeleton /> : (
                                                    detailLog && <>
                                                        <ScrollArea className="mt-4 max-h-[50vh] pr-4">
                                                            <Table className="text-sm">
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>Nama Barang</TableHead>
                                                                        <TableHead className="text-center">Jumlah</TableHead>
                                                                        <TableHead className="text-right">Harga Beli</TableHead>
                                                                        <TableHead className="text-right">Subtotal</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {detailLog.detail_faktur_pembelian.map(item => (
                                                                        <TableRow key={item.id}>
                                                                            <TableCell>
                                                                                <div className="font-medium">{item.barang.nama_barang}</div>
                                                                                <div className="text-xs text-muted-foreground">
                                                                                    Batch: {item.kode_batch || '-'} | Exp: {item.tanggal_kadaluarsa ? new Date(item.tanggal_kadaluarsa).toLocaleDateString('id-ID') : '-'}
                                                                                </div>
                                                                            </TableCell>
                                                                            <TableCell className="text-center">{item.jumlah}</TableCell>
                                                                            <TableCell className="text-right">Rp{item.harga_beli.toLocaleString('id-ID')}</TableCell>
                                                                            <TableCell className="text-right">Rp{(item.jumlah * item.harga_beli).toLocaleString('id-ID')}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </ScrollArea>
                                                        <div className="flex justify-end items-center mt-4 pt-4 border-t">
                                                            <span className="text-muted-foreground mr-4">Total Keseluruhan</span>
                                                            <span className="text-xl font-bold">Rp{detailLog.total.toLocaleString('id-ID')}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </DialogContent>

                                            {/* Konten Dialog Hapus (tidak terlihat hingga dipicu) */}
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Hapus Faktur Pembelian?</AlertDialogTitle>
                                                    <AlertDialogDescription>Aksi ini akan menghapus faktur <span className="font-semibold">{log.nomor_faktur}</span> dan mengembalikan stok yang telah ditambahkan. Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(log.id)} className="bg-destructive hover:bg-destructive/90">
                                                        {isPending ? 'Menghapus...' : 'Ya, Hapus'}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow><TableCell colSpan={6} className="text-center py-10">Belum ada data pembelian.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-6 flex justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    )
}