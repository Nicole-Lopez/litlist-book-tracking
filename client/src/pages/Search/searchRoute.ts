import { redirect } from 'react-router-dom'
import { isBlankString } from '@utilities/string.utils'
import type { LoaderFunctionArgs } from 'react-router-dom'
import type { SearchRouteQueries } from '@router/routeParams.models'

const SEARCH_QUERY_DEFAULT = 'tj klune'

export const searchLoader = ({ request }: LoaderFunctionArgs): SearchRouteQueries => {
	const url = new URL(request.url)
	const query = url.searchParams.get('q')

	if (!query || isBlankString(query)) {
		url.searchParams.set('q', SEARCH_QUERY_DEFAULT)

		throw redirect(`${url.pathname}${url.search}`, { status: 302 })
	}

	return { q: query }
}
