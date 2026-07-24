import type { ValueOf } from '@customTypes/customUtilityTypes'
import type { THEMES } from '../constants/context.constants'

export type Themes = ValueOf<typeof THEMES>

export type ThemeContextValue = {
	currentTheme: Themes
	toggleTheme: () => void
	isDarkTheme: () => boolean
}
