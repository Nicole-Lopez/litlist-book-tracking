import type { Prettify } from '@customTypes/customUtilityTypes'

export type BookId = string
export type BookAuthor = string
export type BookCategory = string
export type BookPageCount = number
export type BookContentWarning = string
export type BookPublishedYear = number

export type BookSummary = {
	id: BookId
	isExternalId: boolean
	title: string
	authors?: BookAuthor[]
	cover?: string
	isbn10?: string
	isbn13?: string
}

export type BookPreview = Prettify<
	BookSummary & {
		publishedYear?: BookPublishedYear
		pageCount?: BookPageCount
		categories?: BookCategory[]
		contentWarnings?: BookContentWarning[]
	}
>

export type BookDetails = Prettify<
	BookPreview & {
		subtitle?: string
		characters?: string[]
		description?: string
		publishedDate?: string
		lang?: string
		publisher?: string
		relatedBooks?: BookSummary[]
	}
>
