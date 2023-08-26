import { allBestSellersLists } from '@queries/bestSellersList.js'
import { searchBooks, searchLimitedBooks } from '@queries/searchBooksByTerm.js'
import {
	booksByCategory,
	booksByAuthor,
} from '@queries/searchBooksByProperty.js'
import { bookDetail, findBookId } from '@queries/bookDetail.js'
import type { GqlResolvers } from '@gqlTypes'

const queries: GqlResolvers = {
	Query: {
		allBestSellersLists,

		booksByCategory,
		booksByAuthor,

		searchBooks,
		searchLimitedBooks,

		bookDetail,
		findBookId,
	},
}

export default queries
