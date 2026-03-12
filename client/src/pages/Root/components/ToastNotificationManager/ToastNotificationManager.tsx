import { useSyncExternalStore } from 'react'
import store from './store'
import ToastNotification from './components/ToastNotification/ToastNotification'
import './ToastNotificationManager.scss'
import type { ReactNode } from 'react'

export default function ToastNotificationManager(): ReactNode {
	const toasts = useSyncExternalStore(store.subscribe, store.getSnapshot)

	return (
		<section
			className='toast-notification-manager'
			aria-live='polite'
			aria-atomic='false'
			aria-relevant='additions text'
			aria-label='Notifications'
		>
			{toasts.map(toast => (
				<ToastNotification key={toast.id} {...toast} />
			))}
		</section>
	)
}
