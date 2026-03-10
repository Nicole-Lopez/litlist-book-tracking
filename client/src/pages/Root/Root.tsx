import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import type { ReactNode } from 'react'

export default function Root(): ReactNode {
	return (
		<>
			<Header />

			<main className='page-container'>
				<Outlet />
			</main>

			<Footer />
		</>
	)
}
