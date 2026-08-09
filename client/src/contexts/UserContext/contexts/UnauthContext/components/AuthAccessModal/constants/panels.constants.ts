import { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'

export const PANELS = {
	signIn: 'signIn',
	signUp: 'signUp',
	anonymous: 'anonymous',
} as const

export const SERVER_ERROR_TYPES = [
	AUTH_ERROR_TYPES.emailAlreadyInUse,
	AUTH_ERROR_TYPES.invalidCredentials,
	AUTH_ERROR_TYPES.networkError,
]
