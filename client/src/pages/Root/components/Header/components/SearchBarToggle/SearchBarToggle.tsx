import { useToggle } from '@hooks/useToggle'
import { createPortal } from 'react-dom'
import SearchIcon from '@assets/icons/SearchIcon'
import DelayedUnmount from '@components/DelayedUnmount/DelayedUnmount'
import './SearchBarToggle.scss'
import type { ReactNode } from 'react'

export default function SearchBarToggle(): ReactNode {
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
