'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Barang {
  nama: string;
  jumlah: number;
  harga: number;
  gambar?: string;
}

interface TransaksiOfflineDialogProps {
  id?: string;
  nama?: string;
  tanggal?: string;
  total?: number;
  status?: string;
  barang?: Barang[];
}

export default function TransaksiOfflineDialog({
  id = 'TX-000',
  nama = '-',
  tanggal = '-',
  total = 0,
  status = '-',
  barang = [],
}: TransaksiOfflineDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Lihat Detail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Transaksi Offline</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm mb-4">
          <p><strong>ID Transaksi:</strong> {id}</p>
          <p><strong>Nama:</strong> {nama}</p>
          <p><strong>Tanggal:</strong> {tanggal}</p>
          <p><strong>Total:</strong> Rp {total.toLocaleString()}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Daftar Barang:</h4>
          <ScrollArea className="max-h-48 rounded border border-gray-200">
            <ul className="divide-y">
              {barang.length > 0 ? (
                barang.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-2">
                    <img
                      src={item.gambar || '/placeholder.png'}
                      alt={item.nama}
                      className="w-14 h-14 object-cover rounded border border-gray-300"
                    />
                    <div>
                      <p className="font-medium">{item.nama}</p>
                      <p className="text-sm text-gray-600">
                        Jumlah: {item.jumlah} × Rp{item.harga.toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-2">Tidak ada barang.</p>
              )}
            </ul>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
