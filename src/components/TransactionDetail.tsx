'use client'

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { DetailSellingInvoices } from "@/action/customer/sellingInvoice.action"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { redirect, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { OctagonAlertIcon } from "lucide-react"

export default function TransaksiDetailDialog({ transaction }: { transaction: DetailSellingInvoices }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const failedPaymentStatus = [
        { label: "Semua", value: "Semua" },
        { label: "Menunggu Pembayaran", value: "MENUNGGU_PEMBAYARAN" },
        { label: "Pembayaran Berhasil", value: "PEMBAYARAN_BERHASIL" },
        { label: "Pembayaran Gagal", value: "PEMBAYARAN_GAGAL" },
    ]

    const idealStatus = [
        { label: "Semua", value: "Semua" },
        { label: "Menunggu Pembayaran", value: "MENUNGGU_PEMBAYARAN" },
        { label: "Pembayaran Berhasil", value: "PEMBAYARAN_BERHASIL" },
        { label: "Menunggu Pengambilan", value: "MENUNGGU_PENGAMBILAN" },
        { label: "Selesai", value: "SELESAI" }
    ]

    const status = transaction.status === 'PEMBAYARAN_GAGAL' ? failedPaymentStatus : idealStatus

    const getCurrStatuIndex = () => {
        for (let i = 0; i < status.length; ++i) {
            if (status[i].value === transaction.status) {
                return i
            }
        }

        return 0
    }

    const handlePayment = (snap_token: string) => {
        setOpen(false)
        window.snap.pay(snap_token, {
            onSuccess: (res) => {
                router.push(`/customer/invoice/success/${res.order_id}`)
            },
            onPending: () => {
                toast.error("Harap segera melakukan pembayaran", {
                    duration: 4500,
                    style: {
                        border: '1px solid #CB8802',
                        paddingTop: '16px',
                        color: '#B47902',
                        background: '#FFE2A6'
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                    icon: <OctagonAlertIcon size={30} />,
                })
            },
            onError: (res) => {
                redirect(`/customer/invoice/failed?order_id=${transaction?.id}`)
            },
            onClose: () => {

            },
        })
    }

    const currStatusIndex = getCurrStatuIndex()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-primary text-sm font-semibold mt-2 inline-block cursor-pointer">Lihat Detail</button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detail Transaksi</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-56">
                    {transaction.detail_faktur_penjualan.map(dtx => (
                        <div key={dtx.id} className="flex gap-4 mt-4">
                            <Image
                                src={dtx.barang.foto_barang.includes('https') ? dtx.barang.foto_barang : `/${dtx.barang.foto_barang}`}
                                alt={dtx.barang.nama_barang}
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                            <div>
                                <p className="font-semibold">{dtx.barang.nama_barang}</p>
                                <p className="text-sm">Rp {dtx.barang.harga_jual.toLocaleString()} x {dtx.jumlah}</p>
                                <p className="font-bold mt-1">Rp{(dtx.barang.harga_jual * dtx.jumlah).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <div className="mt-4 text-sm">
                    <h4 className="font-semibold mb-1">Informasi Pesanan</h4>
                    <p>Kode Invoice : {transaction.id}</p>
                    <p>{transaction.nama_penerima}</p>
                    <p>{transaction.nomor_telepon}</p>

                    <h4 className="font-semibold mt-4 mb-2">Status Pengiriman</h4>
                    <div className="flex flex-col relative ml-4">
                        {status.map((s, idx) => {
                            const isActive = idx <= currStatusIndex

                            return (
                                <div className="flex items-start gap-3 relative" key={idx}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
                                        {idx < status.length - 1 && (
                                            <div className={`w-[2px] h-8 ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
                                        )}
                                    </div>
                                    <span className={`text-sm ${isActive ? "text-black" : "text-gray-400"}`}>{s.label}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-8">
                        <Button
                            className="cursor-pointer"
                            onClick={() => handlePayment(transaction.snap_token)}
                            disabled={transaction.status === 'PEMBAYARAN_BERHASIL' || transaction.status === 'SELESAI'}
                        >
                            Bayar Sekarang
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
