import { useTranslation, Trans } from 'react-i18next'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_TRANSLATION_ROOT } from '@services/internationalization/roots/user.constants'
import { LIBRARY_TRANSLATION_ROOT } from '@services/internationalization/roots/library.constants'
import { PANELS } from '../../constants/panels.constants'
import { ANONYMOUS_LIBRARY_LIMITS } from '@constants/library.constants'
import { createAnonymousAccount } from '@services/user/auth/auth.service'
import Panel from '../Panel/Panel'
import './AnonymousPanel.scss'
import type { ReactNode } from 'react'

export default function AnonymousPanel(): ReactNode {
	const { t } = useTranslation([TRANSLATIONS_NS.user, TRANSLATIONS_NS.library])
	const { setCurrentPanel, submitAuth } = useAuthAccessContext()

	const onAuth = (): void => {
		submitAuth(createAnonymousAccount)
	}

	return (
		<Panel
			title={t(USER_TRANSLATION_ROOT.authAccess.anonymousAccount.title)}
			className='auth-access-modal-anonymous-panel'
		>
			<div className='auth-access-modal-anonymous-panel__description'>
				<p>{t(USER_TRANSLATION_ROOT.authAccess.anonymousAccount.introduce)}</p>

				<div>
					<h2>
						{t(
							USER_TRANSLATION_ROOT.authAccess.anonymousAccount.limitations
								.title,
						)}
					</h2>

					<ul>
						<li>
							<Trans
								t={t}
								i18nKey={
									USER_TRANSLATION_ROOT.authAccess.anonymousAccount
										.limitations.library
								}
								count={ANONYMOUS_LIBRARY_LIMITS.maxProgressBooks}
								values={{
									library: t(
										LIBRARY_TRANSLATION_ROOT.librariesLabels
											.wantToRead,
										{ ns: TRANSLATIONS_NS.library },
									),
								}}
							/>
						</li>

						<li>
							<Trans
								t={t}
								i18nKey={
									USER_TRANSLATION_ROOT.authAccess.anonymousAccount
										.limitations.library
								}
								count={ANONYMOUS_LIBRARY_LIMITS.maxProgressBooks}
								values={{
									library: t(
										LIBRARY_TRANSLATION_ROOT.librariesLabels
											.currentlyReading,
										{ ns: TRANSLATIONS_NS.library },
									),
								}}
							/>
						</li>

						<li>
							<Trans
								t={t}
								i18nKey={
									USER_TRANSLATION_ROOT.authAccess.anonymousAccount
										.limitations.library
								}
								count={ANONYMOUS_LIBRARY_LIMITS.maxProgressBooks}
								values={{
									library: t(
										LIBRARY_TRANSLATION_ROOT.librariesLabels
											.alreadyRead,
										{ ns: TRANSLATIONS_NS.library },
									),
								}}
							/>
						</li>

						<li>
							<Trans
								t={t}
								i18nKey={
									USER_TRANSLATION_ROOT.authAccess.anonymousAccount
										.limitations.list
								}
								count={ANONYMOUS_LIBRARY_LIMITS.maxReadingLists}
								values={{
									list: t(
										LIBRARY_TRANSLATION_ROOT.librariesLabels
											.readingLists,
										{ ns: TRANSLATIONS_NS.library },
									),
									maxBooksPerList:
										ANONYMOUS_LIBRARY_LIMITS.maxBooksPerReadingList,
								}}
							/>
						</li>
					</ul>
				</div>

				<p>
					<strong>
						{t(USER_TRANSLATION_ROOT.authAccess.anonymousAccount.warning)}
					</strong>
				</p>

				<p>
					<Trans
						t={t}
						i18nKey={
							USER_TRANSLATION_ROOT.authAccess.anonymousAccount
								.upgradeAccount
						}
					/>
				</p>
			</div>

			<Panel.SubmitButton onClick={onAuth}>
				{t(USER_TRANSLATION_ROOT.authAccess.actions.anonymous)}
			</Panel.SubmitButton>

			<Panel.ChangePanelButton
				onClick={() => {
					setCurrentPanel(PANELS.signUp)
				}}
				label={t(USER_TRANSLATION_ROOT.authAccess.anonymousAccount.changePanel)}
				actionLabel={t(USER_TRANSLATION_ROOT.authAccess.actions.signUp)}
			/>
		</Panel>
	)
}
