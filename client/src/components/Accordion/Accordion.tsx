import { useEffect, useRef, useState } from 'react'
import { useToggle } from '@hooks/useToggle'
import DelayedUnmount from '@components/DelayedUnmount/DelayedUnmount'
import './Accordion.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type AccordionProps = PropsWithChildren<{
	className?: string
	label: ReactNode
	isInitCollapsed?: boolean
	isForceCollapsed?: boolean
}>

export default function Accordion({
	children,
	className = '',
	label,
	isInitCollapsed = true,
	isForceCollapsed,
}: AccordionProps): ReactNode {
	const [isCollapsed, toggleCollapsed, setIsCollapsed] = useToggle(isInitCollapsed)
	const panelRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (isForceCollapsed !== undefined) {
			setIsCollapsed(isForceCollapsed)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isForceCollapsed])

	useEffect(() => {
		const panelElement = panelRef.current
		if (!panelElement) return

		const updateHeight = (): void => {
			if (!isCollapsed) {
				setHeight(panelElement.scrollHeight)
			}
		}

		const resizeObserver = new ResizeObserver(updateHeight)
		resizeObserver.observe(panelElement)

		return () => {
			resizeObserver.disconnect()
		}
	}, [isCollapsed])

	return (
		<div
			className={`accordion ${
				isCollapsed ? 'accordion--collapsed' : 'accordion--expanded'
			} ${className}`}
		>
			<button className='accordion__summary' onClick={toggleCollapsed}>
				{label} <span>{isCollapsed ? <>&#x23F7;</> : <>&#x23F6;</>}</span>
			</button>

			<div
				className='accordion__panel'
				style={{ height: isCollapsed ? 0 : height }}
			>
				<div ref={panelRef} className='accordion__panel-content'>
					<DelayedUnmount isVisible={!isCollapsed}>{children}</DelayedUnmount>
				</div>
			</div>
		</div>
	)
}
