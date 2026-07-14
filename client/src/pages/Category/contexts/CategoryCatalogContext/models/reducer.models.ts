import type { ACTION_TYPES } from '../constants/reducer.constants'
import type {
	AuthorsFilterOption,
	BookCatalogState,
	CategoriesFilterOption,
	ContentWarningsFilterOption,
	PageCountFilterOptions,
} from '@models/bookCatalog.models'
import type { CategoryCatalogFiltersInfo } from './filtersBooks.models'
import type { CategoryCatalogSort, CategoryCatalogSortInfo } from './sortBooks.models'
import type { BookPreview } from '@models/book.models'

export type CategoryCatalogReducerState = BookCatalogState<
	BookPreview,
	CategoryCatalogFiltersInfo,
	CategoryCatalogSortInfo
>

export type CategoryCatalogAction =
	| {
			type: typeof ACTION_TYPES.FILTERS_CLEARED
			payload: { fetchedBooks: BookPreview[] }
	  }
	| {
			type: typeof ACTION_TYPES.CATALOG_RESET
			payload: { fetchedBooks: BookPreview[] }
	  }
	| {
			type: typeof ACTION_TYPES.CATEGORIES_FILTER_UPDATED
			payload: {
				category: CategoriesFilterOption
				fetchedBooks: BookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.AUTHORS_FILTER_UPDATED
			payload: {
				author: AuthorsFilterOption
				fetchedBooks: BookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.CONTENT_WARNINGS_FILTER_UPDATED
			payload: {
				contentWarning: ContentWarningsFilterOption
				fetchedBooks: BookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.PAGE_COUNT_FILTER_UPDATED
			payload: {
				pageCount: PageCountFilterOptions
				fetchedBooks: BookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.SORT_UPDATED
			payload: { sort: CategoryCatalogSort; fetchedBooks: BookPreview[] }
	  }
