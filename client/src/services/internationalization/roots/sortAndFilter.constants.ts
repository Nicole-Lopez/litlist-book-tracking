import { SORT_OPTIONS } from '@constants/sort.constants'

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

export const FILTERS_ROOT = {
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
