import { DB } from '../server.config'
import {
	ANONYMOUS_USERNAME_PLACEHOLDER,
	PROVIDER_USERNAME_PLACEHOLDER,
	USER_SUMMARY_ERROR_TYPES,
} from './profile.constants'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { apiUserSummaryAdapter, userSummaryAdapter } from '@adapters/user.adapters'
import type { AuthInfo, UserSummary } from '@models/user.models'
import type { ApiUserSummary } from './profile.apiModels'

export const fetchUserSummary = async (
	authState: AuthInfo,
	options?: {
		isCreateIfNotExistsEnabled?: boolean
	},
): Promise<UserSummary> => {
	const docRef = doc(DB, 'userSummary', authState.uid)
	let docSnap = await getDoc(docRef)

	if (!docSnap.exists()) {
		if (!options?.isCreateIfNotExistsEnabled)
			throw new Error(USER_SUMMARY_ERROR_TYPES.userSummaryNotFound)

		await initUserSummary(authState.uid, {
			username: authState.isAnonymous
				? ANONYMOUS_USERNAME_PLACEHOLDER
				: PROVIDER_USERNAME_PLACEHOLDER,
		})

		docSnap = await getDoc(docRef)
	}

	const data = docSnap.data() as ApiUserSummary

	return userSummaryAdapter(data)
}

export const initUserSummary = async (
	uid: string,
	data: Pick<UserSummary, 'username'>,
	isCheckIfExists: boolean = false,
): Promise<void> => {
	const docRef = doc(DB, 'userSummary', uid)

	if (isCheckIfExists) {
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) return
	}

	await setDoc(docRef, apiUserSummaryAdapter(data))
}
