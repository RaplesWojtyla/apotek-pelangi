interface CheckoutItemDetail {
	id_cart: string;
	id_barang: string;
	jumlah: number;
	harga_saat_checkout: number;
	id_resep?: string | null;
}

interface CheckoutPayload {
	items: CheckoutItemDetail[];
	namaPenerima: string;
	noHpPenerima: string; 
	alamatPengiriman: string;
	metodePembayaran: string; 
	keterangan?: string;
}