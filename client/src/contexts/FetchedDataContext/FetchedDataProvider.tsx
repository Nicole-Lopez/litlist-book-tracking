import { FetchedDataContext } from './fetchedDataContext'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { FetchedDataContextValue } from './models/context.models'

export type FetchedDataProviderProps<DataT> = PropsWithChildren<
	FetchedDataContextValue<DataT>
>

export default function FetchedDataProvider<DataT>({
	data,
	isLoading,
	isError,
	inputValue,
	dataLength,
	children,
}: FetchedDataProviderProps<DataT>): ReactNode {
	const value: FetchedDataContextValue<DataT> = {
		data,
		isLoading,
		isError,
		inputValue,
		dataLength,
	}

	return <FetchedDataContext value={value}>{children}</FetchedDataContext>
}
