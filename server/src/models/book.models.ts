import type { NullableProperties, Prettify } from '@customTypes/customUtilityTypes.js'

export type BookId = string
export type BookAuthor = string
export type BookCategory = string
export type BookContentWarning = string
export type BookPublishedYear = number
export type BookPageCount = number

export type BookSummary = Prettify<
	{
		id: BookId
		isExternalId: boolean
		title: string
	} & NullableProperties<{
		authors?: BookAuthor[]
		cover?: string
		isbn10?: string
		isbn13?: string
	}>
>

export type BookPreview = Prettify<
	BookSummary &
		NullableProperties<{
			publishedYear?: BookPublishedYear
			pageCount?: BookPageCount
			categories?: BookCategory[]
			contentWarnings?: BookContentWarning[]
		}>
>

export type BookDetails = Prettify<
	BookPreview &
		NullableProperties<{
			subtitle?: string
			description?: string
			characters?: string[]
			publishedDate?: string
			language?: string
			publisher?: string
			relatedBooks?: BookSummary[]
		}>
>
