import { useRef, useState, useEffect } from 'react'
import { useToggle } from '@hooks/useToggle'
import './ExpandableWrapPreview.scss'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type ExpandableWrapPreviewProps = PropsWithChildren<{
	label: ReactNode
	className?: string
	toggleAttributes?: Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		'onClick' | 'children'
	>
}>

export default function ExpandableWrapPreview({
	children,
	label,
	className = '',
	toggleAttributes,
}: ExpandableWrapPreviewProps): ReactNode {
	const panelRef = useRef<HTMLDivElement>(null)
	const [isOverflowing, setIsOverflowing] = useState(true)
	const [isPanelExpanded, togglePanelExpanded] = useToggle()

	useEffect(() => {
		const panelElement = panelRef.current
		if (!panelElement) return

		const checkOverflow = (): void => {
			if (!isPanelExpanded) {
				setIsOverflowing(panelElement.offsetWidth < panelElement.scrollWidth)
			}
		}

		checkOverflow()

		const observer = new ResizeObserver(checkOverflow)
		observer.observe(panelElement)

		return () => {
			observer.disconnect()
		}
	}, [children, isPanelExpanded])

	return (
		<div
			className={`expandable-wrap-preview ${
				isOverflowing ? 'expandable-wrap-preview--is-overflowing' : ''
			} ${className}`}
		>
			<button
				{...toggleAttributes}
				className={`expandable-wrap-preview__toggle ${toggleAttributes?.className ?? ''}`}
				onClick={togglePanelExpanded}
				disabled={!isOverflowing || toggleAttributes?.disabled}
			>
				<span className='expandable-wrap-preview__chevron-icon'>
					{isPanelExpanded || !isOverflowing ? <>&#x23F6;</> : <>&#x23F7;</>}
				</span>

				{label}
			</button>

			<div
				ref={panelRef}
				className={`expandable-wrap-preview__panel ${
					isPanelExpanded
						? 'expandable-wrap-preview__panel--expanded'
						: 'expandable-wrap-preview__panel--collapsed'
				}`}
			>
				{children}
			</div>
		</div>
	)
}
