'use client'

import { getProductDetail, ProductDetail } from "@/action/product.action";
import ProductUnavailable from "@/components/customer/ProductUnavailable";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
    const [productDetail, setProductDetail] = useState<ProductDetail>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jumlah, setJumlah] = useState<number>(1)
    const params = useParams()
    const { id } = params
    const router = useRouter()

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getProductDetail(String(id));
                setProductDetail(data);
            } catch (error) {
                console.error(`[getProductDetail] error: ${error}`)

                toast.error("Gagal memuat detail produk.", {
                    duration: 3200,
                    ariaProps: {
                        role: 'status',
                        "aria-live": 'polite'
                    }
                })
            } finally {
                setIsLoading(false)
            }
        };
        fetchDetail();
    }, [id])

    if (isLoading) return <ProductDetailSkeleton />

    const handleAddToCart = async () => {
        if (!productDetail?.detail_barang) return

        try {
            const res = fetch('/api/customer/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idBarang: productDetail.id,
                    amount: jumlah,
                    sumber: 'MANUAL'
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const err = await res.json().catch(() => ({ message: "Terjadi Kesalahan Pada Server" }))

                    throw new Error(err.message || "Gagal ditambahkan ke dalam keranjang!")
                }

                return res.json()
            })

            toast.promise(res, {
                loading: 'Menambahkan ke kerangjang...',
                success: () => {
                    router.refresh()

                    return "Berhasil ditambahkan ke keranjang!"
                },
                error: (err) => err.message || "Gagal menambahkan ke keranjang!"
            }, {
                style: {
                    minWidth: '250px'
                },
                success: {
                    duration: 3000,
                    icon: '🛒'
                },
                error: {
                    duration: 4000,
                    icon: '❌'
                }
            })
        } catch (error) {

        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {productDetail?.detail_barang ? (
                    <>
                        {/* Bagian Gambar + Detail Produk */}
                        <div className="md:col-span-2 bg-white rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Gambar Produk */}
                                <div className="relative flex justify-center">
                                    {productDetail.totalStock < 1 && (
                                        <div className="absolute top-0 left-0 w-64 h-64 bg-black/60 z-10 flex items-center justify-center rounded-lg">
                                            <span className="text-white text-sm font-bold uppercase">Stok Habis</span>
                                        </div>
                                    )}
                                    <img
                                        src="/logo.png"
                                        alt={productDetail.nama_barang}
                                        className="w-64 h-64 rounded-lg"
                                    />
                                </div>

                                {/* Detail Produk */}
                                <div className="space-y-6">
                                    <h1 className="text-2xl font-bold">{productDetail.nama_barang}</h1>
                                    <p className="text-xl text-green-700 font-semibold">
                                        Rp {productDetail.harga_jual.toLocaleString("id-ID")}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Stok: {productDetail.totalStock}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        {productDetail.totalStock < 1 ? (
                                            <p className="text-red-500 font-bold">Stok tidak tersedia</p>
                                        ) : (
                                            <>
                                                <p className="text-sm">Jumlah:</p>
                                                <div className="flex items-center border rounded-md overflow-hidden">
                                                    <Button
                                                        variant="ghost"
                                                        className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 text-black"
                                                        onClick={() => setJumlah((prev) => prev - 1)}
                                                        disabled={jumlah < 2}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="px-4">{jumlah}</span>
                                                    <Button
                                                        variant="ghost"
                                                        className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 text-black"
                                                        onClick={() => setJumlah((prev) => prev + 1)}
                                                        disabled={jumlah >= productDetail.totalStock}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex w-full gap-2">
                                        <Button
                                            className="w-1/2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600 text-sm py-2"
                                            onClick={handleAddToCart}
                                            disabled={productDetail.totalStock < 1}
                                        >
                                            <ShoppingCart size={16} className="mr-2" />
                                            Masukkan Keranjang
                                        </Button>
                                        <Button
                                            className="w-1/2 bg-cyan-500 text-white text-sm py-2 rounded-md hover:bg-cyan-600"
                                            onClick={() => { }}
                                            disabled={productDetail.totalStock < 1}
                                        >
                                            Beli Sekarang
                                        </Button>
                                    </div>

                                    {/* Detail Lain */}
                                    <div className="space-y-4 text-sm leading-relaxed">
                                        {[
                                            { label: "Kategori", value: productDetail.jenis_barang.kategori_barang.nama_kategori },
                                            { label: "Deskripsi", value: productDetail.detail_barang.deskripsi },
                                            { label: "Indikasi Umum", value: productDetail.detail_barang.indikasi_umum },
                                            { label: "Komposisi", value: productDetail.detail_barang.komposisi },
                                            { label: "Dosis", value: productDetail.detail_barang.dosis },
                                            { label: "Aturan Pakai", value: productDetail.detail_barang.aturan_pakai },
                                            { label: "Perhatian", value: productDetail.detail_barang.perhatian },
                                            { label: "Kontra Indikasi", value: productDetail.detail_barang.kontra_indikasi },
                                            { label: "Efek Samping", value: productDetail.detail_barang.efek_samping },
                                            { label: "Golongan", value: productDetail.detail_barang.golongan },
                                            { label: "Kemasan", value: productDetail.detail_barang.kemasan },
                                            { label: "Manufaktur", value: productDetail.detail_barang.manufaktur },
                                            { label: "No. BPOM", value: productDetail.detail_barang.no_bpom },
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <p className="font-semibold text-base">{item.label}:</p>
                                                <p>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Produk Rekomendasi */}
                        <div className="md:col-span-1 space-y-4">
                            {[
                                { name: "Flutamol", harga: 12000, kegunaan: "Obat flu dan demam" },
                                { name: "Paracetamol", harga: 8000, kegunaan: "Pereda nyeri dan penurun demam" },
                                { name: "Expan", harga: 15000, kegunaan: "Meredakan batuk berdahak" },
                                { name: "Sanmol", harga: 9000, kegunaan: "Analgesik dan antipiretik" },
                            ].map((item, i) => (
                                <Card key={i} className="w-full relative">
                                    <CardContent className="flex flex-col items-center gap-1 relative z-0">
                                        <img
                                            src="/Barang.png"
                                            alt={item.name}
                                            className="w-16 h-16 rounded"
                                        />
                                        <p className="text-base font-semibold text-center">{item.name}</p>
                                        <p className="text-sm text-gray-600 text-center">{item.kegunaan}</p>
                                        <p className="text-sm text-orange-700 font-semibold"> Rp {item.harga.toLocaleString("id-ID")}</p>
                                        <div className="flex w-full gap-2 mt-2">
                                            <Button
                                                className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600"
                                            >
                                                Beli Sekarang
                                            </Button>
                                            <Button
                                                className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600"
                                            >
                                                <ShoppingCart size={16} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="md:col-span-3 flex justify-center items-center">
                        <ProductUnavailable />
                    </div>
                )}
            </div>
        </div>
    );
}
