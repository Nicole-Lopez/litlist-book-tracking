import RemovableChip from '@components/RemovableChip/RemovableChip'
import './ActiveFilterList.scss'
import type { ReactNode } from 'react'

export type ActiveFilterListItem = {
	label: string
	onRemove: () => void
}
export type ActiveFilterListProps = {
	items: ActiveFilterListItem[]
	className?: string
}

export default function ActiveFilterList({
	items,
	className = '',
}: ActiveFilterListProps): ReactNode {
	if (!items.length) return null

	return (
		<div className={`active-filter-list ${className}`}>
			{items.map(item => (
				<RemovableChip key={item.label} onRemove={item.onRemove}>
					{item.label}
				</RemovableChip>
			))}
		</div>
	)
}
