export { }

export type Roles = 'ADMIN' | 'KASIR' | 'CUSTOMER'

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles
		}
	}

	interface UserPublicMetadata {
		metadata: {
			role?: Roles
		}
	}

	interface Window {
		Clerk: any
	}
}