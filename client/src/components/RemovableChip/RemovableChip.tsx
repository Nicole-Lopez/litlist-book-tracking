import './RemovableChip.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type RemovableChipProps = PropsWithChildren<{
	onRemove: () => void
}>

export default function RemovableChip({
	children,
	onRemove,
}: RemovableChipProps): ReactNode {
	return (
		<button className='removable-chip' onClick={onRemove}>
			{children} <span>&#x2716;</span>
		</button>
	)
}
