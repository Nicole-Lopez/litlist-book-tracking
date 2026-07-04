import { useQuery } from '@apollo/client/react'
import { SearchBooksDocument } from '../services/searchBooks/generated/searchBooks.query.generated'
import { searchBookAdapter } from '../adapters/searchBook.adapters'
import { removeDiacritics } from '@utilities/string.utils'
import type { SearchBookPreview } from '../models/searchBook.models'

export type UseSearchBooksReturn = {
	isLoading: boolean
	isError: boolean
	results: SearchBookPreview[]
	totalResults: number
}

export function useSearchBooks(query: string): UseSearchBooksReturn {
	const normalizedQuery = removeDiacritics(query).toLowerCase()
	const { data, loading, error } = useQuery(SearchBooksDocument, {
		variables: { query },
	})

	return {
		isLoading: loading,
		isError: !!error,
		results:
			data?.searchBooks?.books?.map(book =>
				searchBookAdapter(
					{
						id: book.id,
						isExternalId: book.isExternalId,
						title: book.title,
						authors: book.authors,
						cover: book.cover,
						isbn10: book.isbn10,
						isbn13: book.isbn13,
						publishedYear: book.publishedYear,
						pageCount: book.pageCount,
						categories: book.categories,
						contentWarnings: book.contentWarnings,
					},
					normalizedQuery,
				),
			) ?? [],
		totalResults: data?.searchBooks?.totalCount ?? 0,
	}
}
