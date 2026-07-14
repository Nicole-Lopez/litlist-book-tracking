import { INITIAL_STATE } from '../constants/reducer.constants'
import {
	isCategoriesFilterActive,
	isBookIncludingAllCategories,
	applyActiveCatalogFilters,
	clearCatalogFilters,
	filterBooksByPageCount,
	filterBooksByCategories,
	isPageCountInRange,
	initAvailableCategoriesCounts,
	initAvailablePageCounts,
	isPagesCountFilterActive,
	isPageRangeFilterActive,
	isPagesCountSpecified,
	initAvailableAuthorsCounts,
	initAvailableContentWarningsCounts,
	isAuthorsFilterActive,
	isBookIncludingAllAuthors,
	isContentWarningsFilterActive,
	isBookExcludingAllContentWarnings,
	filterBooksByAuthors,
	filterBooksByContentWarnings,
} from '@utilities/bookCatalog.utils'
import { applySort } from './sortBooks.utils'
import type {
	BookAuthor,
	BookCategory,
	BookContentWarning,
	BookPreview,
} from '@models/book.models'
import type {
	InitAvailableCounts,
	PageCountFilterOptions,
} from '@models/bookCatalog.models'
import type { CategoryCatalogFilters } from '../models/filtersBooks.models'
import type { CategoryCatalogReducerState } from '../models/reducer.models'

export const initAvailableCounts: InitAvailableCounts<
	BookPreview,
	CategoryCatalogFilters
> = prevFilters => {
	const { accumulatePageCounts, getAvailablePageCounts } = initAvailablePageCounts()
	const { accumulateCategoriesCounts, getAvailableCategoriesCounts } =
		initAvailableCategoriesCounts(prevFilters?.categories.availableCounts)
	const { accumulateAuthorsCounts, getAvailableAuthorsCounts } =
		initAvailableAuthorsCounts(prevFilters?.authors.availableCounts)
	const { accumulateContentWarningsCounts, getAvailableContentWarningsCounts } =
		initAvailableContentWarningsCounts(prevFilters?.contentWarnings.availableCounts)

	return {
		getAvailableCounts: filters => ({
			categories: {
				...filters.categories,
				availableCounts: getAvailableCategoriesCounts(),
			},
			authors: {
				...filters.authors,
				availableCounts: getAvailableAuthorsCounts(),
			},
			contentWarnings: {
				...filters.contentWarnings,
				availableCounts: getAvailableContentWarningsCounts(
					filters.contentWarnings.value,
				),
			},
			pageCount: {
				...filters.pageCount,
				availableCounts: getAvailablePageCounts(),
			},
		}),
		accumulateCounts: book => {
			accumulateCategoriesCounts(book.categories)
			accumulateAuthorsCounts(book.authors)
			accumulateContentWarningsCounts(book.contentWarnings)
			accumulatePageCounts(book.pageCount)
		},
	}
}

export const clearFilters = (
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	return clearCatalogFilters({
		state,
		fetchedBooks,
		clearedFiltersInfo: INITIAL_STATE.filtersInfo,
		initAvailableCounts,
		applySort,
	})
}

export const isFiltersActive = (currentFilters: CategoryCatalogFilters): boolean =>
	currentFilters.categories.isActive ||
	currentFilters.authors.isActive ||
	currentFilters.contentWarnings.isActive ||
	currentFilters.pageCount.isActive

export const filterByCategories = (
	category: BookCategory,
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	return filterBooksByCategories({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		category,
		bookKey: 'categories',
		filterKey: 'categories',
		isFiltersActive,
	})
}

export const filterByAuthors = (
	author: BookAuthor,
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	return filterBooksByAuthors({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		author,
		bookKey: 'authors',
		filterKey: 'authors',
		isFiltersActive,
	})
}

export const filterByContentWarnings = (
	contentWarning: BookContentWarning,
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	return filterBooksByContentWarnings({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		contentWarning,
		bookKey: 'contentWarnings',
		filterKey: 'contentWarnings',
		isFiltersActive,
	})
}

export const filterByPageCount = (
	pageCount: PageCountFilterOptions,
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	return filterBooksByPageCount({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		pageCount,
		bookKey: 'pageCount',
		filterKey: 'pageCount',
		isFiltersActive,
	})
}

export const applyActiveFilters = (
	state: CategoryCatalogReducerState,
	fetchedBooks: BookPreview[],
): CategoryCatalogReducerState => {
	const generateBookFilterMatcher = (): ((book: BookPreview) => boolean) => {
		let isBookMatchingFilters: (book: BookPreview) => boolean = () => true

		if (isCategoriesFilterActive(state.filtersInfo.filters.categories.value)) {
			const prevIsBookMatchingFilters = isBookMatchingFilters
			isBookMatchingFilters = book =>
				prevIsBookMatchingFilters(book) &&
				isBookIncludingAllCategories(
					book.categories,
					state.filtersInfo.filters.categories.value,
				)
		}

		if (isAuthorsFilterActive(state.filtersInfo.filters.authors.value)) {
			const prevIsBookMatchingFilters = isBookMatchingFilters
			isBookMatchingFilters = book =>
				prevIsBookMatchingFilters(book) &&
				isBookIncludingAllAuthors(
					book.authors,
					state.filtersInfo.filters.authors.value,
				)
		}

		if (
			isContentWarningsFilterActive(state.filtersInfo.filters.contentWarnings.value)
		) {
			const prevIsBookMatchingFilters = isBookMatchingFilters
			isBookMatchingFilters = book =>
				prevIsBookMatchingFilters(book) &&
				isBookExcludingAllContentWarnings(
					book.contentWarnings,
					state.filtersInfo.filters.contentWarnings.value,
				)
		}

		if (isPagesCountFilterActive(state.filtersInfo.filters.pageCount.value)) {
			const prevIsBookMatchingFilters = isBookMatchingFilters

			if (isPageRangeFilterActive(state.filtersInfo.filters.pageCount.value)) {
				isBookMatchingFilters = book =>
					prevIsBookMatchingFilters(book) &&
					isPageCountInRange(
						book.pageCount,
						state.filtersInfo.filters.pageCount.value,
					)
			} else {
				isBookMatchingFilters = book =>
					prevIsBookMatchingFilters(book) &&
					isPagesCountSpecified(book.pageCount)
			}
		}

		return isBookMatchingFilters
	}

	return applyActiveCatalogFilters({
		fetchedBooks,
		state,
		isBookMatchingFilters: generateBookFilterMatcher(),
		initAvailableCounts,
		clearFilters,
		applySort,
	})
}
