import { Logo } from "@/components/logo";
import Link from "next/link";

export default function SignIn() {
    return(
        <div className="min-h-screen bg-cyan-100 flex flex-col lg:flex-row">
      {/* Left Side - Logo */}
      <Logo />

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-cyan-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl text-center font-semibold text-cyan-700 mb-6">
            Lupa Kata Sandi
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Masukkan No. HP atau Email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="submit"
              className="w-full bg-cyan-600 font-semibold text-white rounded py-2 hover:bg-cyan-700 transition-colors"
            >
              Verifikasi email / No. HP
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Belum punya akun?</span>{" "}
            <Link
              href="/Register"
              className="text-cyan-600 font-medium hover:underline"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
}