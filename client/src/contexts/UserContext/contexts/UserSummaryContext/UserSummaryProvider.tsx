import { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useExponentialRetry } from '@hooks/useExponentialRetry'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import { AUTH_SERVER_ERROR_MESSAGES_ROOT } from '@contexts/UserContext/constants/translationRoots.constants'
import { ACTION_TYPES } from './constants/reducer.constants'
import {
	UserSummaryActionsContext,
	UserSummaryContext,
} from '@contexts/UserContext/userContext'
import { fetchUserSummary } from '@services/user/profile/profile.service'
import { showToastNotification } from '@utilities/feedback.utils'
import userSummaryReducer, { initialState } from './userSummaryReducer'
import MainLoader from '@assets/loaders/MainLoader/MainLoader'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { AuthInfo } from '@models/user.models'

export type UserSummaryProviderProps = PropsWithChildren<{
	authInfo: AuthInfo
}>

export default function UserSummaryProvider({
	children,
	authInfo,
}: UserSummaryProviderProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const [userSummary, dispatch] = useReducer(userSummaryReducer, initialState)
	const [fetchData] = useExponentialRetry(async () => {
		try {
			if (userSummary.uid !== initialState.uid) return

			const data = await fetchUserSummary(authInfo, {
				isCreateIfNotExistsEnabled: true,
			})

			dispatch({
				type: ACTION_TYPES.INIT_USER_SUMMARY,
				payload: { authInfo, userSummary: data },
			})
		} catch {
			showToastNotification({
				type: FEEDBACK_TYPES.error,
				id: 'fetch-user-summary-error',
				content: t(AUTH_SERVER_ERROR_MESSAGES_ROOT.networkRetrying),
			})

			throw new Error()
		}
	})

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (userSummary.uid === initialState.uid) {
		return <MainLoader />
	}

	return (
		<UserSummaryContext value={userSummary}>
			<UserSummaryActionsContext value={dispatch}>
				{children}
			</UserSummaryActionsContext>
		</UserSummaryContext>
	)
}
