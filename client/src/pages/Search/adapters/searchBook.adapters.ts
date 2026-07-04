import { BOOK_SEARCH_MATCHES } from '../constants/bookCatalog.constants'
import { bookPreviewAdapter } from '@adapters/book.adapters'
import { removeDiacritics } from '@utilities/string.utils'
import type { NullableProperties } from '@customTypes/customUtilityTypes'
import type { BookSearchMatch, SearchBookPreview } from '../models/searchBook.models'

export const searchBookAdapter = (
	data: {
		id: string
		isExternalId: boolean
		title: string
	} & NullableProperties<{
		authors?: string[]
		cover?: string
		isbn10?: string
		isbn13?: string
		publishedYear?: number
		pageCount?: number
		categories?: string[]
		contentWarnings?: string[]
	}>,
	query: string,
): SearchBookPreview => {
	const book = bookPreviewAdapter({
		id: data.id,
		isExternalId: data.isExternalId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
		publishedYear: data.publishedYear,
		pageCount: data.pageCount,
		categories: data.categories,
		contentWarnings: data.contentWarnings,
	})
	const searchMatches: BookSearchMatch[] = []

	if (removeDiacritics(book.title).toLowerCase().includes(query)) {
		searchMatches.push(BOOK_SEARCH_MATCHES.title)
	}

	if (
		book.authors?.some(author =>
			removeDiacritics(author).toLowerCase().includes(query),
		)
	) {
		searchMatches.push(BOOK_SEARCH_MATCHES.author)
	}

	if (book.isbn13?.includes(query) || book.isbn10?.includes(query)) {
		searchMatches.push(BOOK_SEARCH_MATCHES.isbn)
	}

	return { ...book, searchMatches }
}
