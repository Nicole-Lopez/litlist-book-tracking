import { useContext, createContext } from 'react'
import type { AuthAccessContextValue } from './models/context.models'

export const AuthAccessContext = createContext<AuthAccessContextValue | undefined>(
	undefined,
)

export function useAuthAccessContext(): AuthAccessContextValue {
	const context = useContext(AuthAccessContext)

	if (context === undefined)
		throw new Error('useAuthAccessContext must be used within a AuthAccessProvider')

	return context
}
