import { createContext, useContext } from 'react'
import type {
	BookFilter,
	BookFiltersInfo,
	BookSortInfo,
} from '@models/bookCatalog.models'
import type {
	BookCatalogBooksContextValue,
	BookCatalogFiltersContextValue,
	BookCatalogSortContextValue,
} from './models/context.models'

export const BookCatalogBooksContext = createContext<
	BookCatalogBooksContextValue<Record<string, unknown>[]> | undefined
>(undefined)

export function useBookCatalogBooksContext<
	BooksT extends Record<string, unknown>[],
>(): BookCatalogBooksContextValue<BooksT> {
	const context = useContext(BookCatalogBooksContext)

	if (context === undefined)
		throw new Error(
			'useBookCatalogBooksContext must be used within a BookCatalogStateProvider',
		)

	return context as BookCatalogBooksContextValue<BooksT>
}

export const BookCatalogSortContext = createContext<
	BookCatalogSortContextValue<BookSortInfo<unknown>> | undefined
>(undefined)

export function useBookCatalogSortContext<
	BookSortInfoT extends BookSortInfo<unknown>,
>(): BookCatalogSortContextValue<BookSortInfoT> {
	const context = useContext(BookCatalogSortContext)

	if (context === undefined)
		throw new Error(
			'useBookCatalogSortContext must be used within a BookCatalogStateProvider',
		)

	return context as BookCatalogSortContextValue<BookSortInfoT>
}

export const BookCatalogFiltersContext = createContext<
	| BookCatalogFiltersContextValue<
			BookFiltersInfo<Record<string, BookFilter<unknown, unknown>>>
	  >
	| undefined
>(undefined)

export function useBookCatalogFiltersContext<
	FiltersT extends BookFiltersInfo<Record<string, BookFilter<unknown, unknown>>>,
>(): BookCatalogFiltersContextValue<FiltersT> {
	const context = useContext(BookCatalogFiltersContext)

	if (context === undefined)
		throw new Error(
			'useBookCatalogFiltersContext must be used within a BookCatalogStateProvider',
		)

	return context as BookCatalogFiltersContextValue<FiltersT>
}
