export type AuthContextValue = {
	isAuthenticated: boolean
	signOut: () => Promise<void>
}
