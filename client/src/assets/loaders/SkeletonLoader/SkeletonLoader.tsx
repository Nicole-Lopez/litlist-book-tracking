import './SkeletonLoader.scss'
import type { CSSProperties, ReactNode } from 'react'

export type SkeletonLoaderProps = {
	style?: CSSProperties
	className?: string
	isText?: boolean
}

export default function SkeletonLoader({
	style,
	className = '',
	isText = false,
}: SkeletonLoaderProps): ReactNode {
	return (
		<div
			className={`skeleton-loader ${
				isText ? 'skeleton-loader--text' : ''
			} ${className}`}
			style={style}
		/>
	)
}
