import { useState } from 'react'
import { useUnauthContext } from '@contexts/UserContext/userContext'
import { AuthAccessContext } from './authAccessContext'
import { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'
import { PANELS } from '../../constants/panels.constants'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'
import type { AuthAccessContextValue, Panels, ServerError } from './models/context.models'
import type { ValueOf } from '@customTypes/customUtilityTypes'

export default function AuthAccessProvider({ children }: PropsOnlyChildren): ReactNode {
	const { toggleAuthAccessModalOpen } = useUnauthContext()
	const [currentPanel, setCurrentPanel] = useState<Panels>(PANELS.signIn)
	const [isLoading, setIsLoading] = useState(false)
	const [serverError, setServerError] = useState<ServerError>(null)

	const handleAuthAccess = async (onAuth: () => Promise<void>): Promise<void> => {
		try {
			setIsLoading(true)

			if (serverError !== null) {
				setServerError(null)
			}

			await onAuth()
			toggleAuthAccessModalOpen()
		} catch (err) {
			const error = (err as Error).message as ValueOf<typeof AUTH_ERROR_TYPES>

			if (error === AUTH_ERROR_TYPES.popupError) return

			setServerError(error)
		} finally {
			setIsLoading(false)
		}
	}

	const value: AuthAccessContextValue = {
		currentPanel,
		setCurrentPanel,
		isLoading,
		setServerError,
		serverError,
		handleAuthAccess,
	}

	return <AuthAccessContext value={value}>{children}</AuthAccessContext>
}
