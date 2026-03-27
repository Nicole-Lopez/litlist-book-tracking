import { useTranslation } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { PANELS } from '../../constants/panels.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import {
	SIGN_UP_PANEL_ROOT,
	PANEL_ROOT,
} from '../../constants/translationRoots.constants'
import Panel from '../Panel/Panel'
import Form from './components/Form/Form'
import type { ReactNode } from 'react'

export default function SignUpPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { setCurrentPanel } = useAuthAccessContext()

	return (
		<Panel title={t(SIGN_UP_PANEL_ROOT.title)}>
			<Panel.GoogleAuthButton>
				{t(SIGN_UP_PANEL_ROOT.authProviderLabel.google)}
			</Panel.GoogleAuthButton>

			<Panel.Divider />

			<Form />

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signIn)
				}}
				label={t(SIGN_UP_PANEL_ROOT.changePanel)}
				actionLabel={t(PANEL_ROOT.actions.signIn)}
			/>
		</Panel>
	)
}
