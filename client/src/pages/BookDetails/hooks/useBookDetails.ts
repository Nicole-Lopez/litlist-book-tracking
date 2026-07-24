import { useQuery } from '@apollo/client/react'
import { BookDetailsDocument } from '../services/bookDetails/generated/bookDetails.query.generated'
import { bookDetailsAdapter, bookSummaryAdapter } from '@adapters/book.adapters'
import { isNotFoundError } from '@services/books/api/errors.apiUtils'
import type { BookDetails, BookSummary } from '@models/book.models'

export type UseBookDetailsReturn = {
	isLoading: boolean
	isError: boolean
	bookDetails: BookDetails | undefined
	isNotFound: boolean
}

export function useBookDetails(book: BookSummary): UseBookDetailsReturn {
	const { data, loading, error } = useQuery(BookDetailsDocument, {
		variables: {
			book: {
				id: book.id,
				isExternalId: book.isExternalId,
				title: book.title,
				authors: book.authors,
				isbn10: book.isbn10,
				isbn13: book.isbn13,
			},
		},
	})

	return {
		isLoading: loading,
		isError: !!error,
		isNotFound: !!error && isNotFoundError(error),
		bookDetails: data?.bookDetails
			? bookDetailsAdapter({
					id: data.bookDetails.id,
					isExternalId: data.bookDetails.isExternalId,
					title: data.bookDetails.title,
					authors: data.bookDetails.authors,
					cover: data.bookDetails.cover,
					isbn10: data.bookDetails.isbn10,
					isbn13: data.bookDetails.isbn13,
					publishedYear: data.bookDetails.publishedYear,
					pageCount: data.bookDetails.pageCount,
					categories: data.bookDetails.categories,
					contentWarnings: data.bookDetails.contentWarnings,
					subtitle: data.bookDetails.subtitle,
					characters: data.bookDetails.characters,
					description: data.bookDetails.description,
					publishedDate: data.bookDetails.publishedDate,
					lang: data.bookDetails.language,
					publisher: data.bookDetails.publisher,
					relatedBooks:
						data.bookDetails.relatedBooks?.map(relatedBook =>
							bookSummaryAdapter({
								id: relatedBook.id,
								isExternalId: relatedBook.isExternalId,
								title: relatedBook.title,
								authors: relatedBook.authors,
								cover: relatedBook.cover,
								isbn10: relatedBook.isbn10,
								isbn13: relatedBook.isbn13,
							}),
						) ?? undefined,
				})
			: undefined,
	}
}
