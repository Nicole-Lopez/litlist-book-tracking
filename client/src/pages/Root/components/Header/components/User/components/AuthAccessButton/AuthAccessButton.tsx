import UserIcon from '@assets/icons/UserIcon'
import IconButton from '../../../IconButton/IconButton'
import type { ReactNode } from 'react'

export default function AuthAccessButton(): ReactNode {
	return (
		<IconButton onClick={() => console.log('open auth access modal')}>
			<UserIcon />
		</IconButton>
	)
}
