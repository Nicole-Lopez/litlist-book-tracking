import { useMediaQuery } from '@hooks/useMediaQuery'
import { lazy } from 'react'
import './Header.scss'
import type { ReactNode } from 'react'

const HeaderDesktopLayout = lazy(
	() => import('./components/HeaderDesktopLayout/HeaderDesktopLayout'),
)
const HeaderMobileLayout = lazy(
	() => import('./components/HeaderMobileLayout/HeaderMobileLayout'),
)

export default function Header(): ReactNode {
	const isMobile = useMediaQuery('(max-width: 980px)')

	if (isMobile) {
		return <HeaderMobileLayout />
	}

	return <HeaderDesktopLayout />
}
