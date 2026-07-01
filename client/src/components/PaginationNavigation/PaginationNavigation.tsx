import { useMediaQuery } from '@hooks/useMediaQuery'
import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import ReactPaginate from 'react-paginate'
import './PaginationNavigation.scss'
import type { ReactNode } from 'react'

export type PaginationNavigationProps = {
	totalCards: number
	cardsPerPage: number
	currentPage: number
	onPageChange: (page: number) => void
	isLoading?: boolean
	isMobileLayoutForced?: boolean
	className?: string
}

export default function PaginationNavigation({
	totalCards,
	cardsPerPage,
	currentPage,
	onPageChange,
	isLoading = false,
	isMobileLayoutForced = false,
	className = '',
}: PaginationNavigationProps): ReactNode {
	const isMobile = useMediaQuery('(max-width: 740px)')
	const pageCount = Math.ceil(totalCards / cardsPerPage)

	if (pageCount === 0) {
		return null
	}

	if (isLoading) {
		return (
			<SkeletonLoader
				className={`pagination-navigation ${className} pagination-navigation--loader`}
			/>
		)
	}

	return (
		<ReactPaginate
			className={`pagination-navigation ${className}`}
			activeClassName='pagination-navigation__page--current'
			disabledClassName='pagination-navigation__disabled-page'
			previousClassName='pagination-navigation__previous'
			nextClassName='pagination-navigation__next'
			pageClassName='pagination-navigation__page'
			breakClassName='pagination-navigation__break'
			breakLabel='...'
			nextLabel='&#10095;'
			previousLabel='&#10094;'
			pageCount={pageCount}
			pageRangeDisplayed={isMobile || isMobileLayoutForced ? 1 : 5}
			marginPagesDisplayed={isMobile || isMobileLayoutForced ? 1 : 3}
			renderOnZeroPageCount={null}
			onPageChange={e => {
				onPageChange(e.selected + 1)
			}}
			forcePage={currentPage - 1}
		/>
	)
}
