import { CATEGORIES } from '@constants/categories.constants'

export const CATEGORIES_ROOT = {
	[CATEGORIES.fiction]: 'fiction',
	[CATEGORIES.nonFiction]: 'non_fiction',
	[CATEGORIES.romance]: 'romance',
	[CATEGORIES.youngAdultFiction]: 'young_adult_fiction',
	[CATEGORIES.action]: 'action',
	[CATEGORIES.fantasy]: 'fantasy',
	[CATEGORIES.horror]: 'horror',
	[CATEGORIES.mystery]: 'mystery',
	[CATEGORIES.thriller]: 'thriller',
	[CATEGORIES.suspense]: 'suspense',
	[CATEGORIES.scienceFiction]: 'science_fiction',
	[CATEGORIES.art]: 'art',
	[CATEGORIES.philosophy]: 'philosophy',
	[CATEGORIES.religion]: 'religion',
	[CATEGORIES.childrens]: 'childrens',
	[CATEGORIES.business]: 'business',
	[CATEGORIES.classics]: 'classics',
	[CATEGORIES.poetry]: 'poetry',
	[CATEGORIES.werewolves]: 'werewolves',
	[CATEGORIES.vampires]: 'vampires',
}

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

export const BOOK_CARD_ROOT = {
	authors: {
		unspecified: 'authors.unspecified',
	},
}
