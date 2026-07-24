import type { BookSummary } from '@models/book.models'
import type { Category } from '@models/category.models'

export type CategoriesRouteParams = {
	category: Category
}

export type SearchRouteQueries = {
	q: string
}

export type BookDetailsRouteParams = {
	id?: string
}

export type BookDetailsRouteState = BookSummary
