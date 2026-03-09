import './NavLinkWithSubMenuDesktopLayout.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type NavLinkWithSubMenuDesktopLayoutProps = PropsWithChildren<{
	label: string
	isActive: boolean
}>

export default function NavLinkWithSubMenuDesktopLayout({
	children,
	isActive,
	label,
}: NavLinkWithSubMenuDesktopLayoutProps): ReactNode {
	return (
		<div className='main-nav-sub-menu-desktop'>
			<span
				className={`main-nav__nav-link ${
					isActive ? 'main-nav__nav-link--active' : ''
				}`}
			>
				{label} &#x25BE;
			</span>

			<div className='main-nav__sub-menu main-nav-sub-menu-desktop__sub-menu'>
				{children}
			</div>
		</div>
	)
}
