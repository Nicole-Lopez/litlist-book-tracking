import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS } from '@services/internationalization/locale.constants'
import LanguageIcon from '@assets/icons/LanguageIcon'
import Dropdown from '@components/Dropdown/Dropdown'
import IconButton from '../IconButton/IconButton'
import type { ReactNode } from 'react'

const LANGS: Array<{
	label: string
	value: (typeof SUPPORTED_LANGS)[keyof typeof SUPPORTED_LANGS]
}> = [
	{ label: 'English', value: SUPPORTED_LANGS.en },
	{ label: 'Español', value: SUPPORTED_LANGS.es },
]

export default function LanguageSelect(): ReactNode {
	const { i18n } = useTranslation()

	return (
		<Dropdown>
			{(toggleMenu, isOpen) => (
				<>
					<IconButton onClick={toggleMenu}>
						<LanguageIcon />
					</IconButton>

					<Dropdown.Menu isOpen={isOpen} className='root-header__dropdown-menu'>
						{LANGS.map(lang => (
							<Dropdown.OptionButton
								key={lang.value}
								isMarked={i18n.language === lang.value}
								onClick={() => {
									if (lang.value !== i18n.language) {
										void i18n.changeLanguage(lang.value)
									}
								}}
							>
								{lang.label}
							</Dropdown.OptionButton>
						))}
					</Dropdown.Menu>
				</>
			)}
		</Dropdown>
	)
}
