export type FetchedDataContextValue<DataT> = {
	data: DataT
	isLoading: boolean
	isError: boolean
	inputValue?: string
	dataLength?: number
}
