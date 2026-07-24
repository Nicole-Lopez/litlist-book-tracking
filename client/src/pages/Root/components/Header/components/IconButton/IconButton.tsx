import './IconButton.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({
	className = '',
	...props
}: IconButtonProps): ReactNode {
	return <button className={`root-header-icon-btn ${className}`} {...props} />
}
