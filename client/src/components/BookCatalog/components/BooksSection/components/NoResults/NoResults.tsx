import { useTranslation } from 'react-i18next'
import { SEARCH_BOOKS_ROOT } from '@constants/translationRoots.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { getRandomNumber } from '@utilities/number.utils'
import BookSearchIcon from '@assets/icons/BookSearchIcon'
import './NoResults.scss'
import type { ReactNode } from 'react'

const MESSAGE_INDEX = getRandomNumber(SEARCH_BOOKS_ROOT.noResultsMessages.length - 1)

export default function NoResults(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)

	return (
		<div className='book-catalog__no-results'>
			<BookSearchIcon />
			<p>{t(SEARCH_BOOKS_ROOT.noResultsMessages[MESSAGE_INDEX]!)}</p>
		</div>
	)
}
