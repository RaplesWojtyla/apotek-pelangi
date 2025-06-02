'use client';

import { useState } from 'react';

// Badge sederhana dengan variant
function Badge({
  variant = 'default',
  children,
}: {
  variant?: 'default' | 'secondary' | 'destructive' | 'success';
  children: React.ReactNode;
}) {
  let className = 'inline-block px-2 py-1 rounded text-sm font-semibold ';
  switch (variant) {
    case 'secondary':
      className += 'bg-gray-200 text-gray-800';
      break;
    case 'destructive':
      className += 'bg-red-500 text-white';
      break;
    case 'success':
      className += 'bg-green-600 text-white';
      break;
    default:
      className += 'bg-cyan-600 text-white';
  }
  return <span className={className}>{children}</span>;
}

// Button sederhana dengan variant
function Button({
  variant = 'default',
  size = 'md',
  onClick,
  children,
}: {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'sm' | 'md';
  onClick?: () => void;
  children: React.ReactNode;
}) {
  let className = 'rounded font-semibold focus:outline-none ';
  if (size === 'sm') className += 'text-sm px-3 py-1 ';
  else className += 'px-4 py-2 ';

  switch (variant) {
    case 'outline':
      className += 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50';
      break;
    case 'destructive':
      className += 'bg-red-600 text-white hover:bg-red-700';
      break;
    default:
      className += 'bg-cyan-600 text-white hover:bg-cyan-700';
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

// Dialog sederhana
function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-md max-w-xl w-full p-6 max-h-[80vh] overflow-y-auto shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}

export default function TransaksiDetailDialog() {
  const [open, setOpen] = useState(false);

  // Hardcoded steps dan current step index (misal 'dikemas' = 2)
  const steps = [
    'Pesanan dibuat',
    'Pesanan dibayar',
    'Pesanan dikemas',
    'Menunggu pengambilan',
    'Selesai',
  ];
  const currentStepIndex = 2; // misal status "dikemas"

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Lihat Detail
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <h2 className="text-2xl font-bold text-cyan-700 mb-6">
          Detail Transaksi - TRX123456
        </h2>

        {/* Progress bar vertikal */}
        <div className="flex flex-col relative ml-4 mb-6">
          {steps.map((step, idx) => {
            const isActive = idx <= currentStepIndex;
            return (
              <div key={idx} className="flex items-start gap-3 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isActive ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-[2px] h-8 ${
                        isActive ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isActive ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Detail transaksi hardcoded */}
        <div className="border rounded-md p-4 mb-6 space-y-2">
          <p>
            <span className="font-semibold">Nama Pelanggan: </span>Andi Saputra
          </p>
          <p>
            <span className="font-semibold">Tanggal: </span>2025-06-03
          </p>
          <p>
            <span className="font-semibold">Status: </span>
            <Badge variant="secondary">Pesanan dikemas</Badge>
          </p>
          <p>
            <span className="font-semibold">Total: </span>Rp150.000
          </p>
        </div>

        {/* Daftar barang hardcoded */}
        <div>
          <h4 className="font-semibold mb-2">Daftar Barang:</h4>
          <ul className="divide-y max-h-48 overflow-y-auto border rounded border-gray-200">
            <li className="flex items-center gap-3 p-2">
              <img
                src="/obat_a.jpg"
                alt="Obat A"
                className="w-14 h-14 object-cover rounded border border-gray-300"
              />
              <div>
                <p className="font-medium">Obat A</p>
                <p className="text-sm text-gray-600">Jumlah: 2 × Rp50.000</p>
              </div>
            </li>
            <li className="flex items-center gap-3 p-2">
              <img
                src="/obat_b.jpg"
                alt="Obat B"
                className="w-14 h-14 object-cover rounded border border-gray-300"
              />
              <div>
                <p className="font-medium">Obat B</p>
                <p className="text-sm text-gray-600">Jumlah: 1 × Rp50.000</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="default">Konfirmasi</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </div>
      </Dialog>
    </>
  );
}
