import { COVER_DEFAULT } from '@constants/bookConstants.js'
import { arrayIsNotEmpty } from '@utilities/generalUtils.js'
import type { BookPreview, BookSummary, BookDetail } from '@models/bookModel'
import type { GqlBookPreview, GqlBookSummary, GqlBookDetail } from '@gqlTypes'

export const bookPreviewAdapter = (book: BookPreview): GqlBookPreview => {
	const LIMIT_CATEGORIES = 10
	const LIMIT_ISBN = 3

	return {
		id: book.id,
		isGoogleID: book.isGoogleID,
		title: book.title,
		authors: getAuthors(book.authors),
		cover: book.cover ?? COVER_DEFAULT,
		publishedYear:
			book.publishedYear !== undefined && !isNaN(book.publishedYear)
				? book.publishedYear
				: null,
		pageCount: getPageCount(book.pageCount),
		categories: arrayIsNotEmpty(book.categories)
			? book.categories?.slice(0, LIMIT_CATEGORIES)
			: null,
		isbn: arrayIsNotEmpty(book.isbn)
			? book.isbn!.slice(0, LIMIT_ISBN)
			: null,
	}
}

export const bookSummaryAdapter = (book: BookSummary): GqlBookSummary => {
	return {
		id: book.id,
		isGoogleID: book.isGoogleID,
		title: book.title,
		authors: getAuthors(book.authors),
		cover: book.cover ?? COVER_DEFAULT,
	}
}

export const bookDetailAdapter = (book: BookDetail): GqlBookDetail => {
	return {
		title: book.title,
		authors: getAuthors(book.authors),
		cover: book.cover ?? COVER_DEFAULT,
		subtitle: book.subtitle,
		description:
			book.description !== undefined && book.description?.length !== 0
				? book.description
				: null,
		additionalInfo: {
			pageCount: book.additionalInfo.pageCount,
			publishedDate: book.additionalInfo.publishedDate,
			language: book.additionalInfo.language,
			publisher: book.additionalInfo.publisher,
		},
		categories: {
			subject:
				book.categories.subject !== undefined
					? [...book.categories.subject]
					: null,
			person:
				book.categories.person !== undefined
					? [...book.categories.person]
					: null,
			place:
				book.categories.place !== undefined
					? [...book.categories.place]
					: null,
		},
	}
}

const getPageCount = (pageCount: number | undefined): number | null => {
	return pageCount !== undefined && pageCount > 0 ? pageCount : null
}

const getAuthors = (authors = ['Anonymous']): string[] => authors
