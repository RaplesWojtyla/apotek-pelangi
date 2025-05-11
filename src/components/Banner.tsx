import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-[url('/bg-bn.png')] bg-cover bg-center py-8 px-6">
      <div className=" rounded-lg max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center p-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-5xl font-bold mb-2">
            Selamat Datang, <span className="text-cyan-500">Woila</span>
          </h1>
          <p className="text-sm text-gray-600 mt-5 mb-2">
            Apotek Pelangi adalah Apotek online terpercaya dengan produk 100%
            asli, bersertifikat BPOM, pengiriman cepat, dan jaminan uang
            kembali.
          </p>
        </div>
        <Image
          src="/banner.png"
          alt="Banner Obat"
          width={600}
          height={400}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
