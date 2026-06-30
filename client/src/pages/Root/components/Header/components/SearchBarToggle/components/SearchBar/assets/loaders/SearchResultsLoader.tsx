import SkeletonLoader from '@assets/loaders/SkeletonLoader/SkeletonLoader'
import GridBookCardLoader from '@components/GridBookCard/assets/loaders/GridBookCardLoader'
import type { ReactNode } from 'react'

export default function SearchResultsLoader(): ReactNode {
	return (
		<>
			<div className='root-header-search-bar__results-info'>
				<SkeletonLoader isText style={{ width: '140px' }} />
				<SkeletonLoader isText style={{ width: '83px' }} />
			</div>

			<div className='root-header-search-bar__results'>
				{Array.from({ length: 8 }, (_, i) => (
					<GridBookCardLoader key={i} />
				))}
			</div>
		</>
	)
}
