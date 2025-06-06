'use server'

import { prisma } from "@/lib/prisma";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { LevelUser, StatusUser } from "@prisma/client";
import { revalidatePath } from "next/cache"

export type DbUser = Awaited<ReturnType<typeof getUserByClerkId>>

export const syncUser = async () => {
	try {
		const user = await currentUser();

		if (!user) return null

		const client = await clerkClient();
		const role = user.publicMetadata?.metadata?.role ?? "CUSTOMER";

		const dbUser = await prisma.user.upsert({
			where: { clerkId: user.id },
			update: {
				nama: user.fullName,
				email: user.emailAddresses[0].emailAddress,
				foto_profil: user.imageUrl,
				// no_hp: user.phoneNumbers[0]?.phoneNumber || ""
			},
			create: {
				clerkId: user.id,
				nama: user.fullName,
				email: user.emailAddresses[0].emailAddress,
				foto_profil: user.imageUrl,
				role: role,
			},
		});

		await client.users.updateUserMetadata(user.id, {
			publicMetadata: {
				metadata: {
					role: dbUser.role,
				},
			},
		});

		return dbUser;
	} catch (e) {
		console.error(e);

		throw new Error("Terjadi kesalahan saat membaca akun user.");
	}
};

export const getUserByClerkId = async (clerkId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkId,
			},
		});

		if (!user) return syncUser()

		return user;
	} catch (error) {
		console.error(error);

		throw new Error("Terjadi kesalahan saat mengambil data user.");
	}
};

export const getUsersByRole = async (role: LevelUser) => {
	try {
		const users = await prisma.user.findMany({
			where: { role },
		});
		return users;
	} catch (error) {
		console.error(error);
		throw new Error("Terjadi Kesalahan saat mengambil data berdasarkan role.");
	}
};

export const getUsersByStatus = async (status: StatusUser) => {
	try {
		const users = await prisma.user.findMany({
			where: { status },
		});
		return users;
	} catch (error) {
		console.error(error);
		throw new Error(
			"Terjadi Kesalahan saat mengambil data berdasarkan status."
		);
	}
};

export const getDbUserId = async () => {
	const { userId: clerkId } = await auth()

	if (!clerkId) return null

	try {
		const dbUserId = await getUserByClerkId(clerkId)

		return dbUserId?.id
	} catch (error) {
		console.error(error)

		throw new Error("Gagal mengambil ID user")
	}
}

export const setUserAsCashier = async (clerkId: string) => {
	try {
		const updatedKasir = await prisma.user.update({
			where: {
				clerkId,
			},
			data: {
				role: LevelUser.KASIR,
			},
		});
		revalidatePath('/')

		return {
			success: true,
			status: 200,
			message: "Role User berhasil diperbarui",
			data: updatedKasir,
		}
	} catch (error) {
		console.error("[setUserAsKasir] error:", error);
		throw new Error("Gagal mengubah user menjadi kasir.");
	}
};

export const updateUser = async (
	clerkId: string,
	nama: string,
	no_hp: string,
	alamat: string
) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { clerkId },
			data: {
				nama,
				no_hp,
				alamat,
			},
		});
		revalidatePath('/')

		return {
			success: true,
			status: 200,
			message: "Data berhasil diperbarui",
			data: updatedUser,
		}
	} catch (error) {
		console.error("[updateKasir] error:", error);
		throw new Error("Gagal mengupdate data kasir.");
	}
};

export const nonActiveUser = async (clerkId: string) => {
	try {
		const nonAktifUser = await prisma.user.update({
			where: { clerkId },
			data: {
				status: "NONAKTIF",
			},
		});
		revalidatePath('/')

		return {
			success: true,
			status: 200,
			message: "User berhasil dinonaktifkan",
			data: nonAktifUser,
		}
	} catch (error) {
		console.error("[deleteKasir] error:", error);
		throw new Error("Gagal menghapus kasir.");
	}
};

