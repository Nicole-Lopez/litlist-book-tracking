import BookCoverLoader from '@components/BookCover/assets/loaders/BookCoverLoader'
import BookCardHeadingLoader from '@components/BookCardHeading/assets/loaders/BookCardHeadingLoader'
import '../../GridBookCard.scss'
import type { ReactNode } from 'react'

export type GridBookCardLoaderProps = {
	className?: string
}

export default function GridBookCardLoader({
	className = '',
}: GridBookCardLoaderProps): ReactNode {
	return (
		<div className={`grid-book-card grid-book-card--loader ${className}`}>
			<BookCoverLoader className='grid-book-card__cover' />
			<BookCardHeadingLoader />
		</div>
	)
}
