import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cyan-500 text-white px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-30">
        <div className="flex items-start gap-30">
          <div className="rounded-xl p-3">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Alamat</h3>
            <p className="text-sm leading-relaxed">
              Jl. Iskandar Muda No.24F, Darat, <br />
              Kec. Medan Baru, Kota Medan, <br />
              Sumatera Utara 20154
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Hubungi Kami</h3>
          <p className="text-sm leading-relaxed">
            +62 812 5668 9108 <br />
            apotek-pelangi@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}