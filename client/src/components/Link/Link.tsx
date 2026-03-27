import { Link as LinkRouter } from 'react-router-dom'
import './Link.scss'
import type { ReactNode } from 'react'
import type { LinkProps as LinkRouterProps } from 'react-router-dom'

export type LinkProps = LinkRouterProps & {
	isIconVisible?: boolean
}

export default function Link({
	className = '',
	children,
	isIconVisible = true,
	...props
}: LinkProps): ReactNode {
	return (
		<LinkRouter className={`link ${className}`} {...props}>
			{children} {isIconVisible ? <>&#10140;</> : null}
		</LinkRouter>
	)
}
