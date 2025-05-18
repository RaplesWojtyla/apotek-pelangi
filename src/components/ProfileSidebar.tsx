import { User, MapPin, FileText } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <div className="md:col-span-1 bg-white border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/user-avatar.png"
          alt="Avatar"
          className="w-28 h-28 rounded-full border object-cover"
        />
        <div className="text-center">
          <h2 className="font-semibold text-lg">Patra Gek</h2>
          <p className="text-sm text-gray-500">patragek@gmail.com</p>
        </div>
        <div className="flex flex-col gap-4 w-full text-sm mt-6">
          <div className="flex items-center gap-2 text-cyan-700 font-medium">
            <User className="w-4 h-4" />
            <span>Akun</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-cyan-700 cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>Transaksi</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-cyan-700 cursor-pointer">
            <MapPin className="w-4 h-4" />
            <span>Alamat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
