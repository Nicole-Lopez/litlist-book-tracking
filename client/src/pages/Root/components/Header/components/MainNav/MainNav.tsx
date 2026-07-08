import { lazy } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES_LIST } from '@constants/category.constants'
import { CATEGORIES_PATH } from '@router/routePaths.constants'
import { CATEGORIES_ROOT } from '@services/internationalization/roots/category.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { HEADER_ROOT } from '@services/internationalization/roots/root.constants'
import {
	getCategoriesRoute,
	getContactRoute,
	getHomeRoute,
} from '@router/routeFormatters.utils'
import NavLink from '@components/NavLink/NavLink'
import './MainNav.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

const NavLinkWithSubMenuMobileLayout = lazy(
	() =>
		import('./components/NavLinkWithSubMenuMobileLayout/NavLinkWithSubMenuMobileLayout'),
)
const NavLinkWithSubMenuDesktopLayout = lazy(
	() =>
		import('./components/NavLinkWithSubMenuDesktopLayout/NavLinkWithSubMenuDesktopLayout'),
)

export type MainNavProps = {
	className?: string
	isMobile?: boolean
}

export default function MainNav({
	className = '',
	isMobile = true,
}: MainNavProps): ReactNode {
	const { t } = useTranslation([TRANSLATIONS_NS.root, TRANSLATIONS_NS.category])

	return (
		<nav className={`main-nav ${className}`}>
			<ul>
				<li>
					<NavLink to={getHomeRoute()} className='main-nav__nav-link'>
						{t(HEADER_ROOT.navLinks.home)}
					</NavLink>
				</li>

				<li>
					<NavLinkWithSubMenu
						path={CATEGORIES_PATH}
						isMobile={isMobile}
						label={t(HEADER_ROOT.navLinks.categories)}
					>
						<ul>
							{CATEGORIES_LIST.map(category => (
								<li key={category}>
									<NavLink
										to={getCategoriesRoute({ category })}
										className='main-nav__nav-link'
									>
										{t(CATEGORIES_ROOT[category], {
											ns: TRANSLATIONS_NS.category,
										})}
									</NavLink>
								</li>
							))}
						</ul>
					</NavLinkWithSubMenu>
				</li>

				<li>
					<NavLink to={getContactRoute()} className='main-nav__nav-link'>
						{t(HEADER_ROOT.navLinks.contact)}
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

type NavLinkWithSubMenuProps = PropsWithChildren<{
	isMobile?: boolean
	label: string
	path: string
}>

function NavLinkWithSubMenu({
	isMobile = true,
	label,
	children,
	path,
}: NavLinkWithSubMenuProps): ReactNode {
	const location = useLocation()
	const isActive = !!matchPath({ path, end: false }, location.pathname)

	if (isMobile) {
		return (
			<NavLinkWithSubMenuMobileLayout label={label} isActive={isActive}>
				{children}
			</NavLinkWithSubMenuMobileLayout>
		)
	}

	return (
		<NavLinkWithSubMenuDesktopLayout label={label} isActive={isActive}>
			{children}
		</NavLinkWithSubMenuDesktopLayout>
	)
}
