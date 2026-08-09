import { useEffect, useState, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_TRANSLATION_ROOT } from '@services/internationalization/roots/user.constants'
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

	const signOut = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await signOutAccount()
		} catch (err) {
			showToastNotification({
				type: FEEDBACK_TYPES.error,
				id: 'sign-out-error',
				content: t(USER_TRANSLATION_ROOT.errorMessages.networkError),
			})

			throw err
		}
	}

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
			{authInfo ? (
				<UserSummaryProvider authInfo={authInfo}>{children}</UserSummaryProvider>
			) : (
				<UnauthProvider>{children}</UnauthProvider>
			)}
		</AuthContext>
	)
}
