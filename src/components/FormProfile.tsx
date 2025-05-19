import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
export default function FormProfile() {
  return (
    <div className="md:col-span-3 bg-white border rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Foto */}
        <div className="flex flex-col items-center w-full md:max-w-xs">
          <div className="w-44 h-44 border rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Preview"
              className="h-full object-cover"
            />
          </div>
          <label className="mt-4">
            <input type="file" accept="image/*" className="hidden" />
            <div className="px-4 py-1 border rounded-md text-sm text-cyan-700 cursor-pointer hover:bg-cyan-50">
              Pilih Foto
            </div>
          </label>
          <Button variant="outline" className="mt-4 text-cyan-700 text-sm">
            <Pencil className="w-4 h-4 mr-2" />
            Ubah Kata Sandi
          </Button>
        </div>

        {/* Form */}
        <form className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <Input placeholder="Masukkan nama lengkap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input type="email" placeholder="Masukkan email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin
            </label>
            <Input placeholder="Contoh: Laki-laki / Perempuan" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No Handphone
            </label>
            <Input placeholder="Contoh: 0812xxxxxxx" />
          </div>
          <Button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white w-full md:w-auto mt-6"
          >
            Simpan Pengaturan Akun
          </Button>
        </form>
      </div>
    </div>
  );
}
