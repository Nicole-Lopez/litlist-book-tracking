import { gqlBookDetailsAdapter, gqlBookPreviewAdapter } from '@adapters/book.adapters.js'
import { HttpGraphQLError } from '@utilities/errors.utils.js'
import { generateArray } from '@utilities/array.utils.js'
import type { GqlQueryResolvers, GqlBookPreview } from '@gqlTypes'
import type { BookSummary } from '@models/book.models.js'

export const searchBooks: GqlQueryResolvers['searchBooks'] = async (
	_,
	{ query, isFullSearch = true },
	{ dataSources },
) => {
	if (!isFullSearch) {
		const results = await dataSources.bookApi.getSearchBooks(
			query,
			dataSources.bookApi.searchInitialPage,
		)

		return results?.size
			? [...results.values()].map(book => gqlBookPreviewAdapter(book))
			: null
	}

	const maxResults = 300
	const results = new Map<string, GqlBookPreview>()

	const settledBooksResults = await Promise.allSettled(
		generateArray(maxResults / dataSources.bookApi.searchResultsPerPage, i =>
			dataSources.bookApi.getSearchBooks(query, i + 1),
		),
	)

	for (let i = 0; i < settledBooksResults.length; ++i) {
		const settledResult = settledBooksResults[i]

		if (settledResult.status === 'fulfilled') {
			const { value } = settledResult

			if (!value) break

			for (const [key, book] of value) {
				if (!results.has(key)) {
					results.set(key, gqlBookPreviewAdapter(book))
				}
			}
		}
	}

	return results.size ? [...results.values()] : null
}

export const bookDetails: GqlQueryResolvers['bookDetails'] = async (
	_,
	{ book },
	{ dataSources },
) => {
	const bookId = book.isExternalId ? await dataSources.bookApi.getBookId(book) : book.id

	const bookDetailsData = bookId
		? await dataSources.bookApi.getBookDetails(bookId)
		: null

	if (!bookDetailsData)
		throw new HttpGraphQLError({ url: '', status: 404, statusText: 'Book not found' })

	const relatedBooks = new Map<string, BookSummary>()
	const maxRelatedBooks = 20

	if (bookDetailsData.authors?.length) {
		const maxAuthorMatches = maxRelatedBooks * 0.25 // 25%
		const primaryAuthor = bookDetailsData.authors[0]

		const authorMatches = await dataSources.bookApi.getBooksByAuthor(
			primaryAuthor,
			0,
			20,
		)

		if (authorMatches) {
			for (const [key, book] of authorMatches) {
				if (relatedBooks.size >= maxAuthorMatches) break

				if (
					book.id !== bookDetailsData.id &&
					!relatedBooks.has(key) &&
					book.authors?.some(author =>
						author.toLowerCase().includes(primaryAuthor.toLowerCase()),
					)
				) {
					relatedBooks.set(key, book)
				}
			}
		}
	}

	if (bookDetailsData.categories) {
		const primaryCategories = bookDetailsData.categories.slice(0, 2)
		const maxCategoryMatches =
			(maxRelatedBooks - relatedBooks.size) / primaryCategories.length

		const settledCategoryMatches = await Promise.allSettled(
			primaryCategories.map(category =>
				dataSources.bookApi.getRelatedBooks(category, 0, 20),
			),
		)

		for (let i = 0; i < settledCategoryMatches.length; ++i) {
			const settledCategoryResults = settledCategoryMatches[i]

			if (
				settledCategoryResults.status === 'fulfilled' &&
				settledCategoryResults.value
			) {
				let booksCount = 0

				for (const [key, book] of settledCategoryResults.value) {
					if (
						booksCount >= maxCategoryMatches ||
						relatedBooks.size >= maxRelatedBooks
					)
						break

					if (!relatedBooks.has(key) && book.id !== bookDetailsData.id) {
						relatedBooks.set(key, book)
						booksCount++
					}
				}
			}
		}
	}

	if (relatedBooks.size) {
		bookDetailsData.relatedBooks = [...relatedBooks.values()]
	}

	return gqlBookDetailsAdapter(bookDetailsData)
}
