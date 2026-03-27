import { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'

export const AUTH_SERVER_ERROR_MESSAGES_ROOT = {
	[AUTH_ERROR_TYPES.networkError]: 'auth_access.server_error_messages.network_error',
	[AUTH_ERROR_TYPES.invalidCredentials]:
		'auth_access.server_error_messages.invalid_credentials',
	[AUTH_ERROR_TYPES.emailAlreadyInUse]:
		'auth_access.server_error_messages.email_already_in_use',

	networkRetrying: 'auth_access.server_error_messages.network_retrying',
}
