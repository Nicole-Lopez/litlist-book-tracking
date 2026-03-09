import './IconButton.scss'
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export type IconButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

export default function IconButton({
	className = '',
	...props
}: IconButtonProps): ReactNode {
	return <button className={`root-header-icon-btn ${className}`} {...props} />
}
