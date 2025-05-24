import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export default function TransaksiDetailDialog({ transaksi }: { transaksi: any }) {
    const [open, setOpen] = useState(false)
    const item = transaksi.items[0]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-blue-600 text-sm mt-2 inline-block">Lihat Detail</button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detail Transaksi</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 mt-4">
                    <Image
                        src={item.gambar}
                        alt={item.nama}
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                    <div>
                        <p className="font-semibold">{item.nama}</p>
                        <p className="text-sm">{item.jumlah} x Rp{item.harga.toLocaleString()}</p>
                        <p className="font-bold mt-1">Rp{transaksi.total.toLocaleString()}</p>
                    </div>
                </div>

                <div className="mt-4 text-sm">
                    <h4 className="font-semibold mb-1">Informasi Pengiriman</h4>
                    <p>No Pesanan : {transaksi.id}</p>
                    <p>J&T Express (Reguler) : JPR3898298</p>

                    <h4 className="font-semibold mt-4 mb-1">Alamat Pengiriman</h4>
                    <p>Patra Gek</p>
                    <p>(+62)82281513894</p>
                    <p>Jl. Raya Bahagia No.25C, Medan Barat, Medan</p>

                    <h4 className="font-semibold mt-4 mb-2">Status Pengiriman</h4>
                    <div className="flex flex-col relative ml-4">
                        {["Pesanan anda belum dibayar", "Pesanan anda belum diverifikasi", "Pesanan anda belum diproses", "Menunggu Pengiriman"].map((step, idx) => {
                            const currentStatusIndex = 0 // <- Ganti sesuai status (0-3) tergantung progres
                            const isActive = idx <= currentStatusIndex

                            return (
                                <div className="flex items-start gap-3 relative" key={idx}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
                                        {idx < 3 && (
                                        <div className={`w-[2px] h-8 ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
                                        )}
                                    </div>
                                    <span className={`text-sm ${isActive ? "text-black" : "text-gray-400"}`}>{step}</span>
                                </div>
                            )
                        })}
                    </div>


                    <h4 className="font-semibold mt-4 mb-1">Bukti Pembayaran</h4>
                    <div className="w-32 h-32 border rounded flex items-center justify-center bg-gray-100">
                        <span className="text-sm text-gray-400">[Gambar]</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
