import { useEffect } from 'react'
import {
	BookCatalogBooksContext,
	BookCatalogFiltersContext,
	BookCatalogSortContext,
} from './bookCatalogStateContext'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type {
	BookCatalogState,
	BookFilter,
	BookFiltersInfo,
	BookSortInfo,
} from '@models/bookCatalog.models'

export type BookCatalogStateProviderProps<
	BookT extends Record<string, unknown>,
	FiltersInfoT extends BookFiltersInfo<FiltersT>,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortInfoT extends BookSortInfo<SortT>,
	SortT,
> = PropsWithChildren<{
	catalogState: BookCatalogState<BookT, FiltersInfoT, SortInfoT>
	fetchedBooks: BookT[]
	resetCatalog: () => void
}>

export default function BookCatalogStateProvider<
	BookT extends Record<string, unknown>,
	FiltersInfoT extends BookFiltersInfo<FiltersT>,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortInfoT extends BookSortInfo<SortT>,
	SortT,
>({
	children,
	fetchedBooks,
	catalogState,
	resetCatalog,
}: BookCatalogStateProviderProps<
	BookT,
	FiltersInfoT,
	FiltersT,
	SortInfoT,
	SortT
>): ReactNode {
	useEffect(() => {
		resetCatalog()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedBooks])

	return (
		<BookCatalogBooksContext
			value={
				catalogState.filtersInfo.isFilterActive ||
				catalogState.sortInfo.isSortActive
					? catalogState.displayedBooks
					: fetchedBooks
			}
		>
			<BookCatalogSortContext value={catalogState.sortInfo}>
				<BookCatalogFiltersContext value={catalogState.filtersInfo}>
					{children}
				</BookCatalogFiltersContext>
			</BookCatalogSortContext>
		</BookCatalogBooksContext>
	)
}
