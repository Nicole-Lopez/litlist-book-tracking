import type { BookPreview } from '@models/book.models'
import type { Prettify, ValueOf } from '@customTypes/customUtilityTypes'
import type { BOOK_SEARCH_MATCHES } from '../constants/bookCatalog.constants'

export type BookSearchMatch = ValueOf<typeof BOOK_SEARCH_MATCHES>

export type SearchBookPreview = Prettify<
	BookPreview & {
		searchMatches: BookSearchMatch[]
	}
>
