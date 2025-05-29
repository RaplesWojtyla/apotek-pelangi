import { checkRole } from "@/lib/clerk"
import { redirect } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import Keranjang from "@/components/kasir/SideCart"
import CatalogProducts from "@/components/kasir/CatalogProductKasir"
import ProductPagination from "@/components/Pagination"

export default async function DashboardKasirPage() {
  const isAuthorized = await checkRole("KASIR")

  if (!isAuthorized) {
    return redirect("/unauthorized")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      
      <div className="flex-1">
        <SearchBar />
        <h1 className="text-2xl font-bold mb-6">Semua Produk</h1>
        <CatalogProductsWrapper />
        <ProductPagination />
      </div>

      {/* Keranjang */}
      <div className="hidden lg:block w-[380px] flex-shrink-0">
        <aside className="sticky top-4 w-full bg-white border shadow-md rounded-md max-h-[calc(100vh-2rem)] overflow-y-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-cyan-600">🛒 Keranjang</h2>
          <Keranjang />
        </aside>
      </div>
    </div>
  )
}

// Pisahkan wrapper ini agar pakai Client Component
function CatalogProductsWrapper() {
  // bisa juga pakai `useSearchParams` di sini
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const search = searchParams.get("matcher") ?? ""
  const page = Number(searchParams.get("page") ?? 1)
  const take = 4

  return <CatalogProducts search={search} currPage={page} take={take} />
}
