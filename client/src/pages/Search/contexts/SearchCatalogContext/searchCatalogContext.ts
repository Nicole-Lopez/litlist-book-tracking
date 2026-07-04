import { createContext, useContext } from 'react'
import {
	useBookCatalogBooksContext,
	useBookCatalogFiltersContext,
	useBookCatalogSortContext,
} from '@contexts/BookCatalogStateContext/bookCatalogStateContext'
import { useFetchedBooks } from '@pages/Search/hooks/useFetchedBooks'
import { ACTION_TYPES, INITIAL_STATE } from './constants/reducer.constants'
import type {
	AuthorsFilterOption,
	CategoriesFilterOption,
	ContentWarningsFilterOption,
	PageCountFilterOptions,
} from '@models/bookCatalog.models'
import type {
	BooksContextValue,
	SortContextValue,
	FiltersContextValue,
	SearchCatalogActionsContextValue,
} from './models/context.models'
import type { SearchCatalogSort } from './models/sortBooks.models'
import type { SearchTypeFilterOption } from './models/filtersBooks.models'

export function useBooksContext(): BooksContextValue {
	const context = useBookCatalogBooksContext<BooksContextValue>()
	return context
}

export function useSortContext(): SortContextValue {
	const context = useBookCatalogSortContext<SortContextValue>()
	return context
}

export function useFiltersContext(): FiltersContextValue {
	const context = useBookCatalogFiltersContext<FiltersContextValue>()
	return context
}

export const SearchCatalogActionsContext = createContext<
	SearchCatalogActionsContextValue | undefined
>(undefined)

type UseSearchBooksActionsContextReturn = {
	clearFilters: () => void
	applySort: (sort: SearchCatalogSort) => void
	applyPageCountFilter: (pageCount: PageCountFilterOptions) => void
	applyCategoriesFilter: (category: CategoriesFilterOption) => void
	applyAuthorsFilter: (author: AuthorsFilterOption) => void
	applyContentWarningsFilter: (contentWarning: ContentWarningsFilterOption) => void
	applySearchTypeFilter: (searchType: SearchTypeFilterOption) => void
	removeSearchTypeFilter: () => void
	removeCategoryFilter: (category: CategoriesFilterOption) => void
	removeAuthorFilter: (author: AuthorsFilterOption) => void
	removeContentWarningFilter: (contentWarning: ContentWarningsFilterOption) => void
	removePageCountRangeFilter: (pageCount: PageCountFilterOptions) => void
	removeUnspecifiedPageCountFilter: (pageCount: PageCountFilterOptions) => void
}

export function useSearchCatalogActionsContext(): UseSearchBooksActionsContextReturn {
	const dispatch = useContext(SearchCatalogActionsContext)
	const { books } = useFetchedBooks()

	if (dispatch === undefined)
		throw new Error(
			'useSearchCatalogActionsContext must be used within a SearchCatalogProvider',
		)

	const applySort = (sort: SearchCatalogSort): void => {
		dispatch({
			type: ACTION_TYPES.SORT_UPDATED,
			payload: { sort, fetchedBooks: books },
		})
	}

	const applyPageCountFilter = (pageCount: PageCountFilterOptions): void => {
		dispatch({
			type: ACTION_TYPES.PAGE_COUNT_FILTER_UPDATED,
			payload: { pageCount, fetchedBooks: books },
		})
	}

	const applyCategoriesFilter = (category: CategoriesFilterOption): void => {
		dispatch({
			type: ACTION_TYPES.CATEGORIES_FILTER_UPDATED,
			payload: { category, fetchedBooks: books },
		})
	}

	const applyAuthorsFilter = (author: AuthorsFilterOption): void => {
		dispatch({
			type: ACTION_TYPES.AUTHORS_FILTER_UPDATED,
			payload: { author, fetchedBooks: books },
		})
	}

	const applyContentWarningsFilter = (
		contentWarning: ContentWarningsFilterOption,
	): void => {
		dispatch({
			type: ACTION_TYPES.CONTENT_WARNINGS_FILTER_UPDATED,
			payload: { contentWarning, fetchedBooks: books },
		})
	}

	const applySearchTypeFilter = (searchType: SearchTypeFilterOption): void => {
		dispatch({
			type: ACTION_TYPES.SEARCH_TYPE_FILTER_UPDATED,
			payload: { searchType, fetchedBooks: books },
		})
	}

	const clearFilters = (): void => {
		dispatch({
			type: ACTION_TYPES.FILTERS_CLEARED,
			payload: { fetchedBooks: books },
		})
	}

	const removeSearchTypeFilter = (): void => {
		applySearchTypeFilter(INITIAL_STATE.filtersInfo.filters.searchType.value)
	}

	const removeCategoryFilter = (category: CategoriesFilterOption): void => {
		applyCategoriesFilter(category)
	}

	const removeAuthorFilter = (author: AuthorsFilterOption): void => {
		applyAuthorsFilter(author)
	}

	const removeContentWarningFilter = (
		contentWarning: ContentWarningsFilterOption,
	): void => {
		applyContentWarningsFilter(contentWarning)
	}

	const removePageCountRangeFilter = (pageCount: PageCountFilterOptions): void => {
		applyPageCountFilter({
			...INITIAL_STATE.filtersInfo.filters.pageCount.value,
			isUnspecifiedExcluded: pageCount.isUnspecifiedExcluded,
		})
	}

	const removeUnspecifiedPageCountFilter = (
		pageCount: PageCountFilterOptions,
	): void => {
		applyPageCountFilter({
			...pageCount,
			isUnspecifiedExcluded:
				INITIAL_STATE.filtersInfo.filters.pageCount.value.isUnspecifiedExcluded,
		})
	}

	return {
		applySort,
		clearFilters,
		applyPageCountFilter,
		applyCategoriesFilter,
		applyAuthorsFilter,
		applyContentWarningsFilter,
		applySearchTypeFilter,
		removeSearchTypeFilter,
		removeCategoryFilter,
		removeAuthorFilter,
		removeContentWarningFilter,
		removePageCountRangeFilter,
		removeUnspecifiedPageCountFilter,
	}
}
