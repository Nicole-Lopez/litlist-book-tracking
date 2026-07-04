import { useTranslation } from 'react-i18next'
import { useAuthContext, useUserSummaryContext } from '@contexts/UserContext/userContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { HEADER_ROOT } from '@services/internationalization/roots/root.constants'
import { getUserProfileRoute, getUserSettingsRoute } from '@router/routeFormatters.utils'
import Dropdown from '@components/Dropdown/Dropdown'
import './UserActionsMenu.scss'
import type { ReactNode } from 'react'

export default function UserActionsMenu(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.root)
	const { signOut } = useAuthContext()
	const { username, photo } = useUserSummaryContext()

	return (
		<Dropdown className='root-header-user-actions-menu'>
			{(toggleMenu, isOpen) => (
				<>
					<button
						onClick={toggleMenu}
						className='root-header-user-actions-menu__toggle'
					>
						<img src={photo} alt={`${username} - photo`} />
					</button>

					<Dropdown.Menu isOpen={isOpen} className='root-header__dropdown-menu'>
						<p className='root-header-user-actions-menu__username'>
							{username}
						</p>

						<Dropdown.OptionLink to={getUserProfileRoute()}>
							{t(HEADER_ROOT.userActions.profile)}
						</Dropdown.OptionLink>

						<Dropdown.OptionLink to={getUserSettingsRoute()}>
							{t(HEADER_ROOT.userActions.settings)}
						</Dropdown.OptionLink>

						<Dropdown.OptionButton onClick={signOut}>
							{t(HEADER_ROOT.userActions.signOut)}
						</Dropdown.OptionButton>
					</Dropdown.Menu>
				</>
			)}
		</Dropdown>
	)
}
