import { SORT_OPTIONS } from '@constants/sort.constants'
import { sortObjectsByTitle, sortObjectsByTime } from '@utilities/sort.utils'
import type { SearchBookPreview } from '@pages/Search/models/searchBook.models'
import type { SearchCatalogSort } from '../models/sortBooks.models'

export const applySort = (
	books: SearchBookPreview[],
	selectedSortOption: SearchCatalogSort,
): SearchBookPreview[] => {
	if (
		selectedSortOption === SORT_OPTIONS.titleAZ ||
		selectedSortOption === SORT_OPTIONS.titleZA
	)
		return sortObjectsByTitle(books, 'title', selectedSortOption)

	if (
		selectedSortOption === SORT_OPTIONS.latest ||
		selectedSortOption === SORT_OPTIONS.oldest
	)
		return sortObjectsByTime(books, 'publishedYear', selectedSortOption)

	return books
}
