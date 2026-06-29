import { useState } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { isBlankString } from '@utilities/string.utils'
import type { Dispatch, SetStateAction } from 'react'

export type UseDebounceSearchOptions = {
	initialQuery?: string | (() => string)
	delay?: number
	onDebounce?: (debouncedQuery: string) => void
}
export type UseDebounceSearchReturn = {
	query: string
	setQuery: Dispatch<SetStateAction<string>>
	isSearchActive: boolean
}

export function useDebounceSearch(
	options?: UseDebounceSearchOptions,
): UseDebounceSearchReturn {
	const [query, setQuery] = useState(options?.initialQuery ?? '')

	useDebounce(query, options?.delay ?? 300, options?.onDebounce)

	return {
		query,
		setQuery,
		isSearchActive: !isBlankString(query),
	}
}
