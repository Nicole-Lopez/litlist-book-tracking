export const BEST_SELLERS_LIST_MAX_BOOKS = 10

export const BEST_SELLERS_LIST_NAMES = {
	fiction: 'fiction',
	nonFiction: 'nonFiction',
	youngAdult: 'youngAdult',
	childrens: 'childrens',
	graphicBooksAndManga: 'graphicBooksAndManga',
} as const

export const TOTAL_BEST_SELLERS_LISTS = Object.values(BEST_SELLERS_LIST_NAMES).length
