import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { PAGE_NOT_FOUND_FALLBACK_ROOT } from '@services/internationalization/roots/root.constants'
import { getHomeRoute } from '@router/routeFormatters.utils'
import PageNotFoundIcon from '@assets/icons/PageNotFoundIcon'
import Link from '@components/Link/Link'
import './NotFound.scss'
import type { ReactNode } from 'react'

export default function NotFound(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.root)

	return (
		<main className='not-found-page'>
			<PageNotFoundIcon />

			<h1>{t(PAGE_NOT_FOUND_FALLBACK_ROOT.title)}</h1>

			<p>{t(PAGE_NOT_FOUND_FALLBACK_ROOT.description)}</p>

			<Link className='not-found-page__link' to={getHomeRoute()}>
				{t(PAGE_NOT_FOUND_FALLBACK_ROOT.actionLabel)}
			</Link>
		</main>
	)
}
