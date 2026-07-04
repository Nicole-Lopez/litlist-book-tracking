import { lazy, Suspense } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDebounceSearch } from '@hooks/useDebounceSearch'
import { useSearchBooks } from './hooks/useSearchBooks'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import {
	SEARCH_BOOKS_ROOT,
	SEARCH_ROOT,
} from '@services/internationalization/roots/search.constants'
import { getBookDetailsLink, getSearchLink } from '@router/routeFormatters.utils'
import SearchResultsLoader from './assets/loaders/SearchResultsLoader'
import BarLoader from '@assets/loaders/BarLoader/BarLoader'
import SearchIcon from '@assets/icons/SearchIcon'
import SearchInputField from '@components/SearchInputField/SearchInputField'
import './SearchBar.scss'
import type { ReactNode } from 'react'

const GridBookCard = lazy(() => import('@components/GridBookCard/GridBookCard'))

export type SearchBarProps = {
	onClose: () => void
}

export default function SearchBar({ onClose }: SearchBarProps): ReactNode {
	const navigate = useNavigate()
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const { query, setQuery, isSearchActive } = useDebounceSearch({
		onDebounce: debouncedQuery => {
			if (!isSearchActive) return

			searchBooks(debouncedQuery)
		},
	})
	const { searchBooks, isLoading, isError, results, totalResults } =
		useSearchBooks(query)

	const resetAndCloseSearchBar = (): void => {
		onClose()
		setQuery('')
	}

	const redirectSearch = (): void => {
		if (isSearchActive) {
			navigate(getSearchLink({ q: query }).to)
			resetAndCloseSearchBar()
		}
	}

	return (
		<>
			<SearchInputField
				className='root-header-search-bar__search-input-field'
				onSearch={redirectSearch}
			>
				<SearchIcon />
				<SearchInputField.Input
					maxLength={600}
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={t(SEARCH_BOOKS_ROOT.placeholder)}
					autoComplete='search'
				/>
				<SearchInputField.ClearQueryButton
					query={query}
					onClick={resetAndCloseSearchBar}
				/>
			</SearchInputField>

			{isLoading && isSearchActive ? (
				<BarLoader className='root-header-search-bar__search-loader' />
			) : null}

			<div className='root-header-search-bar__search-results'>
				<Suspense fallback={<SearchResultsLoader />}>
					{!isSearchActive ? null : isLoading ? (
						<SearchResultsLoader />
					) : isError ? (
						<p className='root-header-search-bar__error'>
							{t(SEARCH_ROOT.errorMessage)}
						</p>
					) : (
						<>
							<div className='root-header-search-bar__results-info'>
								<span>
									{t(SEARCH_ROOT.resultsSummary.counter, {
										count: totalResults,
									})}
								</span>

								<button
									className='root-header-search-bar__view-all-results-btn'
									onClick={redirectSearch}
									disabled={totalResults === 0}
								>
									{t(SEARCH_ROOT.viewResults.viewAll)}
								</button>
							</div>

							<div className='root-header-search-bar__results'>
								{totalResults === 0 ? (
									<p className='root-header-search-bar__no-results'>
										{t(SEARCH_ROOT.resultsSummary.noResultsMessage, {
											query,
										})}
									</p>
								) : (
									results?.map(result => (
										<Link
											{...getBookDetailsLink(result)}
											key={result.id}
										>
											<GridBookCard
												title={result.title}
												authors={result.authors}
												cover={result.cover}
											/>
										</Link>
									))
								)}
							</div>
						</>
					)}
				</Suspense>
			</div>
		</>
	)
}
