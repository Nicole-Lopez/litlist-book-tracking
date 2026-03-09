import { useToggle } from '@hooks/useToggle'
import { createPortal } from 'react-dom'
import SearchIcon from '@assets/icons/SearchIcon'
import DelayedUnmount from '@components/DelayedUnmount/DelayedUnmount'
import './SearchBarToggle.scss'
import type { ReactNode } from 'react'

export type SearchBarToggleProps = {
	isMobile?: boolean
}

export default function SearchBarToggle({
	isMobile = true,
}: SearchBarToggleProps): ReactNode {
	const [isSearchBarOpen, toggleSearchBarOpen] = useToggle()

	return (
		<>
			<button
				className='root-header-search-bar__toggle'
				onClick={toggleSearchBarOpen}
			>
				<SearchIcon />
			</button>

			{createPortal(
				<div
					className={`root-header-search-bar ${
						isSearchBarOpen ? 'root-header-search-bar--open' : ''
					} ${
						isMobile
							? 'root-header-search-bar--mobile'
							: 'root-header-search-bar--desktop'
					}`}
				>
					<DelayedUnmount isVisible={isSearchBarOpen}>
						<div>SearchBar</div>
					</DelayedUnmount>
				</div>,
				document.body,
			)}
		</>
	)
}
