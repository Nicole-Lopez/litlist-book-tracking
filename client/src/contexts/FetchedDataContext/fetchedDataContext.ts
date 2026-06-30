import { createContext, useContext } from 'react'
import type { FetchedDataContextValue } from './models/context.models'

export const FetchedDataContext = createContext<
	FetchedDataContextValue<unknown> | undefined
>(undefined)

export function useFetchedDataContext<DataT>(): FetchedDataContextValue<DataT> {
	const context = useContext(FetchedDataContext)

	if (context === undefined)
		throw new Error('useFetchedDataContext must be used within a FetchedDataProvider')

	return context as FetchedDataContextValue<DataT>
}
