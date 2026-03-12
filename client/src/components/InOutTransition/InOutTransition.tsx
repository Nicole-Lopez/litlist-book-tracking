import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type InOutTransitionProps = PropsWithChildren<{
	className?: string
	hiddenClassName: string
	isOut: boolean
	outDuration?: number
	onOutEnd?: () => void
}>

export default function InOutTransition({
	children,
	className = '',
	hiddenClassName,
	isOut,
	outDuration = 1000,
	onOutEnd,
}: InOutTransitionProps): ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			containerRef?.current?.classList.remove(hiddenClassName)
		}, 5)

		return () => {
			clearTimeout(timeoutId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (isOut) {
			containerRef?.current?.classList.add(hiddenClassName)
			const timeoutId = setTimeout(() => {
				onOutEnd?.()
			}, outDuration)

			return () => {
				clearTimeout(timeoutId)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOut])

	return (
		<div ref={containerRef} className={`${className} ${hiddenClassName}`}>
			{children}
		</div>
	)
}
