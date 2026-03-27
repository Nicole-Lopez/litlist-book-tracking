import { lazy } from 'react'
import { useAuthContext } from '@contexts/UserContext/userContext'
import type { ReactNode } from 'react'

const AuthAccessButton = lazy(
	() => import('./components/AuthAccessButton/AuthAccessButton'),
)

const UserActionsMenu = lazy(() => import('./components/UserActionsMenu/UserActionsMenu'))

export default function User(): ReactNode {
	const { isAuthenticated } = useAuthContext()

	if (isAuthenticated) {
		return <UserActionsMenu />
	}

	return <AuthAccessButton />
}
