import BookShelfLoader from '@assets/loaders/BookShelfLoader/BookShelfLoader'
import './MainLoader.scss'
import type { ReactNode } from 'react'

export default function MainLoader(): ReactNode {
	return (
		<div className='main-loader'>
			<BookShelfLoader className='main-loader__book-shelf-icon' />
		</div>
	)
}
