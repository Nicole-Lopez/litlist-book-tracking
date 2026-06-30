import './BarLoader.scss'
import type { ReactNode } from 'react'

export type BarLoaderProps = {
	className?: string
}

export default function BarLoader({ className = '' }: BarLoaderProps): ReactNode {
	return <div className={`bar-loader ${className}`} />
}
