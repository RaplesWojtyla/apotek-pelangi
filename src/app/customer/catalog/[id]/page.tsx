'use client'

import { getProductDetail, ProductDetail } from "@/action/product.action";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
    const [productDetail, setProductDetail] = useState<ProductDetail>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jumlah, setJumlah] = useState<number>(1)
    const params = useParams()
    const { id } = params

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

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 flex justify-center">
                    <img
                        src="/logo.png"
                        alt="Prospan"
                        className="w-64 h-64 rounded-lg"
                    />
                </div>

                <div className="md:col-span-1 space-y-6">
                    <h1 className="text-2xl font-bold">Prospan Sirup</h1>
                    <p className="text-xl text-green-700 font-semibold">Rp8.700</p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm">Jumlah:</span>
                        <div className="flex items-center border rounded-md overflow-hidden">
                            <button 
                                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                onClick={() => setJumlah(prev => prev - 1)}
                                disabled={jumlah < 2}
                            >
                                -
                            </button>
                            <span className="px-4">{jumlah}</span>
                            <button 
                                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                onClick={() => setJumlah(prev => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <button className="flex-1 bg-cyan-500 text-white text-sm py-2 rounded-md hover:bg-cyan-600">
                            Beli Sekarang
                        </button>
                        <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
                            <ShoppingCart size={18} />
                        </button>
                    </div>

                    <div className="space-y-6 text-sm mt-6 leading-relaxed">
                        <div>
                            <p className="font-semibold text-xl">Kategori :</p>
                            <p>{productDetail?.jenis_barang.kategori_barang.nama_kategori}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Deskripsi :</p>
                            <p>{productDetail?.detail_barang?.deskripsi}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Indikasi Umum :</p>
                            <p>{productDetail?.detail_barang?.indikasi_umum}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Komposisi :</p>
                            <p>{productDetail?.detail_barang?.komposisi}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Dosis :</p>
                            <p>{productDetail?.detail_barang?.dosis}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Aturan Pakai :</p>
                            <p>{productDetail?.detail_barang?.aturan_pakai}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Perhatian :</p>
                            <p>{productDetail?.detail_barang?.perhatian}.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Kontra Indikasi :</p>
                            <p>{productDetail?.detail_barang?.kontra_indikasi}.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Efek Samping :</p>
                            <p>{productDetail?.detail_barang?.efek_samping}.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Golongan :</p>
                            <p>{productDetail?.detail_barang?.golongan}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Kemasan :</p>
                            <p>{productDetail?.detail_barang?.kemasan}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">Manufaktur :</p>
                            <p>{productDetail?.detail_barang?.manufaktur}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">No. BPOM :</p>
                            <p>{productDetail?.detail_barang?.no_bpom}</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 space-y-6">
                    {["Flutamol", "Paracetamol", "Expan", "Sanmol"].map((name, i) => (
                        <Card key={i} className="max-w-xs w-full mx-auto">
                            <CardContent className="p-4 flex flex-col items-center gap-2">
                                <img
                                    src={`/Barang.png`}
                                    alt={name}
                                    className="w-16 h-16 rounded"
                                />
                                <p></p>
                                <div className="flex w-full gap-2">
                                    <button className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600">
                                        Beli Sekarang
                                    </button>
                                    <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
                                        <ShoppingCart size={16} />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
