import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import type { ReactNode } from 'react'

export default function Root(): ReactNode {
	return (
		<>
			<Header />

			<main className='page-container'>
				<Outlet />
			</main>
		</>
	)
}
