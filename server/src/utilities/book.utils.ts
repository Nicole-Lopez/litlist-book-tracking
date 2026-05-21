import type { BookPageCount, BookPublishedYear } from '@models/book.models.js'

export const parseBookPublishedYear = (
	year: number | undefined | null,
): BookPublishedYear | null => (year && year >= 1000 && year <= 2500 ? year : null)

export const parseBookPageCount = (
	pageCount: number | undefined | null,
): BookPageCount | null => (pageCount && pageCount >= 1 ? pageCount : null)
