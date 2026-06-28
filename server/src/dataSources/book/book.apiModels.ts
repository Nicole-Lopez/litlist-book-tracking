export type BookDetailsQueryVariables = {
	id: number
}

export type BookDetailsQuery = {
	books_by_pk?: {
		id: number
		title?: string
		subtitle?: string
		description?: string
		pages?: number
		release_date?: string
		release_year?: number
		image?: Image
		contributions?: Contribution[]
		book_characters?: BookCharacter[]
		taggings?: Tag[]
		default_cover_edition?: {
			isbn_10?: string
			isbn_13?: string
			language?: {
				language?: string
			}
			publisher?: {
				name?: string
			}
		}
	}
}

export type BooksByAuthorQueryVariables = {
	authorName: string
	offset?: number
	limit?: number
}

export type BooksByAuthorQuery = {
	books?: Array<{
		title?: string
		id: number
		pages?: number
		release_year?: number
		image?: Image
		contributions?: Contribution[]
		default_cover_edition?: {
			isbn_10?: string
			isbn_13?: string
		}
		taggings?: Tag[]
	}>
}

export type BooksByCategoryQueryVariables = {
	categoryId: number
	offset: number
	limit: number
}

export type BooksByCategoryQuery = {
	tags_by_pk?: {
		taggings?: Array<{
			book?: {
				title?: string
				id: number
				pages?: number
				release_year?: number
				image?: Image
				contributions?: Contribution[]
				default_cover_edition?: {
					isbn_10?: string
					isbn_13?: string
				}
				taggings?: Tag[]
			}
		}>
	}
}

export type RelatedBooksQueryVariables = {
	category: string
	offset?: number
	limit?: number
}

export type RelatedBooksQuery = {
	books?: Array<{
		title?: string
		id: number
		pages?: number
		release_year?: number
		image?: Image
		contributions?: Contribution[]
		default_cover_edition?: {
			isbn_10?: string
			isbn_13?: string
		}
		taggings?: Tag[]
	}>
}

export type SearchBooksQueryVariables = {
	query: string
	page?: number
	perPage?: number
}

export type SearchBooksQuery = {
	search?: {
		results?: {
			found: number
			hits?: Array<{
				document?: {
					id?: string
					title?: string
					author_names?: string[]
					image?: Image
					isbns?: string[]
					release_year?: number
					pages?: number
					content_warnings?: string[]
					genres?: string[]
				}
			}>
		}
	}
}

export type Contribution = {
	author?: {
		name?: string
	}
}

export type Image = {
	url?: string
}

export type Tag = {
	tag?: {
		tag?: string
		tag_category?: {
			category?: TagCategory
		}
	}
}

export const enum TagCategory {
	Genre = 'Genre',
	Tag = 'Tag',
	ContentWarning = 'Content Warning',
	Mood = 'Mood',
	Pace = 'Pace',
}

export type BookCharacter = {
	character?: {
		name?: string
	}
}
