import { bestSellersLists } from './bestSellersList.queries.js'
import { booksByCategory } from './category.queries.js'
import { searchBooks, searchLimitedBooks } from '@queries/searchBooksByTerm.js'
import { bookDetail, findBookId } from '@queries/bookDetail.js'
import type { GqlResolvers } from '@gqlTypes'

const queries: GqlResolvers = {
	Query: {
		bestSellersLists,
		booksByCategory,

		searchBooks,
		searchLimitedBooks,

		bookDetail,
		findBookId,
	},
}

export default queries