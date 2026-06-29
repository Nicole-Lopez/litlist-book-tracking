import BookCoverLoader from '@components/BookCover/assets/loaders/BookCoverLoader'
import BookCardHeadingLoader from '@components/BookCardHeading/assets/loaders/BookCardHeadingLoader'
import '../../ListBookCard.scss'
import type { ReactNode } from 'react'
import type { PropsWithOptionalChildren } from '@customTypes/componentProps'

export type ListBookCardLoaderProps = PropsWithOptionalChildren<{
	className?: string
}>

export default function ListBookCardLoader({
	children,
	className = '',
}: ListBookCardLoaderProps): ReactNode {
	return (
		<div className={`list-book-card list-book-card--loader ${className}`}>
			<BookCoverLoader className='list-book-card__cover' />

			<div className='list-book-card__content'>
				<BookCardHeadingLoader />
				{children}
			</div>
		</div>
	)
}
