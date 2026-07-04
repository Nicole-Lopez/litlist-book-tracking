import {
	PAGE_COUNT_FILTER_INITIAL,
	CATEGORIES_FILTER_INITIAL,
	AUTHORS_FILTER_INITIAL,
	CONTENT_WARNINGS_FILTER_INITIAL,
} from '@constants/bookCatalog.constants'
import {
	SEARCH_CATALOG_DEFAULT_SORT_OPTION,
	SEARCH_TYPE_FILTER_INACTIVE_OPTION,
} from '@pages/Search/constants/bookCatalog.constants'
import type { SearchCatalogReducerState } from '../models/reducer.models'

export const INITIAL_STATE: SearchCatalogReducerState = {
	displayedBooks: [],
	filtersInfo: {
		isFilterActive: false,
		filters: {
			searchType: {
				value: SEARCH_TYPE_FILTER_INACTIVE_OPTION,
				isActive: false,
				availableCounts: null,
			},
			categories: {
				value: CATEGORIES_FILTER_INITIAL,
				isActive: false,
				availableCounts: [],
			},
			authors: {
				value: AUTHORS_FILTER_INITIAL,
				isActive: false,
				availableCounts: [],
			},
			contentWarnings: {
				value: CONTENT_WARNINGS_FILTER_INITIAL,
				isActive: false,
				availableCounts: [],
			},
			pageCount: {
				value: PAGE_COUNT_FILTER_INITIAL,
				isActive: false,
				availableCounts: {
					minPages: 0,
					maxPages: 0,
				},
			},
		},
		activeFilters: [],
	},
	sortInfo: {
		isSortActive: false,
		sort: SEARCH_CATALOG_DEFAULT_SORT_OPTION,
	},
}

export const ACTION_TYPES = {
	CATALOG_RESET: 'CATALOG_RESET',
	FILTERS_CLEARED: 'FILTERS_CLEARED',
	CATEGORIES_FILTER_UPDATED: 'CATEGORIES_FILTER_UPDATED',
	AUTHORS_FILTER_UPDATED: 'AUTHORS_FILTER_UPDATED',
	CONTENT_WARNINGS_FILTER_UPDATED: 'CONTENT_WARNINGS_FILTER_UPDATED',
	SEARCH_TYPE_FILTER_UPDATED: 'SEARCH_TYPE_FILTER_UPDATED',
	PAGE_COUNT_FILTER_UPDATED: 'PAGE_COUNT_FILTER_UPDATED',
	SORT_UPDATED: 'SORT_UPDATED',
} as const
