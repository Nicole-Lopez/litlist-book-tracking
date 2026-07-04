import {
	SEARCH_TYPE_ACTIVE_FILTER_KEY,
	SEARCH_TYPE_FILTER_INACTIVE_OPTION,
} from '@pages/Search/constants/bookCatalog.constants'
import { INITIAL_STATE } from '../constants/reducer.constants'
import { filterEffect } from '@utilities/filters.utils'
import {
	isCategoriesFilterActive,
	isBookIncludingAllCategories,
	applyCatalogFilter,
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
	toggleActiveFilter,
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
import type { BookAuthor, BookCategory, BookContentWarning } from '@models/book.models'
import type {
	InitAvailableCounts,
	PageCountFilterOptions,
} from '@models/bookCatalog.models'
import type {
	SearchCatalogFilters,
	SearchTypeFilter,
	SearchTypeFilterOption,
} from '../models/filtersBooks.models'
import type { SearchCatalogReducerState } from '../models/reducer.models'
import type {
	BookSearchMatch,
	SearchBookPreview,
} from '@pages/Search/models/searchBook.models'

export const initAvailableCounts: InitAvailableCounts<
	SearchBookPreview,
	SearchCatalogFilters
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
			searchType: { ...filters.searchType },
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
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
	return clearCatalogFilters({
		state,
		fetchedBooks,
		clearedFiltersInfo: INITIAL_STATE.filtersInfo,
		initAvailableCounts,
		applySort,
	})
}

export const isFiltersActive = (currentFilters: SearchCatalogFilters): boolean =>
	currentFilters.searchType.isActive ||
	currentFilters.categories.isActive ||
	currentFilters.authors.isActive ||
	currentFilters.contentWarnings.isActive ||
	currentFilters.pageCount.isActive

export const filterByCategories = (
	category: BookCategory,
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
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
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
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
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
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
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
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

export const isSearchTypeFilterActive = (currentFilter: SearchTypeFilter): boolean =>
	currentFilter !== SEARCH_TYPE_FILTER_INACTIVE_OPTION

export const isBookMatchingSearchType = (
	book: SearchBookPreview,
	searchType: SearchTypeFilterOption,
): boolean =>
	book.searchMatches.length !== 0 &&
	book.searchMatches.includes(searchType as BookSearchMatch)

export const filterBySearchType = (
	searchType: SearchTypeFilterOption,
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
	const isActive = isSearchTypeFilterActive(searchType)

	return applyCatalogFilter({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		filterKey: 'searchType',
		isFiltersActive,
		updatedFilterValue: {
			...state.filtersInfo.filters.searchType,
			value: searchType,
			isActive,
		},
		applyFilter: (books, setAvailableBookCounts) =>
			filterEffect(
				books,
				book => isBookMatchingSearchType(book, searchType),
				setAvailableBookCounts,
			),
		isResettingFilters: isSearchTypeFilterActive(
			state.filtersInfo.filters.searchType.value,
		),
		activeFilters: toggleActiveFilter(
			{ key: SEARCH_TYPE_ACTIVE_FILTER_KEY, value: searchType },
			state.filtersInfo.activeFilters,
			isActive,
		),
	})
}

export const applyActiveFilters = (
	state: SearchCatalogReducerState,
	fetchedBooks: SearchBookPreview[],
): SearchCatalogReducerState => {
	const generateBookFilterMatcher = (): ((book: SearchBookPreview) => boolean) => {
		let isBookMatchingFilters: (book: SearchBookPreview) => boolean = () => true

		if (isSearchTypeFilterActive(state.filtersInfo.filters.searchType.value)) {
			const prevIsBookMatchingFilters = isBookMatchingFilters
			isBookMatchingFilters = book =>
				prevIsBookMatchingFilters(book) &&
				isBookMatchingSearchType(book, state.filtersInfo.filters.searchType.value)
		}

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
