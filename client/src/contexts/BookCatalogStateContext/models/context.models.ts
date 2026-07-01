import type {
	BookFilter,
	BookFiltersInfo,
	BookSortInfo,
} from '@models/bookCatalog.models'

export type BookCatalogBooksContextValue<BooksT extends Record<string, unknown>[]> =
	BooksT

export type BookCatalogSortContextValue<BookSortInfoT extends BookSortInfo<unknown>> =
	BookSortInfoT

export type BookCatalogFiltersContextValue<
	BookFiltersInfoT extends BookFiltersInfo<
		Record<string, BookFilter<unknown, unknown>>
	>,
> = BookFiltersInfoT
