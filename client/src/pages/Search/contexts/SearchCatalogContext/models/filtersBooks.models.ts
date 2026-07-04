import type {
	BookFiltersInfo,
	PageCountFilterOptions,
	AvailableCategoriesCounts,
	AvailablePageCounts,
	BookFilter,
	CategoriesFilterOptions,
	AuthorsFilterOptions,
	ContentWarningsFilterOptions,
	AvailableAuthorsCounts,
	AvailableContentWarningsCounts,
} from '@models/bookCatalog.models'
import type { SEARCH_TYPE_FILTER_INACTIVE_OPTION } from '@pages/Search/constants/bookCatalog.constants'
import type { BookSearchMatch } from '@pages/Search/models/searchBook.models'

export type SearchTypeFilterOption =
	| BookSearchMatch
	| typeof SEARCH_TYPE_FILTER_INACTIVE_OPTION

export type SearchTypeFilter = SearchTypeFilterOption

export type CategoriesFilter = CategoriesFilterOptions

export type AuthorsFilter = AuthorsFilterOptions

export type ContentWarningsFilter = ContentWarningsFilterOptions

export type PageCountFilter = PageCountFilterOptions

export type SearchCatalogFilters = {
	searchType: BookFilter<SearchTypeFilter>
	categories: BookFilter<CategoriesFilter, AvailableCategoriesCounts>
	authors: BookFilter<AuthorsFilter, AvailableAuthorsCounts>
	contentWarnings: BookFilter<ContentWarningsFilter, AvailableContentWarningsCounts>
	pageCount: BookFilter<PageCountFilter, AvailablePageCounts>
}

export type SearchCatalogFiltersInfo = BookFiltersInfo<SearchCatalogFilters>
