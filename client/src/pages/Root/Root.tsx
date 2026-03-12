import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ToastNotificationManager from './components/ToastNotificationManager/ToastNotificationManager'
import type { ReactNode } from 'react'

export default function Root(): ReactNode {
	return (
		<>
			<Header />

			<main className='page-container'>
				<Outlet />
			</main>

			<ToastNotificationManager />

			<Footer />
		</>
	)
}
