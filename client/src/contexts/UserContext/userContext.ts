import { useContext, createContext } from 'react'
import type { AuthContextValue } from './models/context.models'
import type { UnauthContextValue } from './contexts/UnauthContext/models/context.models'
import type {
	UserSummaryActionsContextValue,
	UserSummaryContextValue,
} from './contexts/UserSummaryContext/models/context.models'

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuthContext(): AuthContextValue {
	const context = useContext(AuthContext)

	if (context === undefined)
		throw new Error('useAuthContext must be used within a UserProvider')

	return context
}

export const UnauthContext = createContext<UnauthContextValue | undefined>(undefined)

export function useUnauthContext(): UnauthContextValue {
	const context = useContext(UnauthContext)

	if (context === undefined)
		throw new Error('useUnauthContext must be used within a UnauthProvider')

	return context
}

export const UserSummaryContext = createContext<UserSummaryContextValue | undefined>(
	undefined,
)

export function useUserSummaryContext(): UserSummaryContextValue {
	const context = useContext(UserSummaryContext)

	if (context === undefined)
		throw new Error('useUserSummaryContext must be used within a UserSummaryProvider')

	return context
}

export const UserSummaryActionsContext = createContext<
	UserSummaryActionsContextValue | undefined
>(undefined)
