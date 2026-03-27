import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ToastNotificationManager from './components/ToastNotificationManager/ToastNotificationManager'
import AlertBannerManager from './components/AlertBannerManager/AlertBannerManager'
import UserProvider from '@contexts/UserContext/UserProvider'
import type { ReactNode } from 'react'

export default function Root(): ReactNode {
	return (
		<UserProvider>
			<Header />

			<AlertBannerManager />
			<ToastNotificationManager />

			<main className='page-container'>
				<Outlet />
			</main>

			<Footer />
		</UserProvider>
	)
}
