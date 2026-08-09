import { apiAuth, apiGoogleAuthProvider } from '../api/server.config'
import {
	API_AUTH_EMAIL_ALREADY_IN_USE_ERROR,
	API_AUTH_GOOGLE_PROVIDER_ID,
	API_AUTH_INVALID_CREDENTIALS_ERRORS,
	API_AUTH_POPUP_ERRORS,
	API_AUTH_RETRYABLE_ERRORS,
} from '../api/auth/auth.apiConstants'
import { AUTH_ERROR_TYPES } from './auth.constants'
import { FirebaseError } from 'firebase/app'
import { fetchWithRetry } from '@utilities/retry.utils'
import {
	onAuthStateChanged,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	signInAnonymously,
} from 'firebase/auth'
import { authInfoAdapter } from '@adapters/user.adapters'
import { initUserSummary } from '../profile/profile.service'
import type { AuthInfo } from '@models/user.models'

const withAuthRetry = async <ResponseT>(
	onAuth: () => Promise<ResponseT>,
	signal?: AbortSignal,
): Promise<ResponseT> => {
	return await fetchWithRetry(onAuth, {
		signal,
		isRetryableError: err =>
			err instanceof FirebaseError && API_AUTH_RETRYABLE_ERRORS.includes(err.code),
	})
}

export const observeAuth = (observer: (user: AuthInfo | null) => void): (() => void) => {
	return onAuthStateChanged(apiAuth, user => {
		observer(
			user
				? authInfoAdapter({
						uid: user.uid,
						isAnonymous: user.isAnonymous,
						email: user.email ?? '',
						isEmailVerified: user.emailVerified,
						dateCreated: user.metadata.creationTime
							? new Date(user.metadata.creationTime).getTime()
							: new Date().getTime(),
						isGoogleLinked: user.providerData.some(
							provider =>
								provider.providerId === API_AUTH_GOOGLE_PROVIDER_ID,
						),
					})
				: null,
		)
	})
}

export const authWithGoogle = async (options?: {
	signal?: AbortSignal
}): Promise<void> => {
	try {
		const userCredential = await withAuthRetry(
			() => signInWithPopup(apiAuth, apiGoogleAuthProvider),
			options?.signal,
		)

		await initUserSummary(
			{ uid: userCredential.user.uid },
			{ signal: options?.signal, isCheckIfExists: true },
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		if (err instanceof FirebaseError && API_AUTH_POPUP_ERRORS.includes(err.code))
			return

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const signInAccount = async (
	data: {
		email: string
		password: string
	},
	options?: {
		signal?: AbortSignal
	},
): Promise<void> => {
	try {
		await withAuthRetry(
			() => signInWithEmailAndPassword(apiAuth, data.email, data.password),
			options?.signal,
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		if (
			err instanceof FirebaseError &&
			API_AUTH_INVALID_CREDENTIALS_ERRORS.includes(err.code)
		)
			throw new Error(AUTH_ERROR_TYPES.invalidCredentials, { cause: err })

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const createAccount = async (
	data: {
		email: string
		password: string
		username: string
	},
	options?: {
		signal?: AbortSignal
	},
): Promise<void> => {
	try {
		const userCredential = await withAuthRetry(
			() => createUserWithEmailAndPassword(apiAuth, data.email, data.password),
			options?.signal,
		)

		await initUserSummary(
			{ uid: userCredential.user.uid, username: data.username },
			{ signal: options?.signal },
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		if (
			err instanceof FirebaseError &&
			err.code === API_AUTH_EMAIL_ALREADY_IN_USE_ERROR
		)
			throw new Error(AUTH_ERROR_TYPES.emailAlreadyInUse, { cause: err })

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const createAnonymousAccount = async (options?: {
	signal?: AbortSignal
}): Promise<void> => {
	try {
		const userCredential = await withAuthRetry(
			() => signInAnonymously(apiAuth),
			options?.signal,
		)

		await initUserSummary(
			{ uid: userCredential.user.uid },
			{ isAnonymous: true, signal: options?.signal },
		)
	} catch (err) {
		if (
			(err instanceof DOMException && err.name === 'AbortError') ||
			options?.signal?.aborted
		)
			throw err

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const signOutAccount = async (options?: {
	signal?: AbortSignal
}): Promise<void> => {
	try {
		await withAuthRetry(() => signOut(apiAuth), options?.signal)
	} catch (err) {
		if (err instanceof FirebaseError)
			throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })

		throw err
	}
}
