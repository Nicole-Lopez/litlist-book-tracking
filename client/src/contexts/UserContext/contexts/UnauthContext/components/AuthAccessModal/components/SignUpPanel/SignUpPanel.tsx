import { useTranslation } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { PANELS } from '../../constants/panels.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_TRANSLATION_ROOT } from '@services/internationalization/roots/user.constants'
import Panel from '../Panel/Panel'
import Form from './components/Form/Form'
import type { ReactNode } from 'react'

export default function SignUpPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { setCurrentPanel } = useAuthAccessContext()

	return (
		<Panel title={t(USER_TRANSLATION_ROOT.authAccess.signUp.title)}>
			<Panel.GoogleAuthButton>
				{t(USER_TRANSLATION_ROOT.authAccess.signUp.authProvider.google)}
			</Panel.GoogleAuthButton>

			<Panel.Divider />

			<Form />

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signIn)
				}}
				label={t(USER_TRANSLATION_ROOT.authAccess.signUp.changePanel)}
				actionLabel={t(USER_TRANSLATION_ROOT.authAccess.actions.signIn)}
			/>
		</Panel>
	)
}
