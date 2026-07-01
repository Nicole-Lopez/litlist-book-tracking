import Dropdown from '@components/Dropdown/Dropdown'
import './SelectDropdown.scss'
import type { ReactNode } from 'react'
import type { DropdownProps } from '@components/Dropdown/Dropdown'

export type SelectDropdownProps = DropdownProps & {
	isChevronVisible?: boolean
	label: ReactNode
}

export default function SelectDropdown({
	isChevronVisible = true,
	className = '',
	label,
	children,
}: SelectDropdownProps): ReactNode {
	return (
		<Dropdown className={`select-dropdown ${className}`}>
			{(toggleMenu, isOpen) => (
				<>
					<button className='select-dropdown__toggle' onClick={toggleMenu}>
						{label}
						{isChevronVisible ? (
							<span className='select-dropdown__chevron'>
								{isOpen ? <>&#x23F7;</> : <>&#x23F6;</>}
							</span>
						) : null}
					</button>

					<Dropdown.Menu className='select-dropdown__menu' isOpen={isOpen}>
						{children(toggleMenu, isOpen)}
					</Dropdown.Menu>
				</>
			)}
		</Dropdown>
	)
}

export type { OptionButtonProps as OptionProps } from '@components/Dropdown/Dropdown'

SelectDropdown.Option = Dropdown.OptionButton
