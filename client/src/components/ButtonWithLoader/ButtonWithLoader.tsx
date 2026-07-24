import ThreeDotsLoader from '@assets/loaders/ThreeDotsLoader/ThreeDotsLoader'
import './ButtonWithLoader.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonWithLoaderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading: boolean
}

export default function ButtonWithLoader({
	className = '',
	isLoading,
	children,
	...props
}: ButtonWithLoaderProps): ReactNode {
	return (
		<button {...props} className={`button-with-loader ${className}`}>
			{isLoading ? <ThreeDotsLoader /> : children}
		</button>
	)
}
