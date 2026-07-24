import type { NullableProperties } from '@customTypes/customUtilityTypes'
import type { BookDetails, BookPreview, BookSummary } from '@models/book.models'

export const bookSummaryAdapter = (
	data: {
		id: string
		isExternalId: boolean
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
		isExternalId: data.isExternalId,
		title: data.title,
		authors: data.authors ?? undefined,
		cover: data.cover ?? undefined,
		isbn10: data.isbn10 ?? undefined,
		isbn13: data.isbn13 ?? undefined,
	}
}

export const bookPreviewAdapter = (
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
): BookPreview => {
	return {
		id: data.id,
		isExternalId: data.isExternalId,
		title: data.title,
		authors: data.authors ?? undefined,
		cover: data.cover ?? undefined,
		isbn10: data.isbn10 ?? undefined,
		isbn13: data.isbn13 ?? undefined,
		publishedYear: data.publishedYear ?? undefined,
		pageCount: data.pageCount ?? undefined,
		categories: data.categories ?? undefined,
		contentWarnings: data.contentWarnings ?? undefined,
	}
}

export const bookDetailsAdapter = (
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
		subtitle?: string
		description?: string
		characters?: string[]
		publishedDate?: string
		lang?: string
		publisher?: string
		relatedBooks?: BookSummary[]
	}>,
): BookDetails => {
	return {
		id: data.id,
		isExternalId: data.isExternalId,
		title: data.title,
		authors: data.authors ?? undefined,
		cover: data.cover ?? undefined,
		isbn10: data.isbn10 ?? undefined,
		isbn13: data.isbn13 ?? undefined,
		publishedYear: data.publishedYear ?? undefined,
		pageCount: data.pageCount ?? undefined,
		categories: data.categories ?? undefined,
		contentWarnings: data.contentWarnings ?? undefined,
		subtitle: data.subtitle ?? undefined,
		description: data.description ?? undefined,
		characters: data.characters ?? undefined,
		publishedDate: data.publishedDate ?? undefined,
		lang: data.lang ?? undefined,
		publisher: data.publisher ?? undefined,
		relatedBooks: data.relatedBooks ?? undefined,
	}
}
