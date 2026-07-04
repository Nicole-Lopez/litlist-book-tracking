import { SORT_OPTIONS } from '@constants/sort.constants'

export const SEARCH_CATALOG_SORT_OPTIONS = [
	SORT_OPTIONS.relevance,
	SORT_OPTIONS.titleAZ,
	SORT_OPTIONS.titleZA,
	SORT_OPTIONS.latest,
	SORT_OPTIONS.oldest,
] as const

export const SEARCH_CATALOG_DEFAULT_SORT_OPTION = SORT_OPTIONS.relevance

export const BOOK_SEARCH_MATCHES = {
	title: 'title',
	author: 'author',
	isbn: 'isbn',
} as const

export const SEARCH_TYPE_FILTER_INACTIVE_OPTION = 'anywhere'

export const SEARCH_TYPE_ACTIVE_FILTER_KEY = 'searchType'
