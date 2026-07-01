import { useState, Suspense, lazy } from 'react'
import { CARD_VIEWS } from '@components/BookCatalog/constants/layout.constants'
import BooksDisplayLoader from '@components/BookCatalog/assets/loaders/BooksDisplayLoader'
import GridIcon from '@assets/icons/GridIcon'
import ListIcon from '@assets/icons/ListIcon'
import './BooksDisplay.scss'
import type { ReactNode } from 'react'
import type { BookPreview } from '@models/book.models'
import type { CardViews } from '@components/BookCatalog/models/layout.models'

const NoResults = lazy(() => import('../NoResults/NoResults'))
const BooksGridContainer = lazy(() => import('../BooksGridContainer/BooksGridContainer'))
const BooksListContainer = lazy(() => import('../BooksListContainer/BooksListContainer'))

export type BooksDisplayProps = {
	isLoading: boolean
	books: BookPreview[]
}

export default function BooksDisplay({ isLoading, books }: BooksDisplayProps): ReactNode {
	const [cardView, setCardView] = useState<CardViews>(CARD_VIEWS.grid)

	return (
		<>
			<ul className='book-catalog__card-view-controls'>
				<li>
					<button
						className='book-catalog__card-view-btn'
						onClick={() => {
							setCardView(CARD_VIEWS.grid)
						}}
						disabled={cardView === CARD_VIEWS.grid}
					>
						<GridIcon />
					</button>
				</li>

				<li>
					<button
						className='book-catalog__card-view-btn'
						onClick={() => {
							setCardView(CARD_VIEWS.list)
						}}
						disabled={cardView === CARD_VIEWS.list}
					>
						<ListIcon />
					</button>
				</li>
			</ul>

			<div className='book-catalog__results'>
				<Suspense fallback={<BooksDisplayLoader cardView={cardView} />}>
					{isLoading ? (
						<BooksDisplayLoader cardView={cardView} />
					) : books.length === 0 ? (
						<NoResults />
					) : cardView === CARD_VIEWS.grid ? (
						<BooksGridContainer books={books} />
					) : (
						<BooksListContainer books={books} />
					)}
				</Suspense>
			</div>
		</>
	)
}
