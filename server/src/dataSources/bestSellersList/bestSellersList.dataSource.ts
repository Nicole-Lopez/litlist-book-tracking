import { BaseDataSource } from '@dataSources/baseDataSource.js'
import {
	BEST_SELLERS_LIST_NAMES,
	BEST_SELLERS_LIST_MAX_BOOKS,
	TOTAL_BEST_SELLERS_LISTS,
} from '@constants/bestSellersList.constants.js'
import { bestSellersListAdapter } from '@adapters/bestSellersList.adapters.js'
import { bookSummaryAdapter } from '@adapters/book.adapters.js'
import { ListNameEncoded } from './bestSellersList.apiModels.js'
import type { AugmentedRequest, CacheOptions } from '@apollo/datasource-rest'
import type { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource.js'
import type {
	BestSellersList,
	BestSellersListName,
} from '@models/bestSellersList.models.js'
import type { BookSummary } from '@models/book.models.js'
import type { List, ListsFullOverview } from './bestSellersList.apiModels.js'

export class BestSellersListDataSource extends BaseDataSource {
	override baseURL = 'https://api.nytimes.com/svc/books/v3/lists/'

	protected readonly listNameByEncoded = {
		[ListNameEncoded.CombinedPrintAndEBookFiction]: BEST_SELLERS_LIST_NAMES.fiction,
		[ListNameEncoded.CombinedPrintAndEBookNonfiction]:
			BEST_SELLERS_LIST_NAMES.nonFiction,
		[ListNameEncoded.YoungAdultHardcover]: BEST_SELLERS_LIST_NAMES.youngAdult,
		[ListNameEncoded.ChildrensMiddleGradeHardcover]:
			BEST_SELLERS_LIST_NAMES.childrens,
		[ListNameEncoded.GraphicBooksAndManga]:
			BEST_SELLERS_LIST_NAMES.graphicBooksAndManga,
	} as Readonly<Record<ListNameEncoded, BestSellersListName>>

	protected override willSendRequest(
		_path: string,
		requestOpts: AugmentedRequest<CacheOptions>,
	): ValueOrPromise<void> {
		requestOpts.params.set('api-key', `${process.env.BEST_SELLERS_LIST_API_KEY}`)
	}

	protected mapListId(listData: List): string {
		return `${listData.list_id}-${listData.list_name_encoded}`
	}

	protected mapBooks(listData: List): BookSummary[] {
		const books: BookSummary[] = []

		for (let i = 0; i < listData.books.length; i++) {
			if (books.length >= BEST_SELLERS_LIST_MAX_BOOKS) break

			const book = listData.books[i]

			books.push(
				bookSummaryAdapter({
					id: `${book.rank}-${listData.list_name_encoded}`,
					isExternalId: true,
					title: book.title,
					authors: [book.author],
					cover: book.book_image,
					isbn10: book.primary_isbn10.length !== 0 ? book.primary_isbn10 : null,
					isbn13: book.primary_isbn13.length !== 0 ? book.primary_isbn13 : null,
				}),
			)
		}

		return books
	}

	async getBestSellersLists(): Promise<BestSellersList[]> {
		const data = await this.get<ListsFullOverview>('overview.json')
		const listsData = data.results.lists

		const bestSellersLists: BestSellersList[] = []

		for (let i = 0; i < listsData.length; i++) {
			if (bestSellersLists.length >= TOTAL_BEST_SELLERS_LISTS) break

			const list = listsData[i]
			const listName = this.listNameByEncoded[list.list_name_encoded]

			if (listName) {
				bestSellersLists.push(
					bestSellersListAdapter({
						id: this.mapListId(list),
						listName,
						latestUpdate: new Date(list.books[0].created_date).getTime(),
						books: this.mapBooks(list),
					}),
				)
			}
		}

		return bestSellersLists
	}
}
