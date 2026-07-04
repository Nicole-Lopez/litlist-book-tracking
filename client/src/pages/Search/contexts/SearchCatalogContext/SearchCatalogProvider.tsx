import { useReducer } from 'react'
import { useFetchedBooks } from '@pages/Search/hooks/useFetchedBooks'
import { ACTION_TYPES, INITIAL_STATE } from './constants/reducer.constants'
import { SearchCatalogActionsContext } from './searchCatalogContext'
import searchCatalogReducer from './searchCatalogReducer'
import BookCatalogStateProvider from '@contexts/BookCatalogStateContext/BookCatalogStateProvider'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'

export type SearchCatalogProviderProps = PropsOnlyChildren

export default function SearchCatalogProvider({
	children,
}: SearchCatalogProviderProps): ReactNode {
	const fetchedBooks = useFetchedBooks()
	const [searchCatalogState, dispatch] = useReducer(searchCatalogReducer, INITIAL_STATE)

	return (
		<BookCatalogStateProvider
			fetchedBooks={fetchedBooks.books}
			catalogState={searchCatalogState}
			resetCatalog={() => {
				dispatch({
					type: ACTION_TYPES.CATALOG_RESET,
					payload: { fetchedBooks: fetchedBooks.books },
				})
			}}
		>
			<SearchCatalogActionsContext value={dispatch}>
				{children}
			</SearchCatalogActionsContext>
		</BookCatalogStateProvider>
	)
}
