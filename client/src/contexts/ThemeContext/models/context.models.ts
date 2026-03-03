import type { THEMES } from '../constants/context.constants'

export type Themes = (typeof THEMES)[keyof typeof THEMES]

export type ThemeContextValue = {
	currentTheme: Themes
	toggleTheme: () => void
	isDarkTheme: () => boolean
}
