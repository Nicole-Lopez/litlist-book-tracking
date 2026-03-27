import { AUTH, GOOGLE_AUTH_PROVIDER } from '../server.config'
import { AUTH_ERROR_TYPES } from './auth.constants'
import {
	ANONYMOUS_USERNAME_PLACEHOLDER,
	PROVIDER_USERNAME_PLACEHOLDER,
} from '@services/user/profile/profile.constants'
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
import type { AuthError } from 'firebase/auth'
import type { AuthInfo } from '@models/user.models'

export const observeAuth = (observer: (user: AuthInfo | null) => void): (() => void) => {
	return onAuthStateChanged(AUTH, user => {
		observer(user === null ? user : authInfoAdapter(user))
	})
}

export const authWithGoogle = async (): Promise<void> => {
	try {
		const userCredential = await signInWithPopup(AUTH, GOOGLE_AUTH_PROVIDER)

		await initUserSummary(
			userCredential.user.uid,
			{ username: PROVIDER_USERNAME_PLACEHOLDER },
			true,
		)
	} catch (err) {
		const error = err as AuthError

		if (
			[
				'auth/cancelled-popup-request',
				'auth/popup-blocked',
				'auth/popup-closed-by-user',
			].includes(error.code)
		) {
			throw new Error(AUTH_ERROR_TYPES.popupError, { cause: err })
		}

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const signInAccount = async (email: string, password: string): Promise<void> => {
	try {
		await signInWithEmailAndPassword(AUTH, email, password)
	} catch (err) {
		throw new Error(AUTH_ERROR_TYPES.invalidCredentials, { cause: err })
	}
}

export const createAccount = async (
	email: string,
	password: string,
	username: string,
): Promise<void> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(AUTH, email, password)

		await initUserSummary(userCredential.user.uid, { username })
	} catch (err) {
		const error = err as AuthError

		if (error.code === 'auth/email-already-in-use') {
			throw new Error(AUTH_ERROR_TYPES.emailAlreadyInUse, { cause: err })
		}

		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const createAnonymousAccount = async (): Promise<void> => {
	try {
		const userCredential = await signInAnonymously(AUTH)

		await initUserSummary(userCredential.user.uid, {
			username: ANONYMOUS_USERNAME_PLACEHOLDER,
		})
	} catch (err) {
		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}

export const signOutAccount = async (): Promise<void> => {
	try {
		await signOut(AUTH)
	} catch (err) {
		throw new Error(AUTH_ERROR_TYPES.networkError, { cause: err })
	}
}
