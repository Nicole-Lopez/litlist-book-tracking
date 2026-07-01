import { DIACRITIC_MARKS_REGEX } from '@constants/strings.constants'

export const isBlankString = (str: string): boolean => !str || !str.trim()

export const removeDiacritics = (str: string): string =>
	str.normalize('NFD').replace(DIACRITIC_MARKS_REGEX, '')
