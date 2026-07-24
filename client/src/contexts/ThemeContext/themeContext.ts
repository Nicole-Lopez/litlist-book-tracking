import { createContext, useContext } from 'react'
import type { ThemeContextValue } from './models/context.models'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useThemeContext(): ThemeContextValue {
	const context = useContext(ThemeContext)

	if (context === undefined)
		throw new Error('useThemeContext must be used within a ThemeProvider')

	return context
}
