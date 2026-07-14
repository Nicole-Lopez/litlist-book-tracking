import { useFetchedDataContext } from '@contexts/FetchedDataContext/fetchedDataContext'
import type { BookPreview } from '@models/book.models'

export type UseFetchedBooksReturn = {
	books: BookPreview[]
	isLoading: boolean
	isError: boolean
	category: string
	totalBooks: number
}

export function useFetchedBooks(): UseFetchedBooksReturn {
	const { data, isLoading, isError, inputValue, dataLength } =
		useFetchedDataContext<BookPreview[]>()

	return {
		books: data,
		isLoading: isLoading,
		isError: isError,
		category: inputValue ?? '',
		totalBooks: dataLength ?? 0,
	}
}
