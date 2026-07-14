import { SORT_OPTIONS } from '@constants/sort.constants'

export const CATEGORY_CATALOG_SORT_OPTIONS = [
	SORT_OPTIONS.relevance,
	SORT_OPTIONS.titleAZ,
	SORT_OPTIONS.titleZA,
	SORT_OPTIONS.latest,
	SORT_OPTIONS.oldest,
] as const

export const CATEGORY_CATALOG_DEFAULT_SORT_OPTION = SORT_OPTIONS.relevance
