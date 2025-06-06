import TutorTebus from "@/components/TutorTebus";

export default function TebusResep() {

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 max-w-3xl mx-auto">
      <div className="pt-10" />
      <h1 className="text-2xl font-bold mb-2 text-cyan-700">Tebus Resep</h1>

      <p className="text-sm text-gray-600 mb-6">
        Unggah foto resep dari dokter untuk kami proses. Setelah disetujui, obat akan masuk ke keranjang dan bisa dibayar melalui halaman checkout.
      </p>

      {/* Upload Box */}
      <label
        className="border-2 border-cyan-400 border-dashed rounded-lg h-64 flex flex-col items-center justify-center mb-4 cursor-pointer overflow-hidden relative hover:border-cyan-600 transition-colors px-4 text-center"
      >
        <input
         type="file"
          accept="image/*"
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <div className="text-6xl mb-2 select-none">📷</div>
        <p className="font-semibold">Unggah Foto Resep (Opsional)</p>
        <p className="mt-1 text-xs text-gray-400">Format: jpg/png, Max 5MB</p>
      </label>

      {/* File info
      {fileName && (
        <div className="mb-4 text-sm text-gray-700 text-center">
          <span className="font-semibold">File:</span> {fileName}
        </div>
      )} */}

      {/* Optional Note */}
      <textarea
        placeholder="Tambahkan Catatan (Opsional)..."
        className="w-full border border-cyan-400 rounded-md p-2 mb-4 resize-none"
        rows={4}
      />

      {/* Submit Button */}
      <div className="text-center mb-6">
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all"
        > Tebus Resep Obat
        {/* {`bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 transform ${isLoading ? "cursor-not-allowed opacity-70" : "hover:-translate-y-0.5 active:scale-95"
            } flex items-center justify-center mx-auto gap-2`} */}
          {/* {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isLoading ? "Memproses..." : "Tebus Resep Obat"} */}
        </button>
      </div>

      {/* Directions / Next steps */}
      <div className="mb-6 text-center text-sm text-gray-700">
        <p>
          Setelah mengupload resep, kamu bisa cek status penebusan di halaman{" "}
          <a
            href="/customer/tebusresep/list"
            className="text-cyan-600 font-semibold underline"
          >
            Daftar Penebusan Resep
          </a>
          .
        </p>
      </div>

      {/* Accordion Section */}
      <TutorTebus />
    </div>
  );
}
