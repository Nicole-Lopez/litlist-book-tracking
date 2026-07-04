import { useFetchedDataContext } from '@contexts/FetchedDataContext/fetchedDataContext'
import type { SearchBookPreview } from '../models/searchBook.models'

export type UseFetchedBooksReturn = {
	books: SearchBookPreview[]
	isLoading: boolean
	isError: boolean
	query: string
	totalBooks: number
}

export function useFetchedBooks(): UseFetchedBooksReturn {
	const { data, isLoading, isError, inputValue, dataLength } =
		useFetchedDataContext<SearchBookPreview[]>()

	return {
		books: data,
		isLoading: isLoading,
		isError: isError,
		query: inputValue ?? '',
		totalBooks: dataLength ?? 0,
	}
}
