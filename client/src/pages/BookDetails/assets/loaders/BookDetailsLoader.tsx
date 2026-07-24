import BookCoverLoader from '@components/BookCover/assets/loaders/BookCoverLoader'
import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import '../../BookDetails.scss'
import type { ReactNode } from 'react'

export default function BookDetailsLoader(): ReactNode {
	return (
		<main className='book-details-page book-details-page--loader'>
			<div className='book-details-page-card'>
				<BookCoverLoader className='book-details-page-card__cover' />

				<div className='book-details-page-card__content'>
					<SkeletonLoader className='book-details-page-card__title' />
					<SkeletonLoader className='book-details-page-card__authors' />
				</div>
			</div>

			<SkeletonLoader className='book-details-page-topic' />

			<SkeletonLoader className='book-details-page__tabbed-content' />
		</main>
	)
}
