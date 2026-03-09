import { useThemeContext } from '@contexts/ThemeContext/themeContext'
import IconButton from '../IconButton/IconButton'
import LightThemeIcon from '@assets/icons/LightThemeIcon'
import DarkThemeIcon from '@assets/icons/DarkThemeIcon'
import type { ReactNode } from 'react'

export default function ThemeToggle(): ReactNode {
	const { toggleTheme, isDarkTheme } = useThemeContext()

	return (
		<IconButton onClick={toggleTheme}>
			{isDarkTheme() ? <LightThemeIcon /> : <DarkThemeIcon />}
		</IconButton>
	)
}
