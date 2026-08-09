import { apiUserDb } from '../api/server.config'
import { PROFILE_ERROR_TYPES } from './profile.constants'
import {
	API_ANONYMOUS_USERNAME_PLACEHOLDER,
	API_DEFAULT_USERNAME_PLACEHOLDER,
	API_PROFILE_RETRYABLE_ERRORS,
} from '../api/profile/profile.apiConstants'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { apiUserSummaryAdapter } from '../api/profile/profile.apiAdapters'
import { userSummaryAdapter } from '@adapters/user.adapters'
import { fetchWithRetry } from '@utilities/retry.utils'
import { getApiUserSummaryDocDbPath } from '../api/profile/profile.apiUtils'
import type { AuthInfo, UserSummary } from '@models/user.models'
import type { ApiUserSummary } from '../api/profile/profile.apiModels'

const withFetchRetry = async <ResponseT>(
	onFetch: () => Promise<ResponseT>,
	signal?: AbortSignal,
): Promise<ResponseT> => {
	return await fetchWithRetry(onFetch, {
		signal,
		isRetryableError: err =>
			err instanceof FirebaseError &&
			API_PROFILE_RETRYABLE_ERRORS.includes(err.code),
	})
}

export const fetchUserSummary = async (
	authState: AuthInfo,
	options?: {
		signal?: AbortSignal
	},
): Promise<UserSummary | null> => {
	try {
		const docRef = doc(apiUserDb, getApiUserSummaryDocDbPath(authState.uid))
		const docSnap = await withFetchRetry(() => getDoc(docRef), options?.signal)

		if (!docSnap.exists()) return null

		const data = docSnap.data() as ApiUserSummary

		return userSummaryAdapter(
			{
				username:
					data.username === API_DEFAULT_USERNAME_PLACEHOLDER ||
					data.username === API_ANONYMOUS_USERNAME_PLACEHOLDER
						? undefined
						: data.username,
				photo: data.photo,
				favoriteCategories: data.favoriteCategories,
				wantToReadLibrary: data.wantToReadLibrary,
				currentlyReadingLibrary: data.currentlyReadingLibrary,
				alreadyReadLibrary: data.alreadyReadLibrary,
			},
			authState.isAnonymous,
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		throw new Error(PROFILE_ERROR_TYPES.networkError, { cause: err })
	}
}

export const initUserSummary = async (
	data: {
		uid: string
		username?: string
	},
	options?: {
		signal?: AbortSignal
		isAnonymous?: boolean
		isCheckIfExists?: boolean
	},
): Promise<void> => {
	try {
		const { signal, isAnonymous = false, isCheckIfExists = false } = options ?? {}
		const docRef = doc(apiUserDb, getApiUserSummaryDocDbPath(data.uid))

		if (isCheckIfExists) {
			const docSnap = await withFetchRetry(() => getDoc(docRef), signal)

			if (docSnap.exists()) return
		}

		await withFetchRetry(
			() =>
				setDoc(
					docRef,
					apiUserSummaryAdapter({
						username:
							data.username ??
							(isAnonymous
								? API_ANONYMOUS_USERNAME_PLACEHOLDER
								: API_DEFAULT_USERNAME_PLACEHOLDER),
					}),
				),
			signal,
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		throw new Error(PROFILE_ERROR_TYPES.networkError, { cause: err })
	}
}
