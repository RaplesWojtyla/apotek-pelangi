"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreVertical, Plus, Search, Building2, Eye, Pencil, Trash2, ChevronsUpDown }
from "lucide-react";

// Definisikan tipe untuk vendor agar lebih terstruktur, hanya menyertakan yang relevan
interface Vendor {
  id: string;
  name: string;
}

// Data dummy yang disederhanakan
const vendors: Vendor[] = [
  { id: "v001", name: "PT Farma Jaya" },
  { id: "v002", name: "CV Medika Sehat" },
  { id: "v003", name: "PT Apotek Sentosa" },
  { id: "v004", name: "UD Kesehatan Bersama" },
  { id: "v005", name: "PT Herbalindo" },
  { id: "v006", name: "CV Sumber Obat" },
  { id: "v007", name: "PT Medika Nusantara" },
  { id: "v008", name: "CV Apotek Abadi" },
];

export default function VendorPage() {
  const [search, setSearch] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // State untuk sorting (hanya untuk kolom 'name' jika diinginkan)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vendor;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  // Menggunakan useMemo untuk melakukan sorting pada data yang sudah difilter
  const sortedAndFilteredVendors = useMemo(() => {
    let sortableVendors = [...filteredVendors];

    if (sortConfig !== null) {
      sortableVendors.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const res = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
          return sortConfig.direction === 'asc' ? res : -res;
        }
        return 0; // Seharusnya tidak tercapai jika hanya string yang disortir
      });
    }
    return sortableVendors;
  }, [filteredVendors, sortConfig]);


  const handleView = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setOpenViewDialog(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setOpenAlertDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedVendor) {
      console.log("Delete vendor:", selectedVendor.name);
      // TODO: Implement actual deletion and state update (remove from `vendors` array)
      setOpenAlertDialog(false);
      setSelectedVendor(null);
    }
  };

  const handleAddVendor = () => {
    console.log("Add new vendor");
    // TODO: Implement actual add and state update (add to `vendors` array)
    setOpenAddDialog(false);
  };

  const handleSaveEditVendor = () => {
    console.log("Save edited vendor:", selectedVendor?.name);
    // TODO: Implement actual edit and state update (update `vendors` array)
    setOpenEditDialog(false);
  };

  // Fungsi sorting untuk kolom "Vendor"
  const handleSort = (key: keyof Vendor) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="p-6 space-y-6 max-w-[1240px] mx-auto">
      <div className="text-sm text-muted-foreground">
        Vendor &gt; <span className="text-foreground font-medium">List</span>
      </div>

      <h1 className="text-3xl font-bold">Vendor</h1>

      {/* StatCard */}
      <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[280px] mb-6">
        <div className="p-4 rounded-full bg-cyan-100">
          <Building2 className="text-cyan-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Vendor</p>
          <h3 className="text-2xl font-bold">{vendors.length}</h3>
        </div>
      </div>

      {/* Search & Tambah Vendor */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Cari vendor..."
            className="w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Modal Tambah Vendor */}
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Vendor Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label htmlFor="vendorName" className="mb-3 block">
                  Nama Vendor
                </Label>
                <Input
                  id="vendorName"
                  placeholder="Contoh: PT Sehat Sentosa"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Batal</Button>
                <Button className="bg-cyan-600 text-white hover:bg-cyan-700" onClick={handleAddVendor}>
                  Simpan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <Table className="w-full text-sm">
          <TableHeader className="text-left text-muted-foreground border-b">
            <TableRow>
              <TableHead
                className="py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Vendor
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="py-2 px-3 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredVendors.length > 0 ? (
              sortedAndFilteredVendors.map((vendor, i) => (
                <TableRow key={vendor.id} className="border-b hover:bg-muted/50">
                  <TableCell className="py-2 px-3">{vendor.name}</TableCell>
                  <TableCell className="py-2 px-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="w-4 h-4 text-cyan-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(vendor)} className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(vendor)} className="cursor-pointer">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(vendor)} className="text-red-500 hover:text-red-600 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={2} className="py-8 text-muted-foreground">
                  Tidak ada vendor ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Lihat Vendor */}
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p><strong>ID Vendor:</strong> {selectedVendor?.id}</p>
            <p><strong>Nama Vendor:</strong> {selectedVendor?.name}</p>
            <p className="text-muted-foreground text-sm mt-4">Ini adalah contoh tampilan detail. Data riil akan diambil dari database.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit Vendor */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Vendor: {selectedVendor?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="editVendorName" className="mb-3 block">
                Nama Vendor
              </Label>
              <Input
                id="editVendorName"
                defaultValue={selectedVendor?.name || ""}
                placeholder="Nama vendor baru"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Batal</Button>
              <Button className="bg-cyan-600 text-white hover:bg-cyan-700" onClick={handleSaveEditVendor}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda Yakin Ingin Menghapus Vendor Ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Data vendor "{selectedVendor?.name}" yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}