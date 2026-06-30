import { useLazyQuery } from '@apollo/client/react'
import { SearchBooksLimitedDocument } from '../services/searchBooks/generated/searchBooksLimited.query.generated'
import { bookSummaryAdapter } from '@adapters/book.adapters'
import type { BookSummary } from '@models/book.models'

export type UseSearchBooksReturn = {
	searchBooks: (query: string) => void
	isLoading: boolean
	isError: boolean
	results: BookSummary[]
	totalResults: number
}

export function useSearchBooks(query: string): UseSearchBooksReturn {
	const [fetchBooks, { data, loading, error, variables }] = useLazyQuery(
		SearchBooksLimitedDocument,
	)

	const searchBooks = (query: string): void => {
		fetchBooks({ variables: { query, limit: 15 } })
	}

	return {
		searchBooks,
		isLoading: loading || variables.query !== query,
		isError: !!error,
		results:
			data?.searchBooks?.books?.map(book =>
				bookSummaryAdapter({
					id: book.id,
					isExternalId: book.isExternalId,
					title: book.title,
					authors: book.authors,
					cover: book.cover,
				}),
			) ?? [],
		totalResults: data?.searchBooks?.totalCount ?? 0,
	}
}
