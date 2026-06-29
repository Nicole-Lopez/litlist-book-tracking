import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import '../../BookCover.scss'
import type { ReactNode } from 'react'

export type BookCoverLoaderProps = {
	className?: string
}

export default function BookCoverLoader({
	className = '',
}: BookCoverLoaderProps): ReactNode {
	return <SkeletonLoader className={`book-cover book-cover--loader ${className}`} />
}
