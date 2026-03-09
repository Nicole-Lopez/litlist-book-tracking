import { HOME_PATH, CATEGORIES_PATH, CONTACT_PATH } from '@router/routePaths.constants'
import type { CategoriesRouteParams } from '@router/routeParams.models'

export function formatRoute<ParamsT extends Record<string, string>>(
	routeTemplate: string,
	params: ParamsT,
): string {
	let path = routeTemplate

	Object.entries(params).forEach(([key, value]) => {
		path = path.replace(`:${key}`, encodeURIComponent(value))
	})

	return path
}

export const getHomeRoute = (): string => HOME_PATH

export const getContactRoute = (): string => CONTACT_PATH

export const getCategoriesRoute = (params: CategoriesRouteParams): string =>
	formatRoute(CATEGORIES_PATH, params)
