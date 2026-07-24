import { useToggle } from '@hooks/useToggle'
import { useOutsideAlerter } from '@hooks/useOutsideAlerter'
import { Link } from 'react-router-dom'
import './Dropdown.scss'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { LinkProps } from 'react-router-dom'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type DropdownProps = {
	children: (toggleMenuOpen: () => void, isOpen: boolean) => ReactNode
	className?: string
}

export default function Dropdown({ children, className = '' }: DropdownProps): ReactNode {
	const [isMenuOpen, toggleMenuOpen] = useToggle()

	const dropdownRef = useOutsideAlerter<HTMLDivElement>(() => {
		if (isMenuOpen) {
			toggleMenuOpen()
		}
	})

	return (
		<div className={`dropdown ${className}`} ref={dropdownRef}>
			{children(toggleMenuOpen, isMenuOpen)}
		</div>
	)
}

export type MenuProps = PropsWithChildren<{
	isOpen: boolean
	className?: string
}>

function Menu({ isOpen, children, className = '' }: MenuProps): ReactNode {
	return (
		<div
			className={`dropdown__menu ${
				isOpen ? 'dropdown__menu--open' : ''
			} ${className}`}
		>
			{children}
		</div>
	)
}

export type OptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isMarked?: boolean
}

function OptionButton({
	isMarked = false,
	className = '',
	...props
}: OptionButtonProps): ReactNode {
	return (
		<button
			{...props}
			className={`dropdown__option dropdown__option--btn ${
				isMarked ? 'dropdown__option--marked' : ''
			} ${className}`}
		/>
	)
}

export type OptionLinkProps = LinkProps

function OptionLink({ className = '', children, ...props }: OptionLinkProps): ReactNode {
	return (
		<Link
			{...props}
			className={`dropdown__option dropdown__option--link ${className}`}
		>
			<span>{children}</span>
			&#10140;
		</Link>
	)
}

Dropdown.Menu = Menu
Dropdown.OptionButton = OptionButton
Dropdown.OptionLink = OptionLink
