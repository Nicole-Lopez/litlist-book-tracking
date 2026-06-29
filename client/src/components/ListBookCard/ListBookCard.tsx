import BookCover from '@components/BookCover/BookCover'
import BookCardHeading from '@components/BookCardHeading/BookCardHeading'
import './ListBookCard.scss'
import type { ReactNode } from 'react'
import type { PropsWithOptionalChildren } from '@customTypes/componentProps'
import type { BookSummary } from '@models/book.models'

export type ListBookCardProps = PropsWithOptionalChildren<
	Pick<BookSummary, 'title' | 'authors' | 'cover'> & {
		isHoverable?: boolean
		isLazy?: boolean
		isLibraryBook?: boolean
		className?: string
	}
>

export default function ListBookCard({
	children,
	title,
	authors,
	cover,
	isHoverable = false,
	isLazy = true,
	isLibraryBook = false,
	className = '',
}: ListBookCardProps): ReactNode {
	return (
		<div
			className={`list-book-card ${
				isHoverable ? 'list-book-card--with-hover' : ''
			} ${className}`}
		>
			<BookCover
				containerClassName='list-book-card__cover'
				cover={cover}
				title={title}
				isLibraryBook={isLibraryBook}
				isLazy={isLazy}
			/>

			<div className='list-book-card__content'>
				<BookCardHeading
					className='list-book-card__heading'
					title={title}
					authors={authors}
				/>
				{children}
			</div>
		</div>
	)
}
