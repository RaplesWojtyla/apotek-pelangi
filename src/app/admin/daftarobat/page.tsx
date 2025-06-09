
import { getProducts } from "@/action/admin/product.action";
import DaftarObatClient from "@/components/admin/DaftarObatClient";


export default async function DaftarObatPage() {
  const initialProducts = await getProducts(); // Ambil data awal

  return <DaftarObatClient products={initialProducts} />;
}