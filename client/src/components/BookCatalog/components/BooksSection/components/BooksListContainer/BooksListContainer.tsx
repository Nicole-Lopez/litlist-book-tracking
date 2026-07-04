import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { BOOK_CARD_ROOT } from '@services/internationalization/roots/bookCard.constants'
import { getBookDetailsLink } from '@router/routeFormatters.utils'
import { Virtuoso } from 'react-virtuoso'
import { Link } from 'react-router-dom'
import CalendarIcon from '@assets/icons/CalendarIcon'
import BookOpenIcon from '@assets/icons/BookOpenIcon'
import ListBookCard from '@components/ListBookCard/ListBookCard'
import CardIconText from '@components/CardIconText/CardIconText'
import TagPill from '@components/TagPill/TagPill'
import type { ReactNode } from 'react'
import type { BookPreview } from '@models/book.models'

export type BooksListContainerProps = {
	books: BookPreview[]
}

export default function BooksListContainer({
	books,
}: BooksListContainerProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.bookCard)

	return (
		<Virtuoso
			data={books}
			useWindowScroll
			increaseViewportBy={800}
			className={
				'book-catalog__books-container book-catalog__books-container--list'
			}
			itemContent={(_, book) => (
				<div className='book-catalog__card'>
					<Link {...getBookDetailsLink(book)}>
						<ListBookCard
							title={book.title}
							authors={book.authors}
							cover={book.cover}
							isHoverable
							isLazy={false}
						>
							<div className='book-catalog__list-card-details'>
								{book.categories?.length ? (
									<TagPill>{book.categories[0]}</TagPill>
								) : null}

								<CardIconText
									icon={<BookOpenIcon />}
									text={t(BOOK_CARD_ROOT.pageCount.pages, {
										count: book.pageCount ?? 0,
									})}
								/>

								<CardIconText
									icon={<CalendarIcon />}
									text={
										book.publishedYear ??
										t(BOOK_CARD_ROOT.publishedYear.unspecified)
									}
								/>
							</div>
						</ListBookCard>
					</Link>
				</div>
			)}
		/>
	)
}
