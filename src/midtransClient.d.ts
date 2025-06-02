declare module 'midtrans-client'

declare global {
	interface Window {
		snap: {
			pay: (snap_token: string, options?: SnapPayOptions) => void
		}
	}
}

interface SnapOnSuccessResult {
	status_code: string
	status_message: string
	transaction_id: string
	order_id: string
	gross_amount: string
	payment_type: string
	transaction_time: string
	transaction_status: string
	fraud_status: string
	currency?: string
	payment_code?: string
}

interface SnapOnPendingResult {
	status_code: string
	status_message: string
	transaction_id: string
	order_id: string
	gross_amount: string
	payment_type: string
	transaction_time: string
	transaction_status: string
	pdf_url?: string
	finish_redirect_url?: string
}

interface SnapOnErrorResult {
	status_code: string
	status_message: string[]
}

interface SnapPayOptions {
	onSuccess?: (result: SnapOnSuccessResult) => void
	onPending?: (result: SnapOnPendingResult) => void
	onError?: (result: SnapOnErrorResult) => void
	onClose?: () => void
}

export {}