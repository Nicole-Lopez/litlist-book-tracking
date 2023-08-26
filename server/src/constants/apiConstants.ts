import { GqlCategoriesAvailable, GqlBestSellersListsAvailable } from '@gqlTypes'
import type { Categories } from '@models/restApiModels/OpenLibraryApiModel'
import type { ListNameEncoded } from '@models/restApiModels/NYTimesApiModel'

/**
|--------------------------------------------------
| GOOGLE BOOKS
|--------------------------------------------------
*/
export const GOOGLEBOOKS_MAXRESULTS_LIMIT = '40'

/**
|--------------------------------------------------
| OPEN LIBRARY
|--------------------------------------------------
*/
export const CATEGORIES_AVAILABLE_OPENLIBRARY_SEARCH_TERM: Record<
	GqlCategoriesAvailable,
	string
> = {
	[GqlCategoriesAvailable.Fiction]: 'fiction',
	[GqlCategoriesAvailable.NonFiction]: 'non-fiction',
	[GqlCategoriesAvailable.Romance]: 'romance',
	[GqlCategoriesAvailable.YoungAdultFiction]: 'young_adult_fiction',
	[GqlCategoriesAvailable.Action]: 'action',
	[GqlCategoriesAvailable.Fantasy]: 'fantasy',
	[GqlCategoriesAvailable.Horror]: 'horror',
	[GqlCategoriesAvailable.Mystery]: 'mystery',
	[GqlCategoriesAvailable.Thriller]: 'thriller',
	[GqlCategoriesAvailable.Suspense]: 'suspense',
	[GqlCategoriesAvailable.ScienceFiction]: 'science_fiction',
	[GqlCategoriesAvailable.Art]: 'art',
	[GqlCategoriesAvailable.Philosophy]: 'philosophy',
	[GqlCategoriesAvailable.Religion]: 'religion',
	[GqlCategoriesAvailable.Travel]: 'travel',
	[GqlCategoriesAvailable.Childrens]: "children's",
	[GqlCategoriesAvailable.Comics]: 'comics',
	[GqlCategoriesAvailable.Werewolves]: 'werewolves',
	[GqlCategoriesAvailable.Vampires]: 'vampires',
}

export const BOOK_CATEGORIES_DETAIL_AVAILABLE: Array<keyof Categories> = [
	'subject',
	'place',
	'person',
]
/**
|--------------------------------------------------
| NY TIMES
|--------------------------------------------------
*/
export const BEST_SELLERS_LISTS_AVAILABLE_NYTIMES_SEARCH_TERM: Record<
	GqlBestSellersListsAvailable,
	ListNameEncoded
> = {
	[GqlBestSellersListsAvailable.HardcoverFiction]: 'hardcover-fiction',
	[GqlBestSellersListsAvailable.HardcoverNonfiction]: 'hardcover-nonfiction',
	[GqlBestSellersListsAvailable.PrintAndEbookFiction]:
		'combined-print-and-e-book-fiction',
	[GqlBestSellersListsAvailable.PrintAndEbookNonfiction]:
		'combined-print-and-e-book-nonfiction',
	[GqlBestSellersListsAvailable.PaperbackFiction]: 'trade-fiction-paperback',
	[GqlBestSellersListsAvailable.PaperbackNonfiction]: 'paperback-nonfiction',
	[GqlBestSellersListsAvailable.YoungAdultHardcover]: 'young-adult-hardcover',
	[GqlBestSellersListsAvailable.MiddleGradeHardcover]:
		'childrens-middle-grade-hardcover',
	[GqlBestSellersListsAvailable.GraphicBooksAndManga]:
		'graphic-books-and-manga',
}
