export const USER_TRANSLATION_ROOT = {
	authAccess: {
		signIn: {
			title: 'auth_access.sign_in.title',
			authProvider: {
				google: 'auth_access.sign_in.auth_provider.google',
				anonymous: 'auth_access.sign_in.auth_provider.anonymous',
			},
			changePanel: 'auth_access.sign_in.change_panel',
		},
		signUp: {
			title: 'auth_access.sign_up.title',
			authProvider: {
				google: 'auth_access.sign_up.auth_provider.google',
			},
			changePanel: 'auth_access.sign_up.change_panel',
		},
		anonymousAccount: {
			title: 'auth_access.anonymous_account.title',
			introduce: 'auth_access.anonymous_account.introduce',
			limitations: {
				title: 'auth_access.anonymous_account.limitations.title',
				library: 'auth_access.anonymous_account.limitations.library',
				list: 'auth_access.anonymous_account.limitations.list',
			},
			warning: 'auth_access.anonymous_account.warning',
			upgradeAccount: 'auth_access.anonymous_account.upgrade_account',
			changePanel: 'auth_access.anonymous_account.change_panel',
		},
		divider: 'auth_access.divider',
		actions: {
			signIn: 'auth_access.actions.sign_in',
			signUp: 'auth_access.actions.sign_up',
			anonymous: 'auth_access.actions.anonymous',
		},
	},
	errorMessages: {
		networkError: 'error_messages.network_error',
		invalidCredentials: 'error_messages.invalid_credentials',
		emailAlreadyInUse: 'error_messages.email_already_in_use',
		invalidEmail: 'error_messages.invalid_email',
		confirmPasswordNotMatch: 'error_messages.confirm_password_not_match',
	},
	settingsForm: {
		fields: {
			username: {
				label: 'settings_form.fields.username.label',
				requirements: {
					length: 'settings_form.fields.username.requirements.length',
					content: 'settings_form.fields.username.requirements.content',
				},
			},
			email: {
				label: 'settings_form.fields.email.label',
			},
			password: {
				label: 'settings_form.fields.password.label',
				requirements: {
					length: 'settings_form.fields.password.requirements.length',
					content: 'settings_form.fields.password.requirements.content',
				},
				resetPassword: 'settings_form.fields.password.reset_password',
			},
			confirmPassword: {
				label: 'settings_form.fields.confirm_password.label',
			},
		},
	},
}
