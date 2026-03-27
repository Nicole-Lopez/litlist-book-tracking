import { lazy } from 'react'
import { useAuthAccessContext } from './contexts/AuthAccessContext/authAccessContext'
import { PANELS } from './constants/panels.constants'
import Modal from '@components/Modal/Modal'
import AuthAccessProvider from './contexts/AuthAccessContext/AuthAccessProvider'
import type { ReactNode } from 'react'

const SignInPanel = lazy(() => import('./components/SignInPanel/SignInPanel'))
const SignUpPanel = lazy(() => import('./components/SignUpPanel/SignUpPanel'))
const AnonymousPanel = lazy(() => import('./components/AnonymousPanel/AnonymousPanel'))

export default function AuthAccessModal(): ReactNode {
	return (
		<Modal>
			<AuthAccessProvider>
				<AuthAccess />
			</AuthAccessProvider>
		</Modal>
	)
}

function AuthAccess(): ReactNode {
	const { currentPanel } = useAuthAccessContext()

	if (currentPanel === PANELS.signIn) {
		return <SignInPanel />
	}

	if (currentPanel === PANELS.signUp) {
		return <SignUpPanel />
	}

	return <AnonymousPanel />
}
