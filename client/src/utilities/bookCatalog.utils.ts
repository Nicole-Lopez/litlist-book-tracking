import {
	AUTHORS_ACTIVE_FILTER_KEY,
	CATEGORIES_ACTIVE_FILTER_KEY,
	CONTENT_WARNINGS_ACTIVE_FILTER_KEY,
	PAGE_COUNT_EXCLUDED_ACTIVE_FILTER_KEY,
	PAGE_COUNT_RANGE_ACTIVE_FILTER_KEY,
} from '@constants/bookCatalog.constants'
import { isArrayIncludingAllStrings, removeFirstMatch } from '@utilities/array.utils'
import { isAtLeast, isAtMost, isInRange } from '@utilities/number.utils'
import { filterEffect } from '@utilities/filters.utils'
import type { WithRequired } from '@customTypes/customUtilityTypes'
import type {
	BookCatalogState,
	BookFiltersInfo,
	BookSortInfo,
	InitAvailableCounts,
	ApplyCatalogFilterOptions,
	AvailableCategoriesCounts,
	AvailablePageCounts,
	PageCountFilterOptions,
	ApplyActiveFilters,
	PageRangeFilterOptions,
	BookFilter,
	ActiveFilter,
	CategoriesFilterOptions,
	AvailableAuthorsCounts,
	AvailableContentWarningsCounts,
	AuthorsFilterOptions,
	ContentWarningsFilterOptions,
} from '@models/bookCatalog.models'

export const applyCatalogFilter = <
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortT,
	StateT extends BookCatalogState<
		BookT,
		BookFiltersInfo<FiltersT>,
		BookSortInfo<SortT>
	>,
>(
	options: ApplyCatalogFilterOptions<BookT, FiltersT, SortT, StateT> & {
		updatedFilterValue: FiltersT[typeof options.filterKey]
		applyFilter: (
			books: BookT[],
			setAvailableBookCounts: (book: BookT) => void,
		) => BookT[]
		isResettingFilters: boolean
		activeFilters: ActiveFilter[]
	},
): StateT => {
	const {
		state,
		fetchedBooks,
		isResettingFilters,
		applyActiveFilters,
		initAvailableCounts,
		applyFilter,
		updatedFilterValue,
		isFiltersActive,
		filterKey,
		activeFilters,
	} = options

	const filters = {
		...state.filtersInfo.filters,
		[filterKey]: updatedFilterValue,
	}

	const filtersInfo: BookFiltersInfo<FiltersT> = {
		isFilterActive: isFiltersActive(filters),
		filters,
		activeFilters,
	}

	if (isResettingFilters) {
		return applyActiveFilters({ ...state, filtersInfo }, fetchedBooks)
	}

	const { accumulateCounts, getAvailableCounts } = initAvailableCounts(
		state.filtersInfo.filters,
	)

	const modifiedBooks = applyFilter(
		state.filtersInfo.isFilterActive || state.sortInfo.isSortActive
			? state.displayedBooks
			: fetchedBooks,
		book => accumulateCounts(book),
	)

	filtersInfo.filters = getAvailableCounts(filtersInfo.filters)

	return { ...state, displayedBooks: modifiedBooks, filtersInfo }
}

export const applyActiveCatalogFilters = <
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortT,
	StateT extends BookCatalogState<
		BookT,
		BookFiltersInfo<FiltersT>,
		BookSortInfo<SortT>
	>,
>(options: {
	state: StateT
	fetchedBooks: BookT[]
	initAvailableCounts: InitAvailableCounts<BookT, FiltersT>
	isBookMatchingFilters: (book: BookT) => boolean
	clearFilters: (state: StateT, books: BookT[]) => StateT
	applySort: (books: BookT[], selectedSortOption: SortT) => BookT[]
}): StateT => {
	const {
		state,
		fetchedBooks,
		isBookMatchingFilters,
		initAvailableCounts,
		clearFilters,
		applySort,
	} = options

	if (!state.filtersInfo.isFilterActive) return clearFilters(state, fetchedBooks)

	const { accumulateCounts, getAvailableCounts } = initAvailableCounts(
		state.filtersInfo.filters,
	)

	const books = filterEffect(fetchedBooks, isBookMatchingFilters, accumulateCounts)

	return {
		...state,
		displayedBooks: state.sortInfo.isSortActive
			? applySort(
					state.filtersInfo.isFilterActive ? books : fetchedBooks,
					state.sortInfo.sort,
				)
			: books,
		filtersInfo: {
			...state.filtersInfo,
			filters: getAvailableCounts(state.filtersInfo.filters),
		},
	}
}

export const clearCatalogFilters = <
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortT,
	StateT extends BookCatalogState<
		BookT,
		BookFiltersInfo<FiltersT>,
		BookSortInfo<SortT>
	>,
>(options: {
	state: StateT
	fetchedBooks: BookT[]
	clearedFiltersInfo: BookFiltersInfo<FiltersT>
	initAvailableCounts: InitAvailableCounts<BookT, FiltersT>
	applySort: (books: BookT[], selectedSortOption: SortT) => BookT[]
}): StateT => {
	const { state, fetchedBooks, clearedFiltersInfo, initAvailableCounts, applySort } =
		options

	const { accumulateCounts, getAvailableCounts } = initAvailableCounts()

	for (let i = 0; i < fetchedBooks.length; i++) {
		accumulateCounts(fetchedBooks[i]!)
	}

	return {
		...state,
		displayedBooks: state.sortInfo.isSortActive
			? applySort(fetchedBooks, state.sortInfo.sort)
			: [],
		filtersInfo: {
			...clearedFiltersInfo,
			filters: getAvailableCounts(clearedFiltersInfo.filters),
		},
	}
}

export const sortCatalogBooks = <
	BookT,
	FiltersT extends Record<string, BookFilter<unknown, unknown>>,
	SortT,
	StateT extends BookCatalogState<
		BookT,
		BookFiltersInfo<FiltersT>,
		BookSortInfo<SortT>
	>,
>(options: {
	state: StateT
	fetchedBooks: BookT[]
	applyActiveFilters: ApplyActiveFilters<BookT, StateT>
	applySort: (books: BookT[], sort: SortT) => BookT[]
	defaultOption: SortT
	sort: SortT
}): StateT => {
	const { fetchedBooks, applySort, applyActiveFilters, defaultOption, sort, state } =
		options

	const sortInfo: BookSortInfo<SortT> = {
		sort,
		isSortActive: sort !== defaultOption,
	}

	if (!sortInfo.isSortActive && state.filtersInfo.isFilterActive) {
		return applyActiveFilters({ ...state, sortInfo }, fetchedBooks)
	}

	return {
		...state,
		displayedBooks: sortInfo.isSortActive
			? applySort(
					state.filtersInfo.isFilterActive
						? state.displayedBooks
						: fetchedBooks,
					sortInfo.sort,
				)
			: [],
		sortInfo,
	}
}

export const toggleActiveFilter = (
	item: ActiveFilter,
	activeFilters: ActiveFilter[],
	isItemActive: boolean,
): ActiveFilter[] => {
	if (activeFilters.some(value => value.key === item.key)) {
		const updatedActiveFilters = activeFilters.filter(
			activeFilter => activeFilter.key !== item.key,
		)

		return isItemActive ? [item, ...updatedActiveFilters] : updatedActiveFilters
	}

	return [item, ...activeFilters]
}

export const initAvailableCategoriesCounts = (
	prevAvailableCounts: AvailableCategoriesCounts = [],
): {
	accumulateCategoriesCounts: (categories?: string[]) => void
	getAvailableCategoriesCounts: () => AvailableCategoriesCounts
} => {
	const availableCategoriesCounts = new Map(
		prevAvailableCounts.map(obj => [obj.name, 0]),
	)

	return {
		accumulateCategoriesCounts: categories => {
			if (categories?.length) {
				for (let i = 0; i < categories.length; i++) {
					const category = categories[i]!

					availableCategoriesCounts.set(
						category,
						(availableCategoriesCounts.get(category) ?? 0) + 1,
					)
				}
			}
		},
		getAvailableCategoriesCounts: () =>
			[...availableCategoriesCounts.entries()]
				.sort((a, b) => b[1] - a[1])
				.map(([name, count]) => ({ name, count })),
	}
}

export const initAvailableAuthorsCounts = (
	prevAvailableAuthorsCounts: AvailableAuthorsCounts = [],
): {
	accumulateAuthorsCounts: (authors?: string[]) => void
	getAvailableAuthorsCounts: () => AvailableAuthorsCounts
} => {
	const availableAuthorsCounts = new Map(
		prevAvailableAuthorsCounts.map(obj => [obj.name, 0]),
	)

	return {
		accumulateAuthorsCounts: authors => {
			if (authors?.length) {
				for (let i = 0; i < authors.length; i++) {
					const author = authors[i]!

					availableAuthorsCounts.set(
						author,
						(availableAuthorsCounts.get(author) ?? 0) + 1,
					)
				}
			}
		},
		getAvailableAuthorsCounts: () =>
			[...availableAuthorsCounts.entries()]
				.sort((a, b) => b[1] - a[1])
				.map(([name, count]) => ({ name, count })),
	}
}

export const initAvailableContentWarningsCounts = (
	prevAvailableContentWarningsCounts: AvailableContentWarningsCounts = [],
): {
	accumulateContentWarningsCounts: (contentWarnings?: string[]) => void
	getAvailableContentWarningsCounts: (
		currentFilterValue: ContentWarningsFilterOptions,
	) => AvailableContentWarningsCounts
} => {
	const availableContentWarningsCounts = new Map(
		prevAvailableContentWarningsCounts.map(obj => [obj.name, 0]),
	)

	return {
		accumulateContentWarningsCounts: contentWarnings => {
			if (contentWarnings?.length) {
				for (let i = 0; i < contentWarnings.length; i++) {
					const contentWarning = contentWarnings[i]!

					availableContentWarningsCounts.set(
						contentWarning,
						(availableContentWarningsCounts.get(contentWarning) ?? 0) + 1,
					)
				}
			}
		},
		getAvailableContentWarningsCounts: currentFilterValue => {
			const beqwe = []
			const selectedP = []

			for (const [name, count] of availableContentWarningsCounts) {
				if (currentFilterValue.includes(name)) {
					selectedP.unshift({ name, count })
				} else {
					beqwe.push({ name, count })
				}
			}

			return [...selectedP, ...beqwe.sort((a, b) => b.count - a.count)]
		},
	}
}

export const initAvailablePageCounts = (): {
	accumulatePageCounts: (pageCount?: number) => void
	getAvailablePageCounts: () => AvailablePageCounts
} => {
	const availablePageCounts = { maxPages: 0, minPages: 0 }

	return {
		accumulatePageCounts: pageCount => {
			if (!isPagesCountSpecified(pageCount)) return

			if (pageCount < availablePageCounts.minPages) {
				availablePageCounts.minPages = pageCount
			}

			if (pageCount > availablePageCounts.maxPages) {
				availablePageCounts.maxPages = pageCount
			}
		},
		getAvailablePageCounts: () => availablePageCounts,
	}
}

// ************************
export const isCategoriesFilterActive = (
	currentFilter: CategoriesFilterOptions,
): boolean => currentFilter.length !== 0

export const isBookIncludingAllCategories = (
	value: string[] | undefined,
	categories: CategoriesFilterOptions,
): boolean => !!value && isArrayIncludingAllStrings(value, categories)

export const filterBooksByCategories = <
	FilterKeyT extends string,
	BookKeyT extends string,
	BookT extends Partial<Record<BookKeyT, string[]>>,
	FilterT extends Record<string, BookFilter<unknown, unknown>> &
		Record<
			keyof StateT['filtersInfo']['filters'][FilterKeyT],
			BookFilter<CategoriesFilterOptions, AvailableCategoriesCounts>
		>,
	SortT,
	StateT extends BookCatalogState<BookT, BookFiltersInfo<FilterT>, BookSortInfo<SortT>>,
>(
	options: ApplyCatalogFilterOptions<BookT, FilterT, SortT, StateT> & {
		category: string
		bookKey: BookKeyT
	},
): StateT => {
	const {
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		bookKey,
		filterKey,
		category,
		isFiltersActive,
	} = options

	const currentCategoriesFilter = state.filtersInfo.filters[filterKey]
	const isResettingFilters = currentCategoriesFilter.value.includes(category)

	const updatedCategories = isResettingFilters
		? removeFirstMatch(
				currentCategoriesFilter.value,
				activeCategory => activeCategory === category,
			)
		: [...currentCategoriesFilter.value, category]

	return applyCatalogFilter({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		isResettingFilters,
		isFiltersActive,
		filterKey,
		updatedFilterValue: {
			...currentCategoriesFilter,
			value: updatedCategories,
			isActive: isCategoriesFilterActive(updatedCategories),
		},
		applyFilter: (books, setAvailableBookCounts) =>
			filterEffect(
				books,
				book => !!book[bookKey]?.includes(category),
				setAvailableBookCounts,
			),
		activeFilters: isResettingFilters
			? state.filtersInfo.activeFilters.filter(
					activeFilter => activeFilter.value !== category,
				)
			: [
					{ key: CATEGORIES_ACTIVE_FILTER_KEY, value: category },
					...state.filtersInfo.activeFilters,
				],
	})
}

export const isAuthorsFilterActive = (currentFilter: AuthorsFilterOptions): boolean =>
	currentFilter.length !== 0

export const isBookIncludingAllAuthors = (
	value: string[] | undefined,
	authors: AuthorsFilterOptions,
): boolean => !!value && isArrayIncludingAllStrings(value, authors)

export const filterBooksByAuthors = <
	FilterKeyT extends string,
	BookKeyT extends string,
	BookT extends Partial<Record<BookKeyT, string[]>>,
	FilterT extends Record<string, BookFilter<unknown, unknown>> &
		Record<
			keyof StateT['filtersInfo']['filters'][FilterKeyT],
			BookFilter<AuthorsFilterOptions, AvailableAuthorsCounts>
		>,
	SortT,
	StateT extends BookCatalogState<BookT, BookFiltersInfo<FilterT>, BookSortInfo<SortT>>,
>(
	options: ApplyCatalogFilterOptions<BookT, FilterT, SortT, StateT> & {
		author: string
		bookKey: BookKeyT
	},
): StateT => {
	const {
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		bookKey,
		filterKey,
		author,
		isFiltersActive,
	} = options

	const currentAuthorsFilter = state.filtersInfo.filters[filterKey]
	const isResettingFilters = currentAuthorsFilter.value.includes(author)

	const updatedAuthors = isResettingFilters
		? removeFirstMatch(
				currentAuthorsFilter.value,
				activeAuthor => activeAuthor === author,
			)
		: [...currentAuthorsFilter.value, author]

	return applyCatalogFilter({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		isResettingFilters,
		isFiltersActive,
		filterKey,
		updatedFilterValue: {
			...currentAuthorsFilter,
			value: updatedAuthors,
			isActive: isAuthorsFilterActive(updatedAuthors),
		},
		applyFilter: (books, setAvailableBookCounts) =>
			filterEffect(
				books,
				book => !!book[bookKey]?.includes(author),
				setAvailableBookCounts,
			),
		activeFilters: isResettingFilters
			? state.filtersInfo.activeFilters.filter(
					activeFilter => activeFilter.value !== author,
				)
			: [
					{ key: AUTHORS_ACTIVE_FILTER_KEY, value: author },
					...state.filtersInfo.activeFilters,
				],
	})
}

export const isContentWarningsFilterActive = (
	currentFilter: ContentWarningsFilterOptions,
): boolean => currentFilter.length !== 0

export const isBookExcludingAllContentWarnings = (
	value: string[] | undefined,
	contentWarnings: ContentWarningsFilterOptions,
): boolean => !value || value.every(warning => !contentWarnings.includes(warning))

export const filterBooksByContentWarnings = <
	FilterKeyT extends string,
	BookKeyT extends string,
	BookT extends Partial<Record<BookKeyT, string[]>>,
	FilterT extends Record<string, BookFilter<unknown, unknown>> &
		Record<
			keyof StateT['filtersInfo']['filters'][FilterKeyT],
			BookFilter<ContentWarningsFilterOptions, AvailableContentWarningsCounts>
		>,
	SortT,
	StateT extends BookCatalogState<BookT, BookFiltersInfo<FilterT>, BookSortInfo<SortT>>,
>(
	options: ApplyCatalogFilterOptions<BookT, FilterT, SortT, StateT> & {
		contentWarning: string
		bookKey: BookKeyT
	},
): StateT => {
	const {
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		bookKey,
		filterKey,
		contentWarning,
		isFiltersActive,
	} = options

	const currentContentWarningsFilter = state.filtersInfo.filters[filterKey]
	const isResettingFilters = currentContentWarningsFilter.value.includes(contentWarning)

	const updatedContentWarnings = isResettingFilters
		? removeFirstMatch(
				currentContentWarningsFilter.value,
				activeAuthor => activeAuthor === contentWarning,
			)
		: [...currentContentWarningsFilter.value, contentWarning]

	return applyCatalogFilter({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		isResettingFilters,
		isFiltersActive,
		filterKey,
		updatedFilterValue: {
			...currentContentWarningsFilter,
			value: updatedContentWarnings,
			isActive: isAuthorsFilterActive(updatedContentWarnings),
		},
		applyFilter: (books, setAvailableBookCounts) =>
			filterEffect(
				books,
				book => !book[bookKey]?.includes(contentWarning),
				setAvailableBookCounts,
			),
		activeFilters: isResettingFilters
			? state.filtersInfo.activeFilters.filter(
					activeFilter => activeFilter.value !== contentWarning,
				)
			: [
					{ key: CONTENT_WARNINGS_ACTIVE_FILTER_KEY, value: contentWarning },
					...state.filtersInfo.activeFilters,
				],
	})
}

export const isPageRangeFilterActive = (currentFilter: PageRangeFilterOptions): boolean =>
	currentFilter.minPages !== 0 || currentFilter.maxPages !== 0

export const isUnspecifiedExcludedPageCountFilterActive = (
	currentFilter: PageCountFilterOptions['isUnspecifiedExcluded'],
): boolean => currentFilter

export const isPagesCountFilterActive = (
	currentFilter: WithRequired<Partial<PageCountFilterOptions>, 'minPages' | 'maxPages'>,
): boolean =>
	isPageRangeFilterActive(currentFilter) ||
	(currentFilter.isUnspecifiedExcluded !== undefined &&
		isUnspecifiedExcludedPageCountFilterActive(currentFilter.isUnspecifiedExcluded))

export const isPagesCountSpecified = (value?: number): value is number => !!value

export const isPageCountInRange = (
	value: number | undefined,
	pageCount: PageCountFilterOptions,
): boolean =>
	isPagesCountSpecified(value)
		? isInRange(value, pageCount.minPages, pageCount.maxPages)
		: !pageCount.isUnspecifiedExcluded

export const filterBooksByPageCount = <
	FilterKeyT extends string,
	BookKeyT extends string,
	BookT extends Partial<Record<BookKeyT, number>>,
	PageCounT extends WithRequired<
		Partial<PageCountFilterOptions>,
		'minPages' | 'maxPages'
	>,
	FilterT extends Record<string, BookFilter<unknown, unknown>> &
		Record<
			keyof StateT['filtersInfo']['filters'][FilterKeyT],
			BookFilter<PageCounT, AvailablePageCounts>
		>,
	SortT,
	StateT extends BookCatalogState<BookT, BookFiltersInfo<FilterT>, BookSortInfo<SortT>>,
>(
	options: ApplyCatalogFilterOptions<BookT, FilterT, SortT, StateT> & {
		pageCount: PageCounT
		bookKey: BookKeyT
	},
): StateT => {
	const {
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		pageCount,
		bookKey,
		filterKey,
		isFiltersActive,
	} = options

	const prevPageCount = state.filtersInfo.filters[filterKey].value
	const isMinPageCountUpdated = pageCount.minPages !== prevPageCount.minPages
	const isMaxPageCountUpdated = pageCount.maxPages !== prevPageCount.maxPages

	return applyCatalogFilter({
		state,
		fetchedBooks,
		applyActiveFilters,
		initAvailableCounts,
		filterKey,
		isFiltersActive,
		updatedFilterValue: {
			...state.filtersInfo.filters[filterKey],
			value: pageCount,
			isActive: isPagesCountFilterActive(pageCount),
		},
		isResettingFilters:
			(isMinPageCountUpdated &&
				isAtMost(pageCount.minPages, prevPageCount.minPages)) ||
			(isMaxPageCountUpdated &&
				isAtLeast(pageCount.maxPages, prevPageCount.maxPages)) ||
			(prevPageCount.isUnspecifiedExcluded !== undefined &&
				isUnspecifiedExcludedPageCountFilterActive(
					prevPageCount.isUnspecifiedExcluded,
				)),
		applyFilter: (books, setAvailableBookCounts) => {
			let isBookMatchingFilter: (bookPageCount: number) => boolean = () => true

			if (isMinPageCountUpdated) {
				const prevIsBookMatchingFilters = isBookMatchingFilter
				isBookMatchingFilter = bookPageCount =>
					prevIsBookMatchingFilters(bookPageCount) &&
					isAtLeast(bookPageCount, pageCount.minPages)
			}

			if (isMaxPageCountUpdated) {
				const prevIsBookMatchingFilters = isBookMatchingFilter
				isBookMatchingFilter = bookPageCount =>
					prevIsBookMatchingFilters(bookPageCount) &&
					isAtMost(bookPageCount, pageCount.maxPages)
			}

			return filterEffect(
				books,
				book => {
					const bookPageCount = book[bookKey]

					if (isPagesCountSpecified(bookPageCount)) {
						return isBookMatchingFilter(bookPageCount)
					}

					return !pageCount.isUnspecifiedExcluded
				},
				setAvailableBookCounts,
			)
		},
		activeFilters:
			isMinPageCountUpdated || isMaxPageCountUpdated
				? toggleActiveFilter(
						{
							key: PAGE_COUNT_RANGE_ACTIVE_FILTER_KEY,
							value: `${pageCount.minPages} - ${pageCount.maxPages}`,
						},
						state.filtersInfo.activeFilters,
						isPageRangeFilterActive(pageCount),
					)
				: pageCount.isUnspecifiedExcluded !== undefined
					? toggleActiveFilter(
							{
								key: PAGE_COUNT_EXCLUDED_ACTIVE_FILTER_KEY,
								value: `${pageCount.isUnspecifiedExcluded}`,
							},
							state.filtersInfo.activeFilters,
							isUnspecifiedExcludedPageCountFilterActive(
								pageCount.isUnspecifiedExcluded,
							),
						)
					: [...state.filtersInfo.activeFilters],
	})
}
