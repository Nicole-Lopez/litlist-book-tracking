import './TagPill.scss'
import type { HTMLAttributes, ReactNode } from 'react'

export type TagPillProps = HTMLAttributes<HTMLSpanElement>

export default function TagPill({ className = '', ...props }: TagPillProps): ReactNode {
	return <span className={`tag-pill ${className}`} {...props} />
}
