export type BookCatalogState<BookT, FiltersInfoT, SortInfoT> = {
	displayedBooks: BookT[]
	filtersInfo: FiltersInfoT
	sortInfo: SortInfoT
}

export type BookFiltersInfo<
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
> = {
	isFilterActive: boolean
	filters: FiltersT
	activeFilters: ActiveFilter[]
}

export type BookFilter<FilterT, AvailableCountsT = null> = {
	value: FilterT
	isActive: boolean
	availableCounts: AvailableCountsT
}

export type BookSortInfo<SortT> = {
	isSortActive: boolean
	sort: SortT
}

export type FilterOptionCount = {
	name: string
	count: number
}

export type PageRangeFilterOptions = {
	minPages: number
	maxPages: number
}

export type PageCountFilterOptions = PageRangeFilterOptions & {
	isUnspecifiedExcluded: boolean
}

export type CategoriesFilterOption = string

export type CategoriesFilterOptions = CategoriesFilterOption[]

export type AuthorsFilterOption = string

export type AuthorsFilterOptions = AuthorsFilterOption[]

export type ContentWarningsFilterOption = string

export type ContentWarningsFilterOptions = ContentWarningsFilterOption[]

export type AvailableCategoriesCounts = FilterOptionCount[]

export type AvailableAuthorsCounts = FilterOptionCount[]

export type AvailableContentWarningsCounts = FilterOptionCount[]

export type AvailablePageCounts = {
	minPages: number
	maxPages: number
}

export type InitAvailableCounts<
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
> = (prevFilters?: FiltersT) => {
	accumulateCounts: (book: BookT) => void
	getAvailableCounts: (filters: FiltersT) => FiltersT
}

export type ActiveFilter = {
	key: string
	value: string
}

export type ApplyActiveFilters<BookT, StateT> = (
	state: StateT,
	fetchedBooks: BookT[],
) => StateT

export type ApplyCatalogFilterOptions<
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortT,
	StateT extends BookCatalogState<
		BookT,
		BookFiltersInfo<FiltersT>,
		BookSortInfo<SortT>
	>,
> = {
	state: StateT
	fetchedBooks: BookT[]
	applyActiveFilters: ApplyActiveFilters<BookT, StateT>
	initAvailableCounts: InitAvailableCounts<BookT, FiltersT>
	isFiltersActive: (filters: FiltersT) => boolean
	filterKey: keyof StateT['filtersInfo']['filters']
}
