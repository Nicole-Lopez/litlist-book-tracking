import { CATEGORIES } from '@constants/categories.constants'
import { SORT_OPTIONS } from './sort.constants'

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

export const SEARCH_ROOT = {
	searchPlaceholder: 'search_placeholder',
	errorMessage: 'error_message',
	viewResults: {
		viewAll: 'view_results.view_all',
		seeMore: 'view_results.see_more',
		seeLess: 'view_results.see_less',
	},
	resultsSummary: {
		counter: 'results_summary.counter',
		forQuery: 'results_summary.for_query',
		noResultsMessage: 'results_summary.no_results_message',
	},
	pagination: {
		rangeResults: 'pagination.range_results',
	},
}

export const SEARCH_BOOKS_ROOT = {
	placeholder: 'search_books.placeholder',
	noResultsMessages: [
		'search_books.no_results_messages.1',
		'search_books.no_results_messages.2',
		'search_books.no_results_messages.3',
		'search_books.no_results_messages.4',
		'search_books.no_results_messages.5',
		'search_books.no_results_messages.6',
	],
	searchIn: {
		label: 'search_books.search_in.label',
		options: {
			anywhere: 'search_books.search_in.options.anywhere',
			title: 'search_books.search_in.options.title',
			author: 'search_books.search_in.options.author',
			isbn: 'search_books.search_in.options.isbn',
		},
	},
}

export const SORT_ROOT = {
	label: 'sort.label',
	options: {
		[SORT_OPTIONS.relevance]: 'sort.options.relevance',
		[SORT_OPTIONS.titleAZ]: 'sort.options.title_az',
		[SORT_OPTIONS.titleZA]: 'sort.options.title_za',
		[SORT_OPTIONS.mostPages]: 'sort.options.most_pages',
		[SORT_OPTIONS.leastPages]: 'sort.options.least_pages',
		[SORT_OPTIONS.latest]: 'sort.options.latest',
		[SORT_OPTIONS.oldest]: 'sort.options.oldest',
		[SORT_OPTIONS.latestUpdated]: 'sort.options.latest_updated',
		[SORT_OPTIONS.oldestUpdated]: 'sort.options.oldest_updated',
		[SORT_OPTIONS.latestSaved]: 'sort.options.latest_saved',
		[SORT_OPTIONS.oldestSaved]: 'sort.options.oldest_saved',
		[SORT_OPTIONS.mostCompleted]: 'sort.options.most_completed',
		[SORT_OPTIONS.leastCompleted]: 'sort.options.least_completed',
	},
}

export const FILTERS_BOOKS_ROOT = {
	label: 'filters.label',
	clearFiltersLabel: 'filters.clear_filters_label',
	categories: {
		label: 'filters.categories.label',
		subCategoriesLabel: 'filters.categories.sub_categories_label',
	},
	authors: {
		label: 'filters.authors.label',
	},
	contentWarnings: {
		label: 'filters.content_warnings.label',
	},
	pagesRange: {
		label: 'filters.pages_range.label',
		excludeUnspecified: 'filters.pages_range.exclude_unspecified',
		min: {
			label: 'filters.pages_range.min.label',
			description: 'filters.pages_range.min.description',
		},
		max: {
			label: 'filters.pages_range.max.label',
			description: 'filters.pages_range.max.description',
		},
	},
}

export const BOOK_CARD_ROOT = {
	authors: {
		unspecified: 'authors.unspecified',
	},
	pageCount: {
		pages: 'page_count.pages',
	},
	publishedYear: {
		unspecified: 'published_year.unspecified',
	},
}
