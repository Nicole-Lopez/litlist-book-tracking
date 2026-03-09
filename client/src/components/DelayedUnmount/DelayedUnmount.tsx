import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type DelayedUnmountProps = PropsWithChildren<{
	isVisible: boolean
	delay?: number
	fallback?: ReactNode
}>

export default function DelayedUnmount({
	children,
	isVisible,
	delay = 600,
	fallback = null,
}: DelayedUnmountProps): ReactNode {
	const [isMounted, setIsMounted] = useState(isVisible)

	useEffect(() => {
		if (isVisible) {
			setIsMounted(true)
			return
		}

		const timeout = setTimeout(() => {
			setIsMounted(false)
		}, delay)

		return () => clearTimeout(timeout)
	}, [isVisible, delay])

	if (isMounted) {
		return children
	}

	return fallback
}
