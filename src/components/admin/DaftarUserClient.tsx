'use client'

import { useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import toast from "react-hot-toast"

import { User as UserData, LevelUser, StatusUser } from "@prisma/client"
import { deleteUser, updateUserRoleAndStatus } from "@/action/admin/user.action"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Pagination from "@/components/Pagination"

import { Pencil, Trash2, Plus, Search, User as UserIcon, MoreVertical, Eye, Loader2 } from "lucide-react"

interface DaftarUserClientProps {
	users: UserData[]
	totalUsers: number
	totalPages: number
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
	return (
		<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full sm:w-[280px]">
			<div className="p-4 rounded-full bg-blue-100 text-blue-600">{icon}</div>
			<div>
				<p className="text-sm text-muted-foreground">{title}</p>
				<h3 className="text-2xl font-bold">{value}</h3>
			</div>
		</div>
	)
}

export default function DaftarUserClient({ users, totalUsers, totalPages }: DaftarUserClientProps) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const [isPending, startTransition] = useTransition()
	const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
	const [editedData, setEditedData] = useState<{
		role: LevelUser
		status: StatusUser
	} | null>(null)

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1')
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	const handleEditClick = (user: UserData) => {
		setSelectedUser(user)
		setEditedData({ role: user.role, status: user.status })
		setOpenEditDialog(true)
	}

	const handleEditSubmit = () => {
		if (!selectedUser || !editedData) return
		startTransition(async () => {
			const result = await updateUserRoleAndStatus(selectedUser.clerkId, editedData.role, editedData.status)
			if (result.success) {
				toast.success(result.message)
				setOpenEditDialog(false)
			} else {
				toast.error(result.message)
			}
		})
	}

	const handleDelete = (clerkId: string) => {
		startTransition(async () => {
			const result = await deleteUser(clerkId)
			if (result.success) {
				toast.success(result.message)
			} else {
				toast.error(result.message)
			}
		})
	}

	return (
		<>
			<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
				<StatCard title="Total Pengguna" value={totalUsers} icon={<UserIcon className="w-6 h-6" />} />
			</div>

			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input
						placeholder="Cari nama atau email..."
						className="w-full md:w-64"
						defaultValue={searchParams.get('query')?.toString()}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
				</div>
				<Link href="/admin/daftaruser/tambah">
					<Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
						<Plus className="w-4 h-4" /> Undang Kasir
					</Button>
				</Link>
			</div>

			<div className="overflow-x-auto w-full rounded-lg shadow border bg-white">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nama</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length > 0 ? (
							users.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.nama}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>
										<span className={`px-2 py-1 rounded text-xs font-medium ${user.status === "AKTIF" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
											{user.status}
										</span>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button size="icon" variant="ghost">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => handleEditClick(user)} className="cursor-pointer gap-2"><Pencil size={14} />Edit</DropdownMenuItem>
												<AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
													<AlertDialogTrigger asChild>
														<div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-red-500 hover:bg-red-50 w-full justify-start gap-2">
															<Trash2 size={14} />Hapus
														</div>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader><AlertDialogTitle>Anda Yakin?</AlertDialogTitle><AlertDialogDescription>Aksi ini akan menghapus pengguna '{user.nama}' secara permanen. Data yang terhapus tidak dapat dikembalikan.</AlertDialogDescription></AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Batal</AlertDialogCancel>
															<Button variant="destructive" onClick={() => handleDelete(user.clerkId)} disabled={isPending}>{isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Hapus'}</Button>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Tidak ada pengguna ditemukan.</TableCell></TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="mt-6 flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>

			<Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
				<DialogContent>
					<DialogHeader><DialogTitle>Edit Pengguna: {selectedUser?.nama}</DialogTitle></DialogHeader>
					<div className="space-y-4 mt-2">
						<div>
							<Label htmlFor="editUserRole">Role</Label>
							<Select value={editedData?.role} onValueChange={(value) => setEditedData(prev => ({ ...prev!, role: value as LevelUser }))}>
								<SelectTrigger><SelectValue /></SelectTrigger>
								<SelectContent>
									<SelectItem value="ADMIN">Admin</SelectItem>
									<SelectItem value="KASIR">Kasir</SelectItem>
									<SelectItem value="CUSTOMER">Customer</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="editUserStatus">Status</Label>
							<Select value={editedData?.status} onValueChange={(value) => setEditedData(prev => ({ ...prev!, status: value as StatusUser }))}>
								<SelectTrigger><SelectValue /></SelectTrigger>
								<SelectContent>
									<SelectItem value="AKTIF">Aktif</SelectItem>
									<SelectItem value="NONAKTIF">Nonaktif</SelectItem>
									<SelectItem value="BANNED">Banned</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex justify-end gap-2 pt-2">
							<Button variant="outline" onClick={() => setOpenEditDialog(false)}>Batal</Button>
							<Button onClick={handleEditSubmit} disabled={isPending}>{isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan'}</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}