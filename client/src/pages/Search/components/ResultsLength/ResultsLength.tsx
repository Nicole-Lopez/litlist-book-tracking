import { useTranslation } from 'react-i18next'
import { useFetchedBooks } from '@pages/Search/hooks/useFetchedBooks'
import { SEARCH_ROOT } from '@services/internationalization/roots/search.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import type { ReactNode } from 'react'

export default function ResultsLength(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const { isLoading, query, totalBooks } = useFetchedBooks()

	if (isLoading) {
		return (
			<>
				<SkeletonLoader
					isText
					className='search-page__title search-page__title--results-length search-page__title--loader'
				/>
				<SkeletonLoader
					isText
					className='search-page__title search-page__title--query search-page__title--loader'
				/>
			</>
		)
	}

	return (
		<>
			<h1 className='search-page__title search-page__title--results-length'>
				{t(SEARCH_ROOT.resultsSummary.counter, { count: totalBooks })}
			</h1>

			<p className='search-page__title search-page__title--query'>
				{t(SEARCH_ROOT.resultsSummary.forQuery, { query })}
			</p>
		</>
	)
}
