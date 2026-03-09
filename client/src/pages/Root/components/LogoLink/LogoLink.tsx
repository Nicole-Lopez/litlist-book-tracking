import { getHomeRoute } from '@router/routeFormatters.utils'
import LitlistLogo from '@assets/logos/LitlistLogo'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export type LogoLinkProps = {
	className?: string
}

export default function LogoLink({ className = '' }: LogoLinkProps): ReactNode {
	return (
		<Link to={getHomeRoute()} className={className}>
			<LitlistLogo />
		</Link>
	)
}
