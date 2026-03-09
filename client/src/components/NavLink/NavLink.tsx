import { NavLink as NavLinkDom } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { NavLinkProps as NavLinkPropsDom } from 'react-router-dom'

export type NavLinkProps = Omit<NavLinkPropsDom, 'className'> & {
	className: string
	classNameIfActive?: string
}

export default function NavLink({
	classNameIfActive,
	className,
	...props
}: NavLinkProps): ReactNode {
	return (
		<NavLinkDom
			className={({ isActive }) =>
				`${className} ${
					isActive ? (classNameIfActive ?? `${className}--active`) : ''
				}`
			}
			{...props}
		/>
	)
}
