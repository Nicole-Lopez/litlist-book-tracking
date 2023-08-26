type PossiblyUndefined<T> = T | undefined

export type BookID = string

export interface BookSummary {
	id: BookID
	isGoogleID: boolean
	title: string
	authors: PossiblyUndefined<string[]>
	cover: PossiblyUndefined<string>
}

export type BookPreview = BookSummary & {
	publishedYear: PossiblyUndefined<number>
	pageCount: PossiblyUndefined<number>
	categories: PossiblyUndefined<string[]>
	isbn: PossiblyUndefined<string[]>
}

export type BookDetail = Pick<BookSummary, 'title' | 'authors' | 'cover'> & {
	subtitle: PossiblyUndefined<string>
	description: PossiblyUndefined<string>
	additionalInfo: {
		pageCount: PossiblyUndefined<number>
		publishedDate: PossiblyUndefined<string>
		language: PossiblyUndefined<string>
		publisher: PossiblyUndefined<string>
	}
	categories: {
		subject?: Set<string>
		place?: Set<string>
		person?: Set<string>
	}
}
