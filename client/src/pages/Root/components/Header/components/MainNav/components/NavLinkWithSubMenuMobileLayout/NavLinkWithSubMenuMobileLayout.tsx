import { useToggle } from '@hooks/useToggle'
import './NavLinkWithSubMenuMobileLayout.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type NavLinkWithSubMenuMobileLayoutProps = PropsWithChildren<{
	label: string
	isActive: boolean
}>

export default function NavLinkWithSubMenuMobileLayout({
	children,
	label,
	isActive,
}: NavLinkWithSubMenuMobileLayoutProps): ReactNode {
	const [isSubMenuOpen, toggleSubMenuOpen] = useToggle()

	return (
		<>
			<button
				className={`main-nav__nav-link main-nav__nav-link--with-sub-menu ${
					isActive ? 'main-nav__nav-link--active' : ''
				}`}
				onClick={toggleSubMenuOpen}
			>
				{label} &rsaquo;
			</button>

			<div
				className={`main-nav__sub-menu main-nav-sub-menu-mobile ${
					isSubMenuOpen ? 'main-nav-sub-menu-mobile--open' : ''
				}`}
			>
				<button
					className='main-nav-sub-menu-mobile__back-btn'
					onClick={toggleSubMenuOpen}
				>
					&#10094; {label}
				</button>

				{children}
			</div>
		</>
	)
}
