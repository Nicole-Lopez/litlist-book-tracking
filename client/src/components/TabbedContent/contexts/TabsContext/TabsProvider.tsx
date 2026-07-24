import { useState } from 'react'
import { TabsContext } from './tabsContext'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { TabsContextValue } from './models/context.models'

export type TabsProviderProps = PropsWithChildren<{
	initialActiveTab: string
}>

export default function TabsProvider({
	children,
	initialActiveTab,
}: TabsProviderProps): ReactNode {
	const [activeTab, setActiveTab] = useState(initialActiveTab)

	const value: TabsContextValue = {
		activeTab,
		setActiveTab,
	}

	return <TabsContext value={value}>{children}</TabsContext>
}
