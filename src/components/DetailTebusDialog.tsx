"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function DetailTebusResepDialog() {
  type Status = "diajukan" | "menunggu" | "konfirmasi" | "ditolak";
  const [status, setStatus] = useState<Status>("menunggu");
  const [open, setOpen] = useState(false);
  const [keranjang, setKeranjang] = useState<{ nama: string; jumlah: number }[]>([]);
  const [selected, setSelected] = useState("");
  const [jumlah, setJumlah] = useState(1);

  const katalog = [
    "Paracetamol 500mg",
    "Amoxicillin 250mg",
    "Vitamin C 100mg",
  ];

  const steps = [
    { key: "diajukan", label: "Resep Diajukan" },
    { key: "menunggu", label: "Menunggu Konfirmasi" },
    { key: "selesai", label: status === "ditolak" ? "Ditolak" : "Dikonfirmasi" },
  ];

  const currentStepIndex =
    status === "diajukan" ? 0 : status === "menunggu" ? 1 : 2;

  const tambahKeKeranjang = () => {
    if (!selected || jumlah < 1) return;
    const sudahAda = keranjang.find((b) => b.nama === selected);
    if (sudahAda) {
      setKeranjang(
        keranjang.map((b) =>
          b.nama === selected ? { ...b, jumlah: b.jumlah + jumlah } : b
        )
      );
    } else {
      setKeranjang([...keranjang, { nama: selected, jumlah }]);
    }
    setSelected("");
    setJumlah(1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Lihat Detail
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[90vh]">
          <Dialog.Title className="text-lg font-bold mb-4 text-cyan-700">
            Detail Penebusan Resep
          </Dialog.Title>

          <div className="mb-6 flex justify-center">
            <img
              src="/"
              alt="Foto Resep"
              className="max-h-52 object-contain rounded-md shadow-md"
            />
          </div>

          <div className="flex flex-col relative ml-4 mb-8">
            {steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = idx < currentStepIndex;
              const isRejected = status === "ditolak" && idx === 2;

              return (
                <div className="flex items-start gap-3 relative" key={step.key}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isRejected
                          ? "bg-red-600"
                          : isActive || isDone
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-[2px] h-8 ${
                          isRejected
                            ? "bg-red-600"
                            : idx < currentStepIndex
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isRejected
                        ? "text-red-600 font-semibold"
                        : isActive || isDone
                        ? "text-black font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border rounded-md p-4 mb-6">
            <p><span className="font-semibold">Nama File:</span> nama_file_resep.pdf</p>
            <p><span className="font-semibold">Tanggal Upload:</span> 2025-06-03</p>
            <p><span className="font-semibold">Status:</span> {status === "ditolak" ? "Ditolak" : status === "konfirmasi" ? "Dikonfirmasi" : status === "menunggu" ? "Menunggu Konfirmasi" : "Diajukan"}</p>
            <p><span className="font-semibold">Catatan:</span> {status === "ditolak" ? "Resep ditolak karena alasan tertentu." : "Tidak ada catatan."}</p>
          </div>

          {status === "menunggu" && (
            <div className="flex gap-4 justify-end">
              <Button variant="destructive" onClick={() => setStatus("ditolak")}>Tolak</Button>
              <Button onClick={() => setStatus("konfirmasi")}>Konfirmasi</Button>
            </div>
          )}

          {status === "konfirmasi" && (
            <>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Tambah Barang</h4>
                <div className="flex gap-2">
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="">Pilih barang</option>
                    {katalog.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    className="w-20 border px-2 py-1 rounded"
                  />
                  <Button onClick={tambahKeKeranjang}>Tambah</Button>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Keranjang</h4>
                {keranjang.length === 0 ? (
                  <p className="text-sm text-gray-500">Belum ada barang.</p>
                ) : (
                  <ul className="list-disc ml-5 text-sm">
                    {keranjang.map((item, idx) => (
                      <li key={idx}>{item.nama} (x{item.jumlah})</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end">
                <Button>Konfirmasi</Button>
              </div>
            </>
          )}

          <Dialog.Close asChild>
            <Button variant="outline" className="mt-6 w-full">
              Tutup
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}