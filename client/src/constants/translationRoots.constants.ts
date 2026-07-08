export const USER_SETTINGS_FORM_ROOT = {
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
			errorMessages: {
				invalidEmail: 'settings_form.fields.email.error_messages.invalid_email',
			},
		},
		password: {
			label: 'settings_form.fields.password.label',
			requirements: {
				length: 'settings_form.fields.password.requirements.length',
				content: 'settings_form.fields.password.requirements.content',
			},
			resetPasswordLabel: 'settings_form.fields.password.reset_password_label',
		},
		confirmPassword: {
			label: 'settings_form.fields.confirm_password.label',
			errorMessages: {
				notMatch:
					'settings_form.fields.confirm_password.error_messages.not_match',
			},
		},
	},
}
