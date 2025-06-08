"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DetailTebusResepDialogCustomer from "@/components/DetailTebusCust";
import { Badge } from "@/components/ui/badge";
import { getRescriptionSubmissionList, Rescription } from "@/action/customer/resep.action";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface Resep {
    id: number;
    namaFile: string;
    tanggalUpload: string;
    status: "diproses" | "selesai" | "ditolak";
}

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'MENGAJUKAN':
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Diajukan</Badge>;
        case 'DITERIMA':
            return <Badge variant="default" className="bg-green-100 text-green-800">Diterima</Badge>;
        case 'DITOLAK':
            return <Badge variant="destructive">Ditolak</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export default function ListTebusResep() {
    const [rescriptionList, setRescriptionList] = useState<Rescription[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchRescriptionList = async () => {
            setIsLoading(true)

            try {
                const res = await getRescriptionSubmissionList();

                if (res.success) {
                    setRescriptionList(res.data)
                } else {
                    setRescriptionList([])
                    toast.error(res.message)
                }
            } catch (error) {
                setRescriptionList([])
                console.error(`[fetchRescriptionList] Error: ${error}`);
                toast.error("Terjadi kesalahan pada server. Harap coba lagi!")
            } finally {
                setIsLoading(false)
            }
        }

        fetchRescriptionList()
    }, [])

    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white">
            <div className="pt-10" />
            <h1 className="text-2xl font-bold mb-6 text-cyan-700">Daftar Penebusan Resep</h1>

            <Link
                href="/customer/tebusresep"
                className="inline-block mb-6 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
            >
                + Upload Resep Baru
            </Link>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                </div>
            ) : rescriptionList.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <p className="text-gray-500">Kamu belum pernah mengajukan resep.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {rescriptionList.map(rescription => (
                        <li key={rescription.id} className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
                            <div>
                                {/* <p className="font-semibold">Kode Tebus Resep: {rescription.id}</p> */}
                                <Link
                                    href={rescription.foto_resep}
                                    target='_blank'
                                    className="underline text-blue-600 hover:text-blue-400 transition duration-300"
                                >
                                    Foto Resep
                                </Link>
                                <p className="text-sm text-gray-500 mb-1">Tanggal upload: {rescription.tanggal_pengajuan.toLocaleDateString('id-ID')}</p>
                                { StatusBadge({status: rescription.status}) }
                            </div>
                            
                            <DetailTebusResepDialogCustomer rescription={rescription} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
