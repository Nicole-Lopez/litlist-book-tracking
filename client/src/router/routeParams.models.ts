type RouteParams<T> = Readonly<Partial<T>>

export type CategoriesRouteParams = RouteParams<{
	category: string
}>

export type SearchRouteQueries = {
	q: string
}
