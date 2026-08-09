export const API_AUTH_RETRYABLE_ERRORS = [
	'auth/network-request-failed',
	'auth/internal-error',
	'auth/timeout',
]

export const API_AUTH_POPUP_ERRORS = [
	'auth/cancelled-popup-request',
	'auth/popup-blocked',
	'auth/popup-closed-by-user',
]

export const API_AUTH_INVALID_CREDENTIALS_ERRORS = [
	'auth/invalid-email',
	'auth/user-disabled',
	'auth/user-not-found',
	'auth/wrong-password',
]

export const API_AUTH_EMAIL_ALREADY_IN_USE_ERROR = 'auth/email-already-in-use'

export const API_AUTH_GOOGLE_PROVIDER_ID = 'google.com'
