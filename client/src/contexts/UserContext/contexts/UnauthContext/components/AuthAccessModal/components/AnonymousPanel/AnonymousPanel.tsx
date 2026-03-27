import { useTranslation } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { PANELS } from '../../constants/panels.constants'
import {
	ANONYMOUS_PANEL_ROOT,
	PANEL_ROOT,
} from '../../constants/translationRoots.constants'
import parse from 'html-react-parser'
import { createAnonymousAccount } from '@services/user/auth/auth.service'
import Panel from '../Panel/Panel'
import './AnonymousPanel.scss'
import type { ReactNode } from 'react'

export default function AnonymousPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { setCurrentPanel, handleAuthAccess } = useAuthAccessContext()

	const onAuth = (): void => {
		handleAuthAccess(createAnonymousAccount)
	}

	return (
		<Panel
			title={t(ANONYMOUS_PANEL_ROOT.title)}
			className='auth-access-modal-anonymous-panel'
		>
			<div className='auth-access-modal-anonymous-panel__description'>
				{parse(t(ANONYMOUS_PANEL_ROOT.description))}
			</div>

			<Panel.SubmitButton onClick={onAuth}>
				{t(PANEL_ROOT.actions.anonymous)}
			</Panel.SubmitButton>

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signUp)
				}}
				label={t(ANONYMOUS_PANEL_ROOT.changePanel)}
				actionLabel={t(PANEL_ROOT.actions.signUp)}
			/>
		</Panel>
	)
}
