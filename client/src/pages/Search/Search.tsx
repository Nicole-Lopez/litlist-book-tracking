import { lazy, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '@hooks/useQueryParams'
import { useSearchBooks } from './hooks/useSearchBooks'
import { isBlankString } from '@utilities/string.utils'
import { getSearchLink } from '@router/routeFormatters.utils'
import FetchedDataProvider from '@contexts/FetchedDataContext/FetchedDataProvider'
import SearchCatalogProvider from './contexts/SearchCatalogContext/SearchCatalogProvider'
import SearchBar from './components/SearchBar/SearchBar'
import ResultsLength from './components/ResultsLength/ResultsLength'
import Catalog from './components/Catalog/Catalog'
import './Search.scss'
import type { ReactNode } from 'react'
import type { SearchRouteQueries } from '@router/routeParams.models'

const ErrorFallback = lazy(() => import('@components/ErrorFallback/ErrorFallback'))

const SEARCH_QUERY_DEFAULT = 'tj klune'

export default function Search(): ReactNode {
	const navigate = useNavigate()
	const { queryParams, setQueryParams } = useQueryParams<SearchRouteQueries>()

	const currentQuery =
		queryParams.q && !isBlankString(queryParams.q)
			? queryParams.q
			: SEARCH_QUERY_DEFAULT

	const { results, isLoading, isError, totalResults } = useSearchBooks(currentQuery)

	useLayoutEffect(() => {
		if (!queryParams.q || isBlankString(queryParams.q)) {
			navigate(getSearchLink({ q: SEARCH_QUERY_DEFAULT }).to)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const searchBooks = (query: string): void => {
		setQueryParams({ q: query })
	}

	if (isError) {
		return <ErrorFallback />
	}

	return (
		<main className='search-page'>
			<FetchedDataProvider
				data={results}
				isLoading={isLoading}
				isError={isError}
				dataLength={totalResults}
				inputValue={currentQuery}
			>
				<ResultsLength />

				<SearchBar searchBooks={searchBooks} />

				<SearchCatalogProvider>
					<Catalog />
				</SearchCatalogProvider>
			</FetchedDataProvider>
		</main>
	)
}
