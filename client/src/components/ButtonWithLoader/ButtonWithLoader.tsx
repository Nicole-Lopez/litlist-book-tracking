import ThreeDotsLoader from '@assets/loaders/ThreeDotsLoader/ThreeDotsLoader'
import './ButtonWithLoader.scss'
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export type ButtonWithLoaderProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
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
