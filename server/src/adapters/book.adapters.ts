import {
	parseBookCategories,
	parseBookPageCount,
	parseBookPublishedYear,
} from '@utilities/book.utils.js'
import type { BookPreview, BookSummary, BookDetails } from '@models/book.models.js'
import type { GqlBookPreview, GqlBookDetails, GqlBookSummary } from '@gqlTypes'
import type { NullableProperties } from '@customTypes/customUtilityTypes.js'

export const bookSummaryAdapter = (
	data: {
		id: string
		isGoogleId: boolean
		title: string
	} & NullableProperties<{
		authors?: string[]
		cover?: string
		isbn10?: string
		isbn13?: string
	}>,
): BookSummary => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
	}
}

export const gqlBookSummaryAdapter = (data: BookSummary): GqlBookSummary => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
	}
}

export const bookPreviewAdapter = (
	data: {
		id: string
		isGoogleId: boolean
		title: string
	} & NullableProperties<{
		authors?: string[]
		cover?: string
		isbn10?: string
		isbn13?: string
		publishedYear?: number
		pageCount?: number
		categories?: string[]
	}>,
): BookPreview => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
		publishedYear: parseBookPublishedYear(data.publishedYear),
		pageCount: parseBookPageCount(data.pageCount),
		categories: parseBookCategories(data.categories),
	}
}

export const gqlBookPreviewAdapter = (data: BookPreview): GqlBookPreview => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
		publishedYear: data.publishedYear,
		pageCount: data.pageCount,
		categories: data.categories,
	}
}

export const bookDetailsAdapter = (
	data: {
		id: string
		isGoogleId: boolean
		title: string
	} & NullableProperties<{
		authors?: string[]
		cover?: string
		isbn10?: string
		isbn13?: string
		publishedYear?: number
		pageCount?: number
		categories?: string[]
		subtitle?: string
		description?: string
		publishedDate?: string
		language?: string
		publisher?: string
		relatedBooks?: BookSummary[]
	}>,
): BookDetails => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
		publishedYear: parseBookPublishedYear(data.publishedYear),
		pageCount: parseBookPageCount(data.pageCount),
		categories: parseBookCategories(data.categories),
		subtitle: data.subtitle,
		description: data.description,
		publishedDate: data.publishedDate,
		language: data.language,
		publisher: data.publisher,
		relatedBooks: data.relatedBooks,
	}
}

export const gqlBookDetailsAdapter = (data: BookDetails): GqlBookDetails => {
	return {
		id: data.id,
		isGoogleId: data.isGoogleId,
		title: data.title,
		authors: data.authors,
		cover: data.cover,
		isbn10: data.isbn10,
		isbn13: data.isbn13,
		publishedYear: data.publishedYear,
		pageCount: data.pageCount,
		categories: data.categories,
		subtitle: data.subtitle,
		description: data.description,
		publishedDate: data.publishedDate,
		language: data.language,
		publisher: data.publisher,
		relatedBooks: data.relatedBooks?.map(book => gqlBookSummaryAdapter(book)),
	}
}
