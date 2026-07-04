import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { ERROR_FALLBACK_ROOT } from '@services/internationalization/roots/root.constants'
import UnreachableShelvesIcon from '@assets/icons/UnreachableShelvesIcon'
import './ErrorFallback.scss'
import type { ReactNode } from 'react'

export default function ErrorFallback(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.root)

	return (
		<main className='error-fallback'>
			<div className='error-fallback__message'>
				<h1>{t(ERROR_FALLBACK_ROOT.title)}</h1>
				<p>{t(ERROR_FALLBACK_ROOT.description)}</p>
			</div>

			<UnreachableShelvesIcon />
		</main>
	)
}
