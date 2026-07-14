import type { Category } from '@models/category.models'

export type CategoriesRouteParams = {
	category: Category
}

export type SearchRouteQueries = {
	q: string
}
