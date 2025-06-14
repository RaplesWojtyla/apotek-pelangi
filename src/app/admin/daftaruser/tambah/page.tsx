'use client'

import { useTransition } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Send } from "lucide-react"
import { inviteCashier } from "@/action/admin/cashier.action"

export default function TambahUserPage() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			const result = await inviteCashier(formData)
			if (result.success) {
				toast.success(result.message)
				router.push('/admin/daftaruser')
			} else {
				toast.error(result.message)
			}
		})
	}

	return (
		<div className="min-h-screen p-6 bg-background text-foreground">
			<div className="mb-6 text-sm text-muted-foreground">
				<Link href="/admin/daftaruser" className="hover:underline">
					Daftar Pengguna
				</Link>{" "}
				&gt; <span className="text-foreground font-medium">Undang Kasir</span>
			</div>

			<h1 className="text-3xl font-bold mb-8">Undang Kasir Baru</h1>

			<div className="w-full max-w-2xl bg-card p-6 rounded-xl shadow-sm border space-y-6">
				<form action={handleSubmit} className="space-y-4">
					<h2 className="text-lg font-semibold text-foreground">Kirim Undangan via Email</h2>
					<p className="text-sm text-muted-foreground">
						Masukkan alamat email calon kasir. Sistem akan mengirimkan link pendaftaran
						di mana mereka dapat membuat akun mereka sendiri.
					</p>

					<div>
						<Label htmlFor="email" className="mb-2 block">
							Email Calon Kasir <span className="text-red-500">*</span>
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Contoh: budi.kasir@apotekpelangi.com"
							required
						/>
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t">
						<Link href="/admin/daftaruser">
							<Button type="button" variant="outline" disabled={isPending}>Batal</Button>
						</Link>
						<Button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700 gap-2" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" /> Mengirim...
								</>
							) : (
								<>
									<Send className="w-4 h-4" /> Kirim Undangan
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}