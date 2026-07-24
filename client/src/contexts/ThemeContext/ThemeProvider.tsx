import { useLayoutEffect } from 'react'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { ThemeContext } from './themeContext'
import {
	THEMES,
	THEME_LOCAL_STORAGE_KEY,
	DARK_THEME_CLASSNAME,
	LIGHT_THEME_CLASSNAME,
} from './constants/context.constants'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'
import type { ThemeContextValue } from './models/context.models'

export type ThemeProviderProps = PropsOnlyChildren

export default function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
	const [currentTheme, setCurrentTheme] = useLocalStorage(
		THEME_LOCAL_STORAGE_KEY,
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? THEMES.dark
			: THEMES.light,
	)

	const isDarkTheme = (): boolean => currentTheme === THEMES.dark

	const toggleTheme = (): void => {
		setCurrentTheme(isDarkTheme() ? THEMES.light : THEMES.dark)
	}

	useLayoutEffect(() => {
		if (currentTheme === THEMES.dark) {
			document.body.classList.add(DARK_THEME_CLASSNAME)
			document.body.classList.remove(LIGHT_THEME_CLASSNAME)

			return
		}

		document.body.classList.add(LIGHT_THEME_CLASSNAME)
		document.body.classList.remove(DARK_THEME_CLASSNAME)
	}, [currentTheme])

	const value: ThemeContextValue = {
		toggleTheme,
		currentTheme,
		isDarkTheme,
	}

	return <ThemeContext value={value}>{children}</ThemeContext>
}
