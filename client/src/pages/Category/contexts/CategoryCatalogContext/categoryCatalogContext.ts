import { createContext, useContext } from 'react'
import {
	useBookCatalogBooksContext,
	useBookCatalogFiltersContext,
	useBookCatalogSortContext,
} from '@contexts/BookCatalogStateContext/bookCatalogStateContext'
import { useFetchedBooks } from '@pages/Category/hooks/useFetchedBooks'
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
	CategoryCatalogActionsContextValue,
} from './models/context.models'
import type { CategoryCatalogSort } from './models/sortBooks.models'

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

export const CategoryCatalogActionsContext = createContext<
	CategoryCatalogActionsContextValue | undefined
>(undefined)

type UseCategoryCatalogActionsContextReturn = {
	clearFilters: () => void
	applySort: (sort: CategoryCatalogSort) => void
	applyPageCountFilter: (pageCount: PageCountFilterOptions) => void
	applyCategoriesFilter: (category: CategoriesFilterOption) => void
	applyAuthorsFilter: (author: AuthorsFilterOption) => void
	applyContentWarningsFilter: (contentWarning: ContentWarningsFilterOption) => void
	removeCategoryFilter: (category: CategoriesFilterOption) => void
	removeAuthorFilter: (author: AuthorsFilterOption) => void
	removeContentWarningFilter: (contentWarning: ContentWarningsFilterOption) => void
	removePageCountRangeFilter: (pageCount: PageCountFilterOptions) => void
	removeUnspecifiedPageCountFilter: (pageCount: PageCountFilterOptions) => void
}

export function useCategoryCatalogActionsContext(): UseCategoryCatalogActionsContextReturn {
	const dispatch = useContext(CategoryCatalogActionsContext)
	const { books } = useFetchedBooks()

	if (dispatch === undefined)
		throw new Error(
			'useCategoryCatalogActionsContext must be used within a CategoryCatalogProvider',
		)

	const applySort = (sort: CategoryCatalogSort): void => {
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

	const clearFilters = (): void => {
		dispatch({
			type: ACTION_TYPES.FILTERS_CLEARED,
			payload: { fetchedBooks: books },
		})
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
		removeCategoryFilter,
		removeAuthorFilter,
		removeContentWarningFilter,
		removePageCountRangeFilter,
		removeUnspecifiedPageCountFilter,
	}
}
