import { lazy, Suspense } from 'react'
import { useToggle } from '@hooks/useToggle'
import { UnauthContext } from '@contexts/UserContext/userContext'
import ModalDialogLoader from '@components/Modal/assets/loaders/ModalDialogLoader'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'
import type { UnauthContextValue } from './models/context.models'

const AuthAccessModal = lazy(() => import('./components/AuthAccessModal/AuthAccessModal'))

export default function UnauthProvider({ children }: PropsOnlyChildren): ReactNode {
	const [isAuthAccessModalOpen, toggleAuthAccessModalOpen] = useToggle()

	const value: UnauthContextValue = {
		toggleAuthAccessModalOpen,
	}

	return (
		<UnauthContext value={value}>
			<Suspense fallback={<ModalDialogLoader />}>
				{isAuthAccessModalOpen ? <AuthAccessModal /> : null}
			</Suspense>

			{children}
		</UnauthContext>
	)
}
