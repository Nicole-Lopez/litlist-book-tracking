import { useUnauthContext } from '@contexts/UserContext/userContext'
import UserIcon from '@assets/icons/UserIcon'
import IconButton from '../../../IconButton/IconButton'
import type { ReactNode } from 'react'

export default function AuthAccessButton(): ReactNode {
	const { toggleAuthAccessModalOpen } = useUnauthContext()

	return (
		<IconButton onClick={toggleAuthAccessModalOpen}>
			<UserIcon />
		</IconButton>
	)
}
