import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
			<div className="flex flex-col items-center space-y-4">
				<Loader2 className="h-16 w-16 animate-spin text-cyan-500" />
				<p className="text-xl font-semibold text-muted-foreground">
					Sedang Memuat...
				</p>
				<p className="text-md text-muted-foreground">
					Mohon tunggu sebentar, kami sedang menyiapkan data untuk Anda.
				</p>
			</div>
		</div>
	);
}