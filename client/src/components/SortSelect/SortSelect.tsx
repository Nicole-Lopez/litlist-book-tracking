import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { SORT_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import SelectDropdown from '@components/SelectDropdown/SelectDropdown'
import './SortSelect.scss'
import type { ReactNode } from 'react'
import type { ValueOf } from '@customTypes/customUtilityTypes'
import type { SORT_OPTIONS } from '@constants/sort.constants'

export type SortSelectProps<Option extends ValueOf<typeof SORT_OPTIONS>> = {
	options: Readonly<Option[]>
	value: Option
	onSelect: (option: Option) => void
	className?: string
}

export default function SortSelect<Option extends ValueOf<typeof SORT_OPTIONS>>({
	options,
	value,
	onSelect,
	className = '',
}: SortSelectProps<Option>): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.sortAndFilter)

	return (
		<div className={`sort-select ${className}`}>
			<span className='sort-select__label'>{t(SORT_ROOT.label)}</span>

			<SelectDropdown
				className='sort-select__select-dropdown'
				label={t(SORT_ROOT.options[value])}
			>
				{toggleMenu =>
					options.map(option => (
						<SelectDropdown.Option
							key={option}
							onClick={() => {
								toggleMenu()

								if (option !== value) {
									onSelect(option)
								}
							}}
							isMarked={option === value}
						>
							{t(SORT_ROOT.options[option])}
						</SelectDropdown.Option>
					))
				}
			</SelectDropdown>
		</div>
	)
}
