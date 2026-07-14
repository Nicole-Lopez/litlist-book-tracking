import { useQuery } from '@apollo/client/react'
import { CategoryBooksDocument } from '../services/categoryBooks/generated/categoryBooks.query.generated'
import { CATEGORY_TO_API_CATEGORY } from '@services/books/api/enums.apiAdapters'
import { bookPreviewAdapter } from '@adapters/book.adapters'
import type { BookPreview } from '@models/book.models'
import type { Category } from '@models/category.models'

export type UseCategoryBooksReturn = {
	isLoading: boolean
	isError: boolean
	results: BookPreview[]
}

export function useCategoryBooks(category: Category): UseCategoryBooksReturn {
	const { data, loading, error } = useQuery(CategoryBooksDocument, {
		variables: { category: CATEGORY_TO_API_CATEGORY[category] },
	})

	return {
		isLoading: loading,
		isError: !!error,
		results:
			data?.booksByCategory?.map(book =>
				bookPreviewAdapter({
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
				}),
			) ?? [],
	}
}
