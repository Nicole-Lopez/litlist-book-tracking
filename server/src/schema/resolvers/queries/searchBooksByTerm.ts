import { GOOGLEBOOKS_MAXRESULTS_LIMIT } from '@constants/apiConstants.js'
import {
	bookPreviewAdapter,
	bookSummaryAdapter,
} from '@adapters/bookAdapters.js'
import type {
	GqlQueryResolvers,
	GqlSearchLimitedBooks,
	GqlBookPreview,
	GqlBookSummary,
} from '@gqlTypes'
import type { Item } from '@models/restApiModels/GoogleBooksApiModel'

export const searchBooks: GqlQueryResolvers['searchBooks'] = async (
	_,
	{ term },
	{ dataSources },
) => {
	const results = new Map<string, GqlBookPreview>()
	let offset = 0

	while (offset < 2000) {
		let stopLoop: boolean = false
		const fetchApiArr: Array<Promise<Item[] | null>> = []

		for (let i = 0; i < 10; i++) {
			fetchApiArr.push(
				dataSources.booksAPI.getSearchBook(term, `${offset}`),
			)

			offset += +GOOGLEBOOKS_MAXRESULTS_LIMIT
		}

		const fulfilledBooksResults = (await Promise.allSettled(
			fetchApiArr,
		).then(results =>
			results.filter(p => p.status === 'fulfilled'),
		)) as Array<PromiseFulfilledResult<Item[] | null>>

		for (let j = 0; j < fulfilledBooksResults.length; ++j) {
			const data = fulfilledBooksResults[j].value

			if (data !== null && data !== undefined) {
				for (let i = 0; i < data.length; ++i) {
					const { id, volumeInfo } = data[i]

					if (!results.has(id) && volumeInfo.title !== undefined) {
						results.set(
							id,
							bookPreviewAdapter({
								id,
								isGoogleID: true,
								title: volumeInfo.title,
								authors: volumeInfo.authors,
								cover: dataSources.booksAPI.getCover(
									volumeInfo.imageLinks,
								),
								publishedYear: +volumeInfo.publishedDate?.slice(
									0,
									4,
								)!,
								pageCount: volumeInfo.pageCount,
								categories: volumeInfo.categories,
								isbn: dataSources.booksAPI.getIsbn(
									volumeInfo.industryIdentifiers,
								)!,
							}),
						)
					}
				}
			} else {
				stopLoop = true
			}
		}

		if (stopLoop) {
			break
		}
	}

	return [...results.values()]
}

export const searchLimitedBooks: GqlQueryResolvers['searchLimitedBooks'] =
	async (_, { term }, { dataSources }) => {
		const books = new Map<string, GqlBookSummary>()
		const results: GqlSearchLimitedBooks = { length: 0, books: [] }
		let offset = 0

		while (offset < 2000) {
			let stopLoop: boolean = false
			const fetchApiArr: Array<Promise<Item[] | null>> = []

			for (let i = 0; i < 10; i++) {
				fetchApiArr.push(
					dataSources.booksAPI.getSearchBook(term, `${offset}`),
				)

				offset += +GOOGLEBOOKS_MAXRESULTS_LIMIT
			}

			const fulfilledBooksResults = (await Promise.allSettled(
				fetchApiArr,
			).then(results =>
				results.filter(p => p.status === 'fulfilled'),
			)) as Array<PromiseFulfilledResult<Item[] | null>>

			for (let j = 0; j < fulfilledBooksResults.length; ++j) {
				const data = fulfilledBooksResults[j].value

				if (data !== null && data !== undefined) {
					if (results.books.length <= 8) {
						for (let i = 0; i < data.length; ++i) {
							if (books.size === 8) {
								break
							}

							const { id, volumeInfo } = data[i]

							if (
								!books.has(id) &&
								volumeInfo.title !== undefined
							) {
								books.set(
									id,
									bookSummaryAdapter({
										id,
										isGoogleID: true,
										title: volumeInfo.title,
										authors: volumeInfo.authors,
										cover: dataSources.booksAPI.getCover(
											volumeInfo.imageLinks,
										),
									}),
								)
							}
						}
					}

					results.length += data.length
				} else {
					stopLoop = true
				}
			}

			if (stopLoop) {
				break
			}
		}

		results.books = [...books.values()]

		return results
	}
