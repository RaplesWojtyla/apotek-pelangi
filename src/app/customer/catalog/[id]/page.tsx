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
            const res = fetch('/api/cart', {
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

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                {productDetail?.detail_barang ? (
                    <>
                        <div className="md:col-span-1 flex justify-center">
                            <img
                                src="/logo.png"
                                alt="Prospan"
                                className="w-64 h-64 rounded-lg"
                            />
                        </div>

                        <div className="md:col-span-1 space-y-6">
                            <h1 className="text-2xl font-bold">{productDetail.nama_barang}</h1>
                            <p className="text-xl text-green-700 font-semibold">Rp {productDetail.harga_jual.toLocaleString('id-ID')}</p>

                            <div className="flex items-center gap-4">
                                {productDetail.totalStock < 1 ? (
                                    <p className="text-red-500 font-bold">Stok tidak tersedia</p>
                                ) : (
                                    <>
                                        <p className="text-sm">Jumlah:</p>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <Button
                                                variant={'ghost'}
                                                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-black"
                                                onClick={() => setJumlah(prev => prev - 1)}
                                                disabled={jumlah < 2}
                                            >
                                                -
                                            </Button>
                                            <span className="px-4">{jumlah}</span>
                                            <Button
                                                variant={'ghost'}
                                                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-black"
                                                onClick={() => setJumlah(prev => prev + 1)}
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
                                    className={`flex-1 bg-cyan-500 text-white text-sm py-2 rounded-md hover:bg-cyan-600 `}
                                    onClick={() => { }}
                                    disabled={productDetail.totalStock < 1}
                                >
                                    Beli Sekarang
                                </Button>
                                <Button
                                    className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600 cursor-pointer"
                                    onClick={handleAddToCart}
                                    disabled={productDetail.totalStock < 1}
                                >
                                    <ShoppingCart size={18} />
                                </Button>
                            </div>

                            <div className="space-y-6 text-sm mt-6 leading-relaxed">
                                <div>
                                    <p className="font-semibold text-xl">Kategori :</p>
                                    <p>{productDetail.jenis_barang.kategori_barang.nama_kategori}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Deskripsi :</p>
                                    <p>{productDetail.detail_barang.deskripsi}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Indikasi Umum :</p>
                                    <p>{productDetail.detail_barang.indikasi_umum}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Komposisi :</p>
                                    <p>{productDetail.detail_barang.komposisi}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Dosis :</p>
                                    <p>{productDetail.detail_barang.dosis}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Aturan Pakai :</p>
                                    <p>{productDetail.detail_barang.aturan_pakai}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Perhatian :</p>
                                    <p>{productDetail.detail_barang.perhatian}.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Kontra Indikasi :</p>
                                    <p>{productDetail.detail_barang.kontra_indikasi}.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Efek Samping :</p>
                                    <p>{productDetail.detail_barang.efek_samping}.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Golongan :</p>
                                    <p>{productDetail.detail_barang.golongan}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Kemasan :</p>
                                    <p>{productDetail.detail_barang.kemasan}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Manufaktur :</p>
                                    <p>{productDetail.detail_barang.manufaktur}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">No. BPOM :</p>
                                    <p>{productDetail.detail_barang.no_bpom}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ProductUnavailable />
                )}

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
                                    <Button
                                        className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600"
                                    >
                                        Beli Sekarang
                                    </Button>
                                    <Button
                                        className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600 cursor-pointer"
                                    >
                                        <ShoppingCart size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
