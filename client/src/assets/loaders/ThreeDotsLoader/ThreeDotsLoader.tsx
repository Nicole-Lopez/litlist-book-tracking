import './ThreeDotsLoader.scss'
import type { ReactNode } from 'react'

export type ThreeDotsLoaderProps = {
	className?: string
}

export default function ThreeDotsLoader({
	className = '',
}: ThreeDotsLoaderProps): ReactNode {
	return (
		<div className={`three-dots-loader ${className}`}>
			<div />
			<div />
			<div />
		</div>
	)
}
