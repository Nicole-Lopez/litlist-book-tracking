import { gqlBookDetailsAdapter, gqlBookPreviewAdapter } from '@adapters/book.adapters.js'
import { HttpGraphQLError } from '@utilities/errors.utils.js'
import { generateArray } from '@utilities/array.utils.js'
import type { GqlQueryResolvers, GqlBookPreview } from '@gqlTypes'
import type { BookSummary } from '@models/book.models.js'

const MAX_SEARCH_RESULTS = 300

export const searchBooks: GqlQueryResolvers['searchBooks'] = async (
	_,
	{ query, limit },
	{ dataSources },
) => {
	const maxResults = limit && limit <= MAX_SEARCH_RESULTS ? limit : MAX_SEARCH_RESULTS
	let totalCount = undefined
	const results = new Map<string, GqlBookPreview>()

	const settledBooksResults = await Promise.allSettled(
		generateArray(
			Math.ceil(maxResults / dataSources.bookApi.searchResultsPerPage),
			i => dataSources.bookApi.getSearchBooks(query, i + 1),
		),
	)

	for (let i = 0; i < settledBooksResults.length; ++i) {
		const settledResult = settledBooksResults[i]

		if (settledResult.status === 'fulfilled') {
			const { value } = settledResult

			if (!value) break

			for (const [key, book] of value.results) {
				if (!results.has(key)) {
					results.set(key, gqlBookPreviewAdapter(book))
				}
			}

			if (!totalCount) {
				totalCount = value.count
			}
		}
	}

	if (!totalCount) return { totalCount: 0, books: null }

	return {
		totalCount: totalCount > MAX_SEARCH_RESULTS ? MAX_SEARCH_RESULTS : totalCount,
		books:
			results.size !== maxResults
				? [...results.values()].slice(0, maxResults)
				: [...results.values()],
	}
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
