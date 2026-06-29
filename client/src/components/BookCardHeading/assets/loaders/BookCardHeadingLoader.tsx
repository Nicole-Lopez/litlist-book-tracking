import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import '../../BookCardHeading.scss'
import type { ReactNode } from 'react'

export type BookCardHeadingLoaderProps = {
	className?: string
}

export default function BookCardHeadingLoader({
	className = '',
}: BookCardHeadingLoaderProps): ReactNode {
	return (
		<div className={`book-card-heading book-card-heading--loader ${className}`}>
			<SkeletonLoader isText className='book-card-heading__title' />
			<SkeletonLoader isText className='book-card-heading__authors' />
		</div>
	)
}
