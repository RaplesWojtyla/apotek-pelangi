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

interface TransaksiOfflineDialogProps {
  id?: string;
  nama?: string;
  tanggal?: string;
  total?: number;
  status?: string;
}

export default function TransaksiOfflineDialog({
  id = 'TX-000',
  nama = '-',
  tanggal = '-',
  total = 0,
  status = '-',
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
        <div className="space-y-2 text-sm">
          <p><strong>ID Transaksi:</strong> {id}</p>
          <p><strong>Nama:</strong> {nama}</p>
          <p><strong>Tanggal:</strong> {tanggal}</p>
          <p><strong>Total:</strong> Rp {total.toLocaleString()}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
