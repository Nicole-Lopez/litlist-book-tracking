import { useEffect, useReducer, useState } from 'react'
import { ACTION_TYPES } from './constants/reducer.constants'
import {
	UserSummaryActionsContext,
	UserSummaryContext,
} from '@contexts/UserContext/userContext'
import { fetchUserSummary, initUserSummary } from '@services/user/profile/profile.service'
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
	const [userSummary, dispatch] = useReducer(userSummaryReducer, initialState)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (userSummary.uid !== initialState.uid) return
		const controller = new AbortController()

		const fetchData = async (): Promise<void> => {
			try {
				let data = await fetchUserSummary(authInfo, {
					signal: controller.signal,
				})

				if (!data) {
					await initUserSummary(
						{ uid: authInfo.uid },
						{ isAnonymous: authInfo.isAnonymous, signal: controller.signal },
					)

					data = await fetchUserSummary(authInfo, {
						signal: controller.signal,
					})

					if (!data) throw new Error()
				}

				dispatch({
					type: ACTION_TYPES.INIT_USER_SUMMARY,
					payload: { authInfo, userSummary: data },
				})
			} catch (err) {
				if (
					(err instanceof DOMException && err.name === 'AbortError') ||
					controller.signal.aborted
				)
					return

				setIsError(true)
			}
		}

		fetchData()

		return () => {
			controller.abort()
		}
	}, [authInfo, userSummary.uid])

	if (isError) {
		return <p>Error</p>
	}

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
