import type { ReactNode } from 'react'

export default function NoResultsSearchIcon(): ReactNode {
	return (
		<svg
			className='no-results-search-icon'
			viewBox='-0.5 -0.5 24 24'
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M2.87 9.58a6.71 6.71 0 1 0 13.42 0 6.71 6.71 0 1 0-13.42 0M7.67 7.67l3.83 3.83M11.5 7.67l-3.83 3.83M20.12 20.12l-5.75-5.75' />
		</svg>
	)
}
