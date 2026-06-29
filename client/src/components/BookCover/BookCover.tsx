import { BOOK_COVER_FALLBACK } from '@constants/book.constants'
import { LIBRARY_BOOK_COVER_DEFAULT } from '@constants/libraries.constants'
import ImageWithPlaceholder from '@components/ImageWithPlaceholder/ImageWithPlaceholder'
import './BookCover.scss'
import type { ReactNode } from 'react'
import type { ImageWithPlaceholderProps } from '@components/ImageWithPlaceholder/ImageWithPlaceholder'

export type BookCoverProps = Omit<ImageWithPlaceholderProps, 'title' | 'alt' | 'src'> & {
	title: string
	cover?: string
	isLibraryBook?: boolean
}

export default function BookCover({
	cover,
	title,
	isLibraryBook,
	containerClassName = '',
	...imgAttributes
}: BookCoverProps): ReactNode {
	return (
		<ImageWithPlaceholder
			containerClassName={`book-cover ${containerClassName}`}
			src={
				cover ??
				(isLibraryBook ? LIBRARY_BOOK_COVER_DEFAULT : BOOK_COVER_FALLBACK)
			}
			alt={`${title} - cover`}
			{...imgAttributes}
		/>
	)
}
