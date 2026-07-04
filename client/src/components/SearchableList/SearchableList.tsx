import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useToggle } from '@hooks/useToggle'
import { useDebounceSearch } from '@hooks/useDebounceSearch'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { SEARCH_ROOT } from '@services/internationalization/roots/search.constants'
import { removeDiacritics } from '@utilities/string.utils'
import NoResultsSearchIcon from '@assets/icons/NoResultsSearchIcon'
import { Virtuoso } from 'react-virtuoso'
import SearchInputField from '@components/SearchInputField/SearchInputField'
import './SearchableList.scss'
import type { ReactNode, RefObject } from 'react'

export type SearchableListProps<Item> = {
	items: Item[]
	getSearchValue: (item: Item) => string
	isCollapsible?: boolean
	previewCount?: number
	isUsingWindowScroll?: boolean
	renderItem: (item: Item) => ReactNode
	className?: string
	listClassName?: string
}

export default function SearchableList<Item>({
	items,
	getSearchValue,
	className = '',
	previewCount = 6,
	isCollapsible = false,
	isUsingWindowScroll = true,
	renderItem,
	listClassName = '',
}: SearchableListProps<Item>): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const { query, setQuery, isSearchActive } = useDebounceSearch()
	const normalizedQuery = removeDiacritics(query).toLowerCase()
	const data = isSearchActive
		? items.filter(item =>
				removeDiacritics(getSearchValue(item))
					.toLowerCase()
					.includes(normalizedQuery),
			)
		: items

	return (
		<div className={`searchable-list ${className}`}>
			<SearchInputField>
				<SearchInputField.Input
					placeholder={t(SEARCH_ROOT.searchPlaceholder)}
					maxLength={600}
					value={query}
					onChange={e => {
						setQuery(e.target.value)
					}}
					autoComplete='search'
				/>
				<SearchInputField.ClearQueryButton
					query={query}
					onClick={() => setQuery('')}
				/>
			</SearchInputField>

			{isCollapsible ? (
				<CollapsibleList
					items={data}
					isSearchActive={isSearchActive}
					query={query}
					isUsingWindowScroll={isUsingWindowScroll}
					renderItem={renderItem}
					listClassName={listClassName}
					previewCount={previewCount}
				/>
			) : (
				<List
					items={data}
					isSearchActive={isSearchActive}
					query={query}
					isUsingWindowScroll={isUsingWindowScroll}
					renderItem={renderItem}
					listClassName={listClassName}
				/>
			)}
		</div>
	)
}

type ListProps<Item> = Pick<
	SearchableListProps<Item>,
	'items' | 'renderItem' | 'listClassName' | 'isUsingWindowScroll'
> & {
	isSearchActive: boolean
	query: string
}

function List<Item>({
	items,
	isSearchActive,
	query,
	renderItem,
	listClassName,
	isUsingWindowScroll = true,
}: ListProps<Item>): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const containerRef = useRef<HTMLElement>(null)
	const [scrollParent, setScrollParent] = useState<HTMLElement | undefined>(undefined)

	useEffect(() => {
		let containerElement = containerRef.current
		if (isUsingWindowScroll || !containerElement) {
			return
		}

		while (containerElement && containerElement.parentElement) {
			containerElement = containerElement.parentElement
			const overflowY = window.getComputedStyle(containerElement).overflowY

			if (overflowY === 'auto' || overflowY === 'scroll') {
				setScrollParent(containerElement)
				break
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={`searchable-list__list ${listClassName}`}>
			<div ref={containerRef as RefObject<HTMLDivElement>}>
				{isSearchActive && items.length === 0 ? (
					<p className='searchable-list__no-results-msg'>
						<NoResultsSearchIcon />
						{t(SEARCH_ROOT.resultsSummary.noResultsMessage, {
							query,
						})}
					</p>
				) : (
					<Virtuoso
						useWindowScroll={
							isUsingWindowScroll || scrollParent === undefined
						}
						customScrollParent={scrollParent}
						data={items}
						itemContent={(_, option) => (
							<div className='searchable-list__item-container'>
								{renderItem(option)}
							</div>
						)}
						increaseViewportBy={600}
					/>
				)}
			</div>
		</div>
	)
}

type CollapListProps<Item> = ListProps<Item> &
	Required<Pick<SearchableListProps<Item>, 'previewCount'>>

function CollapsibleList<Item>({
	items,
	previewCount,
	...listProps
}: CollapListProps<Item>): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const [isListCollapsed, toggleCollapsibleList] = useToggle(true)

	return (
		<>
			<List
				items={isListCollapsed ? items.slice(0, previewCount) : items}
				{...listProps}
			/>

			{items.length > previewCount ? (
				<button
					className='searchable-list__collapse-btn'
					onClick={toggleCollapsibleList}
				>
					{isListCollapsed
						? `${t(SEARCH_ROOT.viewResults.seeMore)} (${
								items.length - previewCount
							})`
						: t(SEARCH_ROOT.viewResults.seeLess)}
				</button>
			) : null}
		</>
	)
}
