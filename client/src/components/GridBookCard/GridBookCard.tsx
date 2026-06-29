import BookCover from '@components/BookCover/BookCover'
import BookCardHeading from '@components/BookCardHeading/BookCardHeading'
import './GridBookCard.scss'
import type { ReactNode } from 'react'
import type { BookSummary } from '@models/book.models'

export type GridBookCardProps = Pick<BookSummary, 'title' | 'authors' | 'cover'> & {
	isHoverable?: boolean
	isLazy?: boolean
	isLibraryBook?: boolean
	className?: string
}

export default function GridBookCard({
	title,
	authors,
	cover,
	isHoverable = false,
	isLazy = true,
	isLibraryBook = false,
	className = '',
}: GridBookCardProps): ReactNode {
	return (
		<div
			className={`grid-book-card ${
				isHoverable ? 'grid-book-card--with-hover' : ''
			} ${className}`}
		>
			<BookCover
				containerClassName='grid-book-card__cover'
				cover={cover}
				title={title}
				isLibraryBook={isLibraryBook}
				isLazy={isLazy}
			/>

			<BookCardHeading
				titleClassName='grid-book-card__title'
				title={title}
				authors={authors}
			/>
		</div>
	)
}
