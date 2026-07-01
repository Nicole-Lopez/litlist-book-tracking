import { getBookDetailsLink } from '@router/routeFormatters.utils'
import { Link } from 'react-router-dom'
import { VirtuosoGrid } from 'react-virtuoso'
import GridBookCard from '@components/GridBookCard/GridBookCard'
import type { ReactNode } from 'react'
import type { BookPreview } from '@models/book.models'

export type BooksGridContainerProps = {
	books: BookPreview[]
}

export default function BooksGridContainer({
	books,
}: BooksGridContainerProps): ReactNode {
	return (
		<VirtuosoGrid
			data={books}
			useWindowScroll
			increaseViewportBy={800}
			listClassName={
				'book-catalog__books-container book-catalog__books-container--grid'
			}
			itemClassName='book-catalog__card'
			itemContent={(_, book) => (
				<Link {...getBookDetailsLink(book)}>
					<GridBookCard
						title={book.title}
						authors={book.authors}
						cover={book.cover}
						isHoverable
						isLazy={false}
					/>
				</Link>
			)}
		/>
	)
}
