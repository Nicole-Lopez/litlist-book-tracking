import LogoLink from '@pages/Root/components/LogoLink/LogoLink'
import Menu from './components/Menu/Menu'
import User from '../User/User'
import SearchBarToggle from '../SearchBarToggle/SearchBarToggle'
import './HeaderMobileLayout.scss'
import type { ReactNode } from 'react'

export default function HeaderMobileLayout(): ReactNode {
	return (
		<header className='root-header root-header-mobile-layout'>
			<Menu />

			<LogoLink className='root-header-mobile-layout__logo-link' />

			<div className='root-header-mobile-layout__quick-actions'>
				<SearchBarToggle />

				<User />
			</div>
		</header>
	)
}
