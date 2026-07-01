import type { ReactNode } from 'react'

export default function GridIcon(): ReactNode {
	return (
		<svg
			className='grid-icon'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z' />
		</svg>
	)
}
