"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function DetailTebusResepDialog() {
  type Status = "diajukan" | "menunggu" | "konfirmasi" | "ditolak";
  const [status, setStatus] = useState<Status>("menunggu");
  const [open, setOpen] = useState(false);

  // Step dan labelnya
  const steps = [
    { key: "diajukan", label: "Resep Diajukan" },
    { key: "menunggu", label: "Menunggu Konfirmasi" },
    { key: "selesai", label: status === "ditolak" ? "Ditolak" : "Dikonfirmasi" },
  ];

  // Tentukan step aktif (index)
  const currentStepIndex =
    status === "diajukan"
      ? 0
      : status === "menunggu"
      ? 1
      : 2;

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

          {/* Foto Resep */}
          <div className="mb-6 flex justify-center">
            <img
              src="/"
              alt="Foto Resep"
              className="max-h-52 object-contain rounded-md shadow-md"
            />
          </div>

          {/* Progress Step */}
          <div className="flex flex-col relative ml-4 mb-8">
            {steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = idx < currentStepIndex;

              // Warna merah jika step terakhir dan status ditolak
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

          {/* Info Detail */}
          <div className="border rounded-md p-4 mb-6">
            <p>
              <span className="font-semibold">Nama File:</span> nama_file_resep.pdf
            </p>
            <p>
              <span className="font-semibold">Tanggal Upload:</span> 2025-06-03
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {status === "ditolak"
                ? "Ditolak"
                : status === "konfirmasi"
                ? "Dikonfirmasi"
                : status === "menunggu"
                ? "Menunggu Konfirmasi"
                : "Diajukan"}
            </p>
            <p>
              <span className="font-semibold">Catatan:</span>{" "}
              {status === "ditolak" ? "Resep ditolak karena alasan tertentu." : "Tidak ada catatan."}
            </p>
          </div>

          {/* Tombol Konfirmasi/Tolak muncul hanya saat status menunggu */}
          {status === "menunggu" && (
            <div className="flex gap-4 justify-end">
              <Button variant="destructive" onClick={() => setStatus("ditolak")}>
                Tolak
              </Button>
              <Button variant="default" onClick={() => setStatus("konfirmasi")}>
                Konfirmasi
              </Button>
            </div>
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
