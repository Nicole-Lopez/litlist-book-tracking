import SearchBarToggle from '../SearchBarToggle/SearchBarToggle'
import User from '../User/User'
import MainNav from '../MainNav/MainNav'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import LogoLink from '@pages/Root/components/LogoLink/LogoLink'
import './HeaderDesktopLayout.scss'
import type { ReactNode } from 'react'

export default function HeaderDesktopLayout(): ReactNode {
	return (
		<header className='root-header root-header-desktop-layout'>
			<LogoLink className='root-header-desktop-layout__logo' />

			<div className='root-header-desktop-layout__navigation-actions'>
				<MainNav className='root-header-desktop-layout__nav' isMobile={false} />

				<SearchBarToggle />
			</div>

			<div className='root-header-desktop-layout__settings'>
				<LanguageSelect />
				<ThemeToggle />
				<User />
			</div>
		</header>
	)
}
