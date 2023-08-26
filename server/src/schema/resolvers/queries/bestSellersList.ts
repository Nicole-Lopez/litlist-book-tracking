import { BEST_SELLERS_LISTS_AVAILABLE_NYTIMES_SEARCH_TERM } from '@constants/apiConstants.js'
import { bookSummaryAdapter } from '@adapters/bookAdapters.js'
import type {
	GqlQueryResolvers,
	GqlBestSellersListsAvailable,
	GqlBestSellersList,
} from '@gqlTypes'

export const allBestSellersLists: GqlQueryResolvers['allBestSellersLists'] =
	async (_, _2, { dataSources }) => {
		const data = await dataSources.bestSellersAPI.getAllBestSellersLists()

		if (data !== undefined && data !== null) {
			const allLists: GqlBestSellersList[] = []
			const MAX_BOOKS = 10

			const bestSellersListsValues = Object.values(
				BEST_SELLERS_LISTS_AVAILABLE_NYTIMES_SEARCH_TERM,
			)
			const bestSellersListsKeys = Object.keys(
				BEST_SELLERS_LISTS_AVAILABLE_NYTIMES_SEARCH_TERM,
			) as GqlBestSellersListsAvailable[]

			for (let i = 0; i < data.length; ++i) {
				if (allLists.length >= bestSellersListsValues.length) {
					break
				}

				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { list_name_encoded, books, list_id } = data[i]

				if (bestSellersListsValues.includes(list_name_encoded)) {
					allLists.push({
						id: `${list_id}`,
						listName:
							bestSellersListsKeys[
								bestSellersListsValues.indexOf(
									list_name_encoded,
								)
							],
						last_modified: books[0].created_date.split(' ')[0],
						books: books.slice(0, MAX_BOOKS).map(book =>
							bookSummaryAdapter({
								id: `${book.rank}${book.title}-${book.book_uri}`,
								isGoogleID: false,
								title: book.title,
								authors: [book.author],
								cover: book.book_image,
							}),
						),
					})
				}
			}

			return allLists
		} else {
			return null
		}
	}
