import { useToggle } from '@hooks/useToggle'
import { createPortal } from 'react-dom'
import { Suspense } from 'react'
import DelayedUnmount from '@components/DelayedUnmount/DelayedUnmount'
import MainNav from '../../../MainNav/MainNav'
import LanguageSelect from '../../../LanguageSelect/LanguageSelect'
import ThemeToggle from '../../../ThemeToggle/ThemeToggle'
import './Menu.scss'
import type { ReactNode } from 'react'

export default function Menu(): ReactNode {
	const [isMenuOpen, toggleMenuOpen] = useToggle()

	return (
		<>
			<button
				onClick={toggleMenuOpen}
				className={`root-header-mobile-layout-menu__toggle-btn ${
					isMenuOpen ? 'root-header-mobile-layout-menu__toggle-btn--open' : ''
				}`}
			>
				<span />
			</button>

			{createPortal(
				<div
					className={`root-header-mobile-layout-menu ${
						isMenuOpen ? 'root-header-mobile-layout-menu--open' : ''
					}`}
				>
					<DelayedUnmount isVisible={isMenuOpen}>
						<Suspense fallback={null}>
							<MainNav className='root-header-mobile-layout-menu__nav' />

							<div className='root-header-mobile-layout-menu__settings'>
								<LanguageSelect />
								<ThemeToggle />
							</div>
						</Suspense>
					</DelayedUnmount>
				</div>,
				document.body,
			)}
		</>
	)
}
