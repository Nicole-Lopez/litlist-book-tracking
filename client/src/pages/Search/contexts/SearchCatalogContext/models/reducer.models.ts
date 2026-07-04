import type { ACTION_TYPES } from '../constants/reducer.constants'
import type {
	AuthorsFilterOption,
	BookCatalogState,
	CategoriesFilterOption,
	ContentWarningsFilterOption,
	PageCountFilterOptions,
} from '@models/bookCatalog.models'
import type { SearchBookPreview } from '@pages/Search/models/searchBook.models'
import type {
	SearchCatalogFiltersInfo,
	SearchTypeFilterOption,
} from './filtersBooks.models'
import type { SearchCatalogSort, SearchCatalogSortInfo } from './sortBooks.models'

export type SearchCatalogReducerState = BookCatalogState<
	SearchBookPreview,
	SearchCatalogFiltersInfo,
	SearchCatalogSortInfo
>

export type SearchCatalogAction =
	| {
			type: typeof ACTION_TYPES.FILTERS_CLEARED
			payload: { fetchedBooks: SearchBookPreview[] }
	  }
	| {
			type: typeof ACTION_TYPES.CATALOG_RESET
			payload: { fetchedBooks: SearchBookPreview[] }
	  }
	| {
			type: typeof ACTION_TYPES.CATEGORIES_FILTER_UPDATED
			payload: {
				category: CategoriesFilterOption
				fetchedBooks: SearchBookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.AUTHORS_FILTER_UPDATED
			payload: {
				author: AuthorsFilterOption
				fetchedBooks: SearchBookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.CONTENT_WARNINGS_FILTER_UPDATED
			payload: {
				contentWarning: ContentWarningsFilterOption
				fetchedBooks: SearchBookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.PAGE_COUNT_FILTER_UPDATED
			payload: {
				pageCount: PageCountFilterOptions
				fetchedBooks: SearchBookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.SEARCH_TYPE_FILTER_UPDATED
			payload: {
				searchType: SearchTypeFilterOption
				fetchedBooks: SearchBookPreview[]
			}
	  }
	| {
			type: typeof ACTION_TYPES.SORT_UPDATED
			payload: { sort: SearchCatalogSort; fetchedBooks: SearchBookPreview[] }
	  }
