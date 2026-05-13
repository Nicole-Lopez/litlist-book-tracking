import type {
	BookCategory,
	BookPageCount,
	BookPublishedYear,
} from '@models/book.models.js'

export const parseBookPublishedYear = (
	year: number | undefined | null,
): BookPublishedYear | null => (year && year >= 1000 && year <= 2500 ? year : null)

export const parseBookPageCount = (
	pageCount: number | undefined | null,
): BookPageCount | null => (pageCount && pageCount >= 1 ? pageCount : null)

export const parseBookCategories = (
	categories: string[] | undefined | null,
): BookCategory[] | null => {
	if (!categories?.length) return null

	return categories.length > 10 ? categories.slice(0, 10) : categories
}
