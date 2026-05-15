import { bestSellersLists } from './bestSellersList.queries.js'
import { booksByCategory } from './category.queries.js'
import { bookDetails, searchBooks } from './book.queries.js'
import type { GqlResolvers } from '@gqlTypes'

const queries: GqlResolvers = {
	Query: {
		bestSellersLists,
		booksByCategory,
		searchBooks,
		bookDetails,
	},
}

export default queries
