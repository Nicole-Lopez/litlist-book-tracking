import {
	BOOK_CARDS_PER_PAGE,
	CARD_VIEWS,
} from '@components/BookCatalog/constants/layout.constants'
import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import ListBookCardLoader from '@components/ListBookCard/assets/loaders/ListBookCardLoader'
import GridBookCardLoader from '@components/GridBookCard/assets/loaders/GridBookCardLoader'
import type { ReactNode } from 'react'
import type { CardViews } from '@components/BookCatalog/models/layout.models'

export type BooksDisplayLoaderProps = {
	cardView: CardViews
}

export default function BooksDisplayLoader({
	cardView,
}: BooksDisplayLoaderProps): ReactNode {
	return (
		<div
			className={`book-catalog__books-container--loader ${
				cardView === CARD_VIEWS.grid
					? 'book-catalog__books-container--grid'
					: 'book-catalog__books-container--list'
			}`}
		>
			{Array.from({ length: BOOK_CARDS_PER_PAGE }, (_, i) =>
				cardView === CARD_VIEWS.grid ? (
					<GridBookCardLoader key={i} className='book-catalog__card' />
				) : (
					<ListBookCardLoader key={i} className='book-catalog__card'>
						<SkeletonLoader
							className='book-catalog__list-card-details--loader'
							isText
						/>
					</ListBookCardLoader>
				),
			)}
		</div>
	)
}
