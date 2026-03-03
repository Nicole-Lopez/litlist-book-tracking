import { createContext, useContext } from 'react'
import type { ThemeContextValue } from './models/context.models'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useThemeContext(): ThemeContextValue {
	const context = useContext(ThemeContext)

	if (context === undefined)
		throw new Error(
			'ThemeContext must be used within a ThemeContextProvider. Please ensure that your component is wrapped with a ThemeContextProvider',
		)

	return context
}
