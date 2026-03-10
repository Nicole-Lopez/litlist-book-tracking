import { useTranslation } from 'react-i18next'
import { CATEGORIES_LIST } from '@constants/categories.constants'
import { CATEGORIES_ROOT } from '@constants/translationRoots.constants'
import { FOOTER_ROOT } from '../../constants/translationRoots.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { getCategoriesRoute, getContactRoute } from '@router/routeFormatters.utils'
import { Link } from 'react-router-dom'
import LogoLink from '../LogoLink/LogoLink'
import './Footer.scss'
import type { ReactNode } from 'react'

export default function Footer(): ReactNode {
	const { t } = useTranslation([TRANSLATIONS_NS.root, TRANSLATIONS_NS.bookCategories])

	return (
		<footer className='root-footer'>
			<div className='root-footer__content'>
				<LogoLink className='root-footer__logo' />

				<nav className='root-footer__nav'>
					<section className='root-footer__section'>
						<h2>{t(FOOTER_ROOT.categoriesSection.label)}</h2>

						<ul>
							{CATEGORIES_LIST.map(category => (
								<li key={category}>
									<Link to={getCategoriesRoute({ category })}>
										{t(CATEGORIES_ROOT[category], {
											ns: TRANSLATIONS_NS.bookCategories,
										})}
									</Link>
								</li>
							))}
						</ul>
					</section>

					<section className='root-footer__section'>
						<h2>{t(FOOTER_ROOT.customerSection.label)}</h2>

						<ul>
							<li>
								<Link to={getContactRoute()}>
									{t(FOOTER_ROOT.customerSection.links.contactUs)}
								</Link>
							</li>
						</ul>
					</section>
				</nav>
			</div>

			<small className='root-footer__copyright'>
				©2023 LitList. {t(FOOTER_ROOT.copyright)}
				<a
					href='https://github.com/Nicole-Lopez'
					rel='noopener noreferrer'
					target='_blank'
				>
					Nicole-lopez
				</a>
			</small>
		</footer>
	)
}
