import type {
	BookFiltersInfo,
	PageCountFilterOptions,
	AvailableCategoriesCounts,
	BookFilter,
	CategoriesFilterOptions,
	AuthorsFilterOptions,
	ContentWarningsFilterOptions,
	AvailableAuthorsCounts,
	AvailableContentWarningsCounts,
	AvailablePageCounts,
} from '@models/bookCatalog.models'

export type CategoriesFilter = CategoriesFilterOptions

export type AuthorsFilter = AuthorsFilterOptions

export type ContentWarningsFilter = ContentWarningsFilterOptions

export type PageCountFilter = PageCountFilterOptions

export type CategoryCatalogFilters = {
	categories: BookFilter<CategoriesFilter, AvailableCategoriesCounts>
	authors: BookFilter<AuthorsFilter, AvailableAuthorsCounts>
	contentWarnings: BookFilter<ContentWarningsFilter, AvailableContentWarningsCounts>
	pageCount: BookFilter<PageCountFilter, AvailablePageCounts>
}

export type CategoryCatalogFiltersInfo = BookFiltersInfo<CategoryCatalogFilters>
