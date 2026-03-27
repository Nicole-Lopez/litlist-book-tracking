import { useEffect, useState, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { useExponentialRetry } from '@hooks/useExponentialRetry'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { AUTH_SERVER_ERROR_MESSAGES_ROOT } from './constants/translationRoots.constants'
import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import { AuthContext } from './userContext'
import { observeAuth, signOutAccount } from '@services/user/auth/auth.service'
import { showToastNotification } from '@utilities/feedback.utils'
import MainLoader from '@assets/loaders/MainLoader/MainLoader'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'
import type { AuthInfo } from '@models/user.models'
import type { AuthContextValue } from './models/context.models'

const UnauthProvider = lazy(() => import('./contexts/UnauthContext/UnauthProvider'))
const UserSummaryProvider = lazy(
	() => import('./contexts/UserSummaryContext/UserSummaryProvider'),
)

export default function UserProvider({ children }: PropsOnlyChildren): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const [isLoading, setIsLoading] = useState(true)
	const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null)
	const [signOut] = useExponentialRetry(async () => {
		try {
			setIsLoading(true)
			await signOutAccount()
		} catch {
			showToastNotification({
				type: FEEDBACK_TYPES.error,
				id: 'sign-out-error',
				content: t(AUTH_SERVER_ERROR_MESSAGES_ROOT.networkRetrying),
			})

			throw new Error()
		}
	})

	useEffect(() => {
		const unsubscribe = observeAuth(user => {
			setIsLoading(false)
			setAuthInfo(user)
		})

		return unsubscribe
	}, [])

	const value: AuthContextValue = {
		isAuthenticated: authInfo !== null,
		signOut,
	}

	if (isLoading) {
		return <MainLoader />
	}

	return (
		<AuthContext value={value}>
			{authInfo === null ? (
				<UnauthProvider>{children}</UnauthProvider>
			) : (
				<UserSummaryProvider authInfo={authInfo}>{children}</UserSummaryProvider>
			)}
		</AuthContext>
	)
}
