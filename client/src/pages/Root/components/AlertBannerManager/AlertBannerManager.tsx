import { useSyncExternalStore } from 'react'
import store from './store'
import AlertBanner from './components/AlertBanner/AlertBanner'
import './AlertBannerManager.scss'
import type { ReactNode } from 'react'

export default function AlertBannerManager(): ReactNode {
	const banners = useSyncExternalStore(store.subscribe, store.getSnapshot)

	return (
		<section
			className='alert-banner-manager'
			aria-live='polite'
			aria-atomic='false'
			aria-relevant='additions text'
			aria-label='Notifications'
		>
			{banners.map(banner => (
				<AlertBanner key={banner.id} {...banner} />
			))}
		</section>
	)
}
