import { CATEGORIES_LIST } from '@constants/category.constants'
import type { LoaderFunctionArgs } from 'react-router-dom'
import type { CategoriesRouteParams } from '@router/routeParams.models'

export const categoryLoader = ({ params }: LoaderFunctionArgs): CategoriesRouteParams => {
	const { category } = params as CategoriesRouteParams

	if (!category || !CATEGORIES_LIST.includes(category))
		throw new Response('Category Not Found', { status: 404 })

	return { category }
}
