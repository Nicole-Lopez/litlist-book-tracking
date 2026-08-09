import { useTranslation } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_TRANSLATION_ROOT } from '@services/internationalization/roots/user.constants'
import { PANELS } from '../../constants/panels.constants'
import UserIcon from '@assets/icons/UserIcon'
import Form from './components/Form/Form'
import Panel from '../Panel/Panel'
import type { ReactNode } from 'react'

export default function SignInPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { setCurrentPanel } = useAuthAccessContext()

	return (
		<Panel title={t(USER_TRANSLATION_ROOT.authAccess.signIn.title)}>
			<Panel.GoogleAuthButton>
				{t(USER_TRANSLATION_ROOT.authAccess.signIn.authProvider.google)}
			</Panel.GoogleAuthButton>

			<Panel.AuthProviderButton
				onClick={() => {
					setCurrentPanel(PANELS.anonymous)
				}}
			>
				<UserIcon />
				{t(USER_TRANSLATION_ROOT.authAccess.signIn.authProvider.anonymous)}
			</Panel.AuthProviderButton>

			<Panel.Divider />

			<Form />

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signUp)
				}}
				label={t(USER_TRANSLATION_ROOT.authAccess.signIn.changePanel)}
				actionLabel={t(USER_TRANSLATION_ROOT.authAccess.actions.signUp)}
			/>
		</Panel>
	)
}
