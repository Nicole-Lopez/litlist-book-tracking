import './CardIconText.scss'
import type { ReactNode } from 'react'

export type CardIconTextProps = {
	icon: ReactNode
	text: ReactNode
	className?: string
}

export default function CardIconText({
	icon,
	text,
	className = '',
}: CardIconTextProps): ReactNode {
	return (
		<span className={`card-icon-text ${className}`}>
			{icon} {text}
		</span>
	)
}
