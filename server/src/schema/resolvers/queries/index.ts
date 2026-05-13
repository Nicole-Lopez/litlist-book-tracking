import { bestSellersLists } from './bestSellersList.queries.js'
import { searchBooks, searchLimitedBooks } from '@queries/searchBooksByTerm.js'
import {
	booksByCategory,
	booksByAuthor,
} from '@queries/searchBooksByProperty.js'
import { bookDetail, findBookId } from '@queries/bookDetail.js'
import type { GqlResolvers } from '@gqlTypes'

const queries: GqlResolvers = {
	Query: {
		bestSellersLists,

		booksByCategory,
		booksByAuthor,

		searchBooks,
		searchLimitedBooks,

		bookDetail,
		findBookId,
	},
}

export default queries