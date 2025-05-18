import TutorTebus from "@/components/TutorTebus";

export default function TebusResep() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <h1 className="text-xl font-bold mb-4">Tebus Resep</h1>

      {/* Upload Box */}
      <label className="border-2 border-cyan-400 border-dashed rounded-lg h-64 flex items-center justify-center mb-4 cursor-pointer overflow-hidden relative">
        <input
          type="file"
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <div className="text-center text-sm text-gray-500 pointer-events-none">
          <div className="text-2xl">+</div>
          <p className="mt-2">Unggah Foto Resep</p>
        </div>
      </label>

      {/* Optional Note */}
      <textarea
        placeholder="Tambahkan Catatan (Opsional)..."
        className="w-full border border-cyan-400 rounded-md p-2 mb-4"
      />

      {/* Submit Button */}
      <div className="text-center mb-6">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95">
          Tebus Resep Obat
        </button>
      </div>

      {/* Accordion Section */}
      <TutorTebus />
    </div>
  );
}
