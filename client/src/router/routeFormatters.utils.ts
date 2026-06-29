import {
	HOME_PATH,
	CATEGORIES_PATH,
	CONTACT_PATH,
	USER_PROFILE_PATH,
	USER_SETTINGS_PATH,
	BOOK_DETAILS_PATH,
} from '@router/routePaths.constants'
import { generatePath } from 'react-router-dom'
import type { CategoriesRouteParams } from '@router/routeParams.models'
import type { LinkProps } from 'react-router-dom'
import type { BookSummary } from '@models/book.models'

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

export const getBookDetailsLink = (book: BookSummary): LinkProps => {
	if (book.isExternalId) {
		return {
			to: generatePath(BOOK_DETAILS_PATH),
			state: book,
		}
	}

	return {
		to: generatePath(BOOK_DETAILS_PATH, { id: book.id }),
	}
}

// User routes
export const getUserProfileRoute = (): string => USER_PROFILE_PATH

export const getUserSettingsRoute = (): string => USER_SETTINGS_PATH
