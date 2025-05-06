import "../../app/globals.css";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-cyan-100 flex flex-col lg:flex-row">
      {/* Left Side - Logo */}
      <Logo />

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-cyan-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl text-center font-semibold text-cyan-700 mb-6">
            Masuk
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Masukkan No. HP atau Email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Masukkan kata sandi Anda"
                className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                <Eye />
                <EyeClosed className="hidden" />
              </span>
            </div>
            <div className="text-right text-sm mt-1">
              <Link
                href="/ForgotPassword"
                className="text-cyan-600 hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 font-semibold text-white rounded py-2 hover:bg-cyan-700 transition-colors"
            >
              Masuk
            </button>
          </form>

          <div className="text-center my-4 text-sm text-gray-500">
            atau masuk dengan
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <button className="border rounded-full p-2 hover:bg-gray-100 transition">
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            </button>
            <button className="border rounded-full p-2 hover:bg-gray-100 transition">
              <img
                src="/facebook-icon.png"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Belum punya akun?</span>{" "}
            <Link
              href="/CustDashboard"
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
