import { useIsMobile } from './hooks/useIsMobile'
import SortSelect from '@components/SortSelect/SortSelect'
import FiltersPanel from './components/FiltersPanel/FiltersPanel'
import BooksSection from './components/BooksSection/BooksSection'
import './BookCatalog.scss'
import type { ReactNode } from 'react'

export type BookCatalogProps = {
	isLoading: boolean
	renderFiltersPanel: ReactNode
	renderSortSelect: ReactNode
	renderBooksSection: ReactNode
	className?: string
}

export default function BookCatalog({
	isLoading,
	renderBooksSection,
	renderFiltersPanel,
	renderSortSelect,
	className = '',
}: BookCatalogProps): ReactNode {
	const isMobile = useIsMobile()

	return (
		<div
			className={`book-catalog book-catalog--${isMobile ? 'mobile' : 'desktop'} ${
				isLoading ? 'book-catalog--loading' : ''
			} ${className}`}
		>
			{renderFiltersPanel}

			{renderSortSelect}

			{renderBooksSection}
		</div>
	)
}

BookCatalog.BooksSection = BooksSection
BookCatalog.FiltersPanel = FiltersPanel
BookCatalog.Accordion = FiltersPanel.Accordion
BookCatalog.SortSelect = SortSelect

export type { SortSelectProps as SortSelectProps } from '@components/SortSelect/SortSelect'
export type {
	FiltersPanelProps,
	AccordionProps,
} from './components/FiltersPanel/FiltersPanel'
export type { BooksSectionProps } from './components/BooksSection/BooksSection'
