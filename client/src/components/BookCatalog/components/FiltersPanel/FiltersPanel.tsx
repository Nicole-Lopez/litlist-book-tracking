import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from '@components/BookCatalog/hooks/useIsMobile'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FILTERS_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import FilterIcon from '@assets/icons/FilterIcon'
import AccordionBase from '@components/Accordion/Accordion'
import ActiveFilterList from '@components/ActiveFilterList/ActiveFilterList'
import './FiltersPanel.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { ActiveFilterListItem } from '@components/ActiveFilterList/ActiveFilterList'
import type { AccordionProps as AccordionBaseProps } from '@components/Accordion/Accordion'

const FiltersMenu = lazy(() => import('@components/FiltersMenu/FiltersMenu'))

export type FiltersPanelProps = PropsWithChildren<{
	onClearFilters: () => void
	activeFilterList: ActiveFilterListItem[]
}>

export default function FiltersPanel({
	children,
	onClearFilters,
	activeFilterList,
}: FiltersPanelProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.sortAndFilter)
	const isMobile = useIsMobile()

	if (isMobile) {
		return (
			<FiltersMenu
				onClearFilters={onClearFilters}
				activeFilterList={activeFilterList}
				openButtonClassName='book-catalog-filters-panel__open-btn'
			>
				{children}
			</FiltersMenu>
		)
	}

	return (
		<div className='book-catalog-filters-panel'>
			<span className='book-catalog-filters-panel__title'>
				<FilterIcon /> {t(FILTERS_ROOT.label)}
			</span>

			<ActiveFilterList items={activeFilterList} />

			<div className='book-catalog-filters-panel__filters'>{children}</div>

			<button
				className='book-catalog-filters-panel__clear-filters-btn'
				onClick={onClearFilters}
			>
				{t(FILTERS_ROOT.clearFiltersLabel)}
			</button>
		</div>
	)
}

export type AccordionProps = Omit<AccordionBaseProps, 'isInitCollapsed'>

function Accordion(props: AccordionProps): ReactNode {
	return <AccordionBase {...props} isInitCollapsed={false} />
}

FiltersPanel.Accordion = Accordion
