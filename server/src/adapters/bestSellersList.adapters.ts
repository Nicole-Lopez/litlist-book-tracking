import { BEST_SELLERS_LIST_NAMES } from '@constants/bestSellersList.constants.js'
import { gqlBookSummaryAdapter } from './book.adapters.js'
import { GqlBestSellersListName } from '@gqlTypes'
import type { GqlBestSellersList } from '@gqlTypes'
import type {
	BestSellersList,
	BestSellersListName,
} from '@models/bestSellersList.models.js'
import type { BookSummary } from '@models/book.models.js'

export const bestSellersListAdapter = (data: {
	id: string
	listName: BestSellersListName
	latestUpdate: number
	books: BookSummary[]
}): BestSellersList => {
	return {
		id: data.id,
		listName: data.listName,
		latestUpdate: data.latestUpdate,
		books: data.books,
	}
}

export const BEST_SELLERS_LIST_NAME_TO_GQL_BEST_SELLERS_LIST_NAME: Readonly<
	Record<BestSellersListName, GqlBestSellersListName>
> = {
	[BEST_SELLERS_LIST_NAMES.fiction]: GqlBestSellersListName.Fiction,
	[BEST_SELLERS_LIST_NAMES.nonFiction]: GqlBestSellersListName.NonFiction,
	[BEST_SELLERS_LIST_NAMES.youngAdult]: GqlBestSellersListName.YoungAdult,
	[BEST_SELLERS_LIST_NAMES.childrens]: GqlBestSellersListName.Childrens,
	[BEST_SELLERS_LIST_NAMES.graphicBooksAndManga]:
		GqlBestSellersListName.GraphicBooksAndManga,
}

export const gqlBestSellersListAdapter = (data: BestSellersList): GqlBestSellersList => {
	return {
		id: data.id,
		listName: BEST_SELLERS_LIST_NAME_TO_GQL_BEST_SELLERS_LIST_NAME[data.listName],
		latestUpdate: `${data.latestUpdate}`,
		books: data.books.map(book => gqlBookSummaryAdapter(book)),
	}
}
