import { useTranslation } from 'react-i18next'
import { useToggle } from '@hooks/useToggle'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FILTERS_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import FilterIcon from '@assets/icons/FilterIcon'
import ActiveFilterList from '@components/ActiveFilterList/ActiveFilterList'
import Modal from '@components/Modal/Modal'
import './FiltersMenu.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { ActiveFilterListItem } from '@components/ActiveFilterList/ActiveFilterList'

export type FiltersMenuProps = PropsWithChildren<{
	onClearFilters: () => void
	activeFilterList: ActiveFilterListItem[]
	openButtonClassName?: string
}>

export default function FiltersMenu({
	children,
	onClearFilters,
	activeFilterList,
	openButtonClassName,
}: FiltersMenuProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.sortAndFilter)
	const [isOpen, toggleOpen] = useToggle()

	return (
		<>
			<button className={openButtonClassName} onClick={toggleOpen}>
				<FilterIcon /> {t(FILTERS_ROOT.label)}
				<span>({activeFilterList.length})</span>
			</button>

			<Modal
				className='filters-menu'
				isOpen={isOpen}
				withOverlay={false}
				isAnimated
			>
				<div className='filters-menu__header'>
					<span className='filters-menu__title'>
						<FilterIcon />
						{t(FILTERS_ROOT.label)}
					</span>
					<Modal.CloseButton onClose={toggleOpen} />
				</div>

				<div className='filters-menu__filters'>
					<ActiveFilterList items={activeFilterList} />

					{children}
				</div>

				<div className='filters-menu__footer'>
					<button
						className='filters-menu__clear-all-btn'
						onClick={onClearFilters}
					>
						{t(FILTERS_ROOT.clearFiltersLabel)}
					</button>
				</div>
			</Modal>
		</>
	)
}
