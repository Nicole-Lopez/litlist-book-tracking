import { useTabsContext } from './contexts/TabsContext/tabsContext'
import TabsProvider from './contexts/TabsContext/TabsProvider'
import './TabbedContent.scss'
import type { ButtonHTMLAttributes, ReactNode, HTMLAttributes } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { WithRequired } from '@customTypes/customUtilityTypes'

export type TabbedContentProps = PropsWithChildren<{
	className?: string
	initialActiveTab: string
}>

export default function TabbedContent({
	children,
	className = '',
	initialActiveTab,
}: TabbedContentProps): ReactNode {
	return (
		<TabsProvider initialActiveTab={initialActiveTab}>
			<div className={`tabbed-content ${className}`}>{children}</div>
		</TabsProvider>
	)
}

export type ListProps = PropsWithChildren<{
	className?: string
}>

function List({ children, className = '' }: ListProps): ReactNode {
	return <div className={`tabbed-content__tabs-container ${className}`}>{children}</div>
}

export type TabProps = WithRequired<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'id' | 'children'
> & {
	isMounted?: boolean
}

function Tab({
	isMounted = true,
	id,
	className = '',
	onClick,
	...buttonAttributes
}: TabProps): ReactNode {
	const { activeTab, setActiveTab } = useTabsContext()
	const isActive = activeTab === id

	if (!isMounted) return null

	return (
		<button
			{...buttonAttributes}
			id={id}
			onClick={e => {
				if (!isActive) {
					setActiveTab(id)
				}
				onClick?.(e)
			}}
			className={`tabbed-content__tab ${
				isActive ? 'tabbed-content__tab--active' : ''
			} ${className}`}
		/>
	)
}

export type PanelProps = WithRequired<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>

function Panel({ id, children, ...divAttributes }: PanelProps): ReactNode {
	const { activeTab } = useTabsContext()

	if (activeTab !== id) return null

	return <div {...divAttributes}>{children}</div>
}

TabbedContent.List = List
TabbedContent.Tab = Tab
TabbedContent.Panel = Panel
