import { useTranslation } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import {
	SIGN_IN_PANEL_ROOT,
	PANEL_ROOT,
} from '../../constants/translationRoots.constants'
import { PANELS } from '../../constants/panels.constants'
import UserIcon from '@assets/icons/UserIcon'
import Form from './components/Form/Form'
import Panel from '../Panel/Panel'
import type { ReactNode } from 'react'

export default function SignInPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { setCurrentPanel } = useAuthAccessContext()

	return (
		<Panel title={t(SIGN_IN_PANEL_ROOT.title)}>
			<Panel.GoogleAuthButton>
				{t(SIGN_IN_PANEL_ROOT.authProviderLabel.google)}
			</Panel.GoogleAuthButton>

			<Panel.AuthProviderButton
				onClick={() => {
					setCurrentPanel(PANELS.anonymous)
				}}
			>
				<UserIcon />
				{t(SIGN_IN_PANEL_ROOT.authProviderLabel.anonymous)}
			</Panel.AuthProviderButton>

			<Panel.Divider />

			<Form />

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signUp)
				}}
				label={t(SIGN_IN_PANEL_ROOT.changePanel)}
				actionLabel={t(PANEL_ROOT.actions.signUp)}
			/>
		</Panel>
	)
}
