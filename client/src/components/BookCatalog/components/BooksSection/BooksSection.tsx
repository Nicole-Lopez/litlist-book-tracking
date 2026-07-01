import { usePagination } from '@hooks/usePagination'
import { BOOK_CARDS_PER_PAGE } from '@components/BookCatalog/constants/layout.constants'
import PaginationNavigation from '@components/PaginationNavigation/PaginationNavigation'
import PaginationRangeResults from '@components/PaginationRangeResults/PaginationRangeResults'
import BooksDisplay from './components/BooksDisplay/BooksDisplay'
import type { ReactNode } from 'react'
import type { BookPreview } from '@models/book.models'

export type BooksSectionProps = {
	books: BookPreview[]
	isLoading: boolean
}

export default function BooksSection({ books, isLoading }: BooksSectionProps): ReactNode {
	const { currentPage, setCurrentPage, paginatedItems, endIndex, startIndex } =
		usePagination(books, BOOK_CARDS_PER_PAGE)

	return (
		<>
			<PaginationRangeResults
				className='book-catalog__pagination-range-results'
				isLoading={isLoading}
				startIndex={startIndex}
				endIndex={endIndex}
				totalItems={books.length}
			/>

			<BooksDisplay isLoading={isLoading} books={paginatedItems} />

			<PaginationNavigation
				className='book-catalog__pagination-navigation'
				isLoading={isLoading}
				cardsPerPage={BOOK_CARDS_PER_PAGE}
				totalCards={books.length}
				onPageChange={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	)
}
