import type { ValueOf } from '@customTypes/customUtilityTypes.js'
import type { BEST_SELLERS_LIST_NAMES } from '@constants/bestSellersList.constants.js'
import type { BookSummary } from '@models/book.models.js'

export type BestSellersListName = ValueOf<typeof BEST_SELLERS_LIST_NAMES>

export type BestSellersList = {
	id: string
	listName: BestSellersListName
	latestUpdate: number
	books: BookSummary[]
}
