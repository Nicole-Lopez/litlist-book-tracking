import { SORT_OPTIONS } from '@constants/sort.constants'
import { sortObjectsByTitle, sortObjectsByTime } from '@utilities/sort.utils'
import type { BookPreview } from '@models/book.models'
import type { CategoryCatalogSort } from '../models/sortBooks.models'

export const applySort = (
	books: BookPreview[],
	selectedSortOption: CategoryCatalogSort,
): BookPreview[] => {
	if (
		selectedSortOption === SORT_OPTIONS.titleAZ ||
		selectedSortOption === SORT_OPTIONS.titleZA
	) {
		return sortObjectsByTitle(books, 'title', selectedSortOption)
	}

	if (
		selectedSortOption === SORT_OPTIONS.latest ||
		selectedSortOption === SORT_OPTIONS.oldest
	) {
		return sortObjectsByTime(books, 'publishedYear', selectedSortOption)
	}

	return books
}
