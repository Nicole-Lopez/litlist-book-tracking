import { gqlBookDetailsAdapter, gqlBookPreviewAdapter } from '@adapters/book.adapters.js'
import { HttpGraphQLError } from '@utilities/errors.utils.js'
import type { BookDataSource } from '@dataSources/book/book.dataSource.js'
import type { GqlQueryResolvers, GqlBookPreview } from '@gqlTypes'
import type { BookSummary } from '@models/book.models.js'

export const searchBooks: GqlQueryResolvers['searchBooks'] = async (
	_,
	{ query, isFullSearch = true },
	{ dataSources },
) => {
	if (!isFullSearch) {
		const results = await dataSources.bookApi.getSearchBooks(query, 0)

		return results?.size
			? [...results.values()].map(book => gqlBookPreviewAdapter(book))
			: null
	}

	const results = new Map<string, GqlBookPreview>()

	const searchRequests: Array<ReturnType<BookDataSource['getSearchBooks']>> = []

	for (
		let offset = 0;
		offset < dataSources.bookApi.searchLimit;
		offset += dataSources.bookApi.searchMaxResults
	) {
		searchRequests.push(dataSources.bookApi.getSearchBooks(query, offset))
	}

	const settledBooksResults = await Promise.allSettled(searchRequests)

	for (let i = 0; i < settledBooksResults.length; ++i) {
		const settledResult = settledBooksResults[i]

		if (settledResult.status === 'fulfilled') {
			const { value } = settledResult

			if (value === null) break

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
	const bookId = book.isGoogleId ? book.id : await dataSources.bookApi.getBookId(book)

	if (!bookId)
		throw new HttpGraphQLError({ url: '', status: 404, statusText: 'Book not found' })

	const bookDetailsData = await dataSources.bookApi.getBookDetails(bookId)

	const relatedBooks = new Map<string, BookSummary>()
	const maxRelatedBooks = 20

	if (bookDetailsData.authors) {
		const maxAuthorMatches = 0.25 * maxRelatedBooks // 25%
		const primaryAuthor = bookDetailsData.authors[0]

		const authorMatches = await dataSources.bookApi.getSearchBooks(
			'',
			0,
			dataSources.bookApi.searchMaxResults,
			{ author: primaryAuthor },
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
				dataSources.bookApi.getSearchBooks(
					'',
					0,
					dataSources.bookApi.searchMaxResults,
					{ category },
				),
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
