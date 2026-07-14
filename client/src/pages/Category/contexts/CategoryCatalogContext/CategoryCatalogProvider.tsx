import { useReducer } from 'react'
import { useFetchedBooks } from '@pages/Category/hooks/useFetchedBooks'
import { ACTION_TYPES, INITIAL_STATE } from './constants/reducer.constants'
import { CategoryCatalogActionsContext } from './categoryCatalogContext'
import categoryCatalogReducer from './categoryCatalogReducer'
import BookCatalogStateProvider from '@contexts/BookCatalogStateContext/BookCatalogStateProvider'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'

export type CategoryCatalogProviderProps = PropsOnlyChildren

export default function CategoryCatalogProvider({
	children,
}: CategoryCatalogProviderProps): ReactNode {
	const fetchedBooks = useFetchedBooks()
	const [categoryCatalogState, dispatch] = useReducer(
		categoryCatalogReducer,
		INITIAL_STATE,
	)

	return (
		<BookCatalogStateProvider
			fetchedBooks={fetchedBooks.books}
			catalogState={categoryCatalogState}
			resetCatalog={() => {
				dispatch({
					type: ACTION_TYPES.CATALOG_RESET,
					payload: { fetchedBooks: fetchedBooks.books },
				})
			}}
		>
			<CategoryCatalogActionsContext value={dispatch}>
				{children}
			</CategoryCatalogActionsContext>
		</BookCatalogStateProvider>
	)
}
