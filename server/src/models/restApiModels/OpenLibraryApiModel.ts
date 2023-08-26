export interface SearchOpenLibraryAPI {
	numFound?: number
	start?: number
	numFoundExact?: boolean
	docs?: Results[]
	num_found?: number
	q?: string
	offset?: number
}

export interface Categories {
	subject?: string[]
	person?: string[]
	place?: string[]
}

export interface Results extends Categories {
	key: string
	title: string
	publish_year?: number[]
	first_publish_year?: number
	number_of_pages_median?: number
	isbn?: string[]
	cover_i?: number
	author_name?: string[]
}
