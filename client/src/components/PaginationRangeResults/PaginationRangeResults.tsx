import { useTranslation } from 'react-i18next'
import { SEARCH_ROOT } from '@services/internationalization/roots/search.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import './PaginationRangeResults.scss'
import type { ReactNode } from 'react'

export type PaginationRangeResultsProps = {
	totalItems: number
	startIndex: number
	endIndex: number
	isLoading?: boolean
	className?: string
}

export default function PaginationRangeResults({
	totalItems,
	startIndex,
	endIndex,
	isLoading = false,
	className = '',
}: PaginationRangeResultsProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)

	if (isLoading) {
		return (
			<SkeletonLoader
				isText
				className={`pagination-range-results ${className} pagination-range-results--loader`}
			/>
		)
	}

	return (
		<p className={`pagination-range-results ${className}`}>
			{t(SEARCH_ROOT.pagination.rangeResults, {
				start: startIndex + 1,
				end: endIndex > totalItems ? totalItems : endIndex,
				count: totalItems,
			})}
		</p>
	)
}
