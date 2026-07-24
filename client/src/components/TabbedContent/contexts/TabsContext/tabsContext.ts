import { createContext, useContext } from 'react'
import type { TabsContextValue } from './models/context.models'

export const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function useTabsContext(): TabsContextValue {
	const context = useContext(TabsContext)

	if (context === undefined)
		throw new Error('useTabsContext must be used within a TabsProvider')

	return context
}
