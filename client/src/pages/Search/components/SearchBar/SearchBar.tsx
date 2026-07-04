import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFetchedBooks } from '@pages/Search/hooks/useFetchedBooks'
import { SEARCH_BOOKS_ROOT } from '@services/internationalization/roots/search.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import SearchInputField from '@components/SearchInputField/SearchInputField'
import type { ReactNode } from 'react'

export type SearchBarProps = {
	searchBooks: (query: string) => void
}

export default function SearchBar({ searchBooks }: SearchBarProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.search)
	const { isLoading, query: initialQuery } = useFetchedBooks()
	const [query, setQuery] = useState(initialQuery)

	return (
		<SearchInputField
			className='search-page__search-bar'
			onSearch={() => searchBooks(query)}
		>
			<SearchInputField.Input
				placeholder={t(SEARCH_BOOKS_ROOT.placeholder)}
				maxLength={600}
				value={query}
				onChange={e => setQuery(e.target.value)}
				autoComplete='search books'
				disabled={isLoading}
			/>
			<SearchInputField.SearchButton query={query} disabled={isLoading} />
		</SearchInputField>
	)
}
