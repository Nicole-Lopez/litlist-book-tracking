import './TagPill.scss'
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export type TagPillProps = DetailedHTMLProps<
	HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>

export default function TagPill({ className = '', ...props }: TagPillProps): ReactNode {
	return <span className={`tag-pill ${className}`} {...props} />
}
