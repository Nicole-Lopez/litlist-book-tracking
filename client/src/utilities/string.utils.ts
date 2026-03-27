import { NON_WHITESPACE_REGEX } from '@constants/strings.constants'

export const isEmptyString = (str: string): boolean =>
	str === '' && !NON_WHITESPACE_REGEX.test(str)
