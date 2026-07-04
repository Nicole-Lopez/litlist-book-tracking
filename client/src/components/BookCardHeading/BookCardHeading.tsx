import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { BOOK_CARD_ROOT } from '@services/internationalization/roots/bookCard.constants'
import './BookCardHeading.scss'
import type { ReactNode } from 'react'
import type { BookSummary } from '@models/book.models'

export type BookCardHeadingProps = Pick<BookSummary, 'title' | 'authors'> & {
	className?: string
	titleClassName?: string
	authorsClassName?: string
}

export default function BookCardHeading({
	title,
	authors,
	className = '',
	titleClassName = '',
	authorsClassName = '',
}: BookCardHeadingProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.bookCard)

	return (
		<div className={`book-card-heading ${className}`}>
			<span className={`book-card-heading__title ${titleClassName}`}>{title}</span>
			<span className={`book-card-heading__authors ${authorsClassName}`}>
				{authors ? authors.join(', ') : t(BOOK_CARD_ROOT.authors.unspecified)}
			</span>
		</div>
	)
}
