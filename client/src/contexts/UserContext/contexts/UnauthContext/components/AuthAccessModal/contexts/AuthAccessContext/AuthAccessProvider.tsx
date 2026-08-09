import { useState } from 'react'
import { PANELS, SERVER_ERROR_TYPES } from '../../constants/panels.constants'
import { AuthAccessContext } from './authAccessContext'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'
import type {
	AuthAccessContextValue,
	Panels,
	ServerError,
	ServerErrorType,
} from './models/context.models'

export default function AuthAccessProvider({ children }: PropsOnlyChildren): ReactNode {
	const [currentPanel, setCurrentPanel] = useState<Panels>(PANELS.signIn)
	const [isLoading, setIsLoading] = useState(false)
	const [serverError, setServerError] = useState<ServerError>(null)

	const submitAuth = async (onAuth: () => Promise<void>): Promise<void> => {
		try {
			setIsLoading(true)

			if (serverError) {
				setServerError(null)
			}

			await onAuth()
		} catch (err) {
			if (
				err instanceof Error &&
				(SERVER_ERROR_TYPES as string[]).includes(err.message)
			) {
				setServerError(err.message as ServerErrorType)
			}
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
		submitAuth,
	}

	return <AuthAccessContext value={value}>{children}</AuthAccessContext>
}
