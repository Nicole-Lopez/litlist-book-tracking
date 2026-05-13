import type { NullableProperties, Prettify } from '@customTypes/customUtilityTypes.js'

export type BookId = string
export type BookAuthor = string
export type BookCategory = string
export type BookPublishedYear = number
export type BookPageCount = number

export type BookSummary = Prettify<
	{
		id: BookId
		isGoogleId: boolean
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
		}>
>

export type BookDetails = Prettify<
	BookPreview &
		NullableProperties<{
			subtitle?: string
			description?: string
			publishedDate?: string
			language?: string
			publisher?: string
			relatedBooks?: BookSummary[]
		}>
>
