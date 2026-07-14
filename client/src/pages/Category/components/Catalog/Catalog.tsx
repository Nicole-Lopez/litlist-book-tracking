import { useTranslation } from 'react-i18next'
import { useFetchedBooks } from '@pages/Category/hooks/useFetchedBooks'
import {
	useBooksContext,
	useFiltersContext,
	useSortContext,
	useCategoryCatalogActionsContext,
} from '@pages/Category/contexts/CategoryCatalogContext/categoryCatalogContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FILTERS_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import {
	AUTHORS_ACTIVE_FILTER_KEY,
	CATEGORIES_ACTIVE_FILTER_KEY,
	CONTENT_WARNINGS_ACTIVE_FILTER_KEY,
	PAGE_COUNT_RANGE_ACTIVE_FILTER_KEY,
} from '@constants/bookCatalog.constants'
import { CATEGORY_CATALOG_SORT_OPTIONS } from '@pages/Category/constants/bookCatalog.constants'
import { removeFirstMatch } from '@utilities/array.utils'
import BookCatalog from '@components/BookCatalog/BookCatalog'
import PageCountBookFilter from '@components/PageCountBookFilter/PageCountBookFilter'
import SearchableList from '@components/SearchableList/SearchableList'
import CheckboxWithCount from '@components/CheckboxWithCount/CheckboxWithCount'
import type { ReactNode } from 'react'

function BooksSection(): ReactNode {
	const books = useBooksContext()
	const { isLoading } = useFetchedBooks()

	return <BookCatalog.BooksSection books={books} isLoading={isLoading} />
}

function SortSelect(): ReactNode {
	const { sort } = useSortContext()
	const { applySort } = useCategoryCatalogActionsContext()

	return (
		<BookCatalog.SortSelect
			options={CATEGORY_CATALOG_SORT_OPTIONS}
			onSelect={applySort}
			value={sort}
		/>
	)
}

function FiltersPanel(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.sortAndFilter)
	const {
		clearFilters,
		applyPageCountFilter,
		applyCategoriesFilter,
		applyAuthorsFilter,
		applyContentWarningsFilter,
		removeCategoryFilter,
		removeAuthorFilter,
		removeContentWarningFilter,
		removePageCountRangeFilter,
		removeUnspecifiedPageCountFilter,
	} = useCategoryCatalogActionsContext()
	const { filters, activeFilters } = useFiltersContext()
	const { isLoading, category } = useFetchedBooks()

	return (
		<BookCatalog.FiltersPanel
			activeFilterList={activeFilters.map(activeFilter => {
				if (activeFilter.key === CATEGORIES_ACTIVE_FILTER_KEY) {
					return {
						label: activeFilter.value,
						onRemove: () => {
							removeCategoryFilter(activeFilter.value)
						},
					}
				}

				if (activeFilter.key === AUTHORS_ACTIVE_FILTER_KEY) {
					return {
						label: `${t(FILTERS_ROOT.authors.label)}: ${activeFilter.value}`,
						onRemove: () => {
							removeAuthorFilter(activeFilter.value)
						},
					}
				}

				if (activeFilter.key === CONTENT_WARNINGS_ACTIVE_FILTER_KEY) {
					return {
						label: `${t(FILTERS_ROOT.contentWarnings.label)}: ${activeFilter.value}`,
						onRemove: () => {
							removeContentWarningFilter(activeFilter.value)
						},
					}
				}

				if (activeFilter.key === PAGE_COUNT_RANGE_ACTIVE_FILTER_KEY) {
					return {
						label: activeFilter.value,
						onRemove: () => {
							removePageCountRangeFilter(filters.pageCount.value)
						},
					}
				}

				return {
					label: t(FILTERS_ROOT.pagesRange.excludeUnspecified),
					onRemove: () => {
						removeUnspecifiedPageCountFilter(filters.pageCount.value)
					},
				}
			})}
			onClearFilters={clearFilters}
		>
			<BookCatalog.Accordion
				label={t(FILTERS_ROOT.authors.label)}
				isForceCollapsed={isLoading}
			>
				<SearchableList
					items={filters.authors.availableCounts}
					isCollapsible
					getSearchValue={author => author.name}
					isUsingWindowScroll={false}
					renderItem={item => (
						<CheckboxWithCount
							onChange={() => applyAuthorsFilter(item.name)}
							checked={filters.authors.value.includes(item.name)}
							count={item.count}
						>
							{item.name}
						</CheckboxWithCount>
					)}
				/>
			</BookCatalog.Accordion>

			<BookCatalog.Accordion
				label={t(FILTERS_ROOT.categories.label)}
				isForceCollapsed={isLoading}
			>
				<SearchableList
					items={removeFirstMatch(
						filters.categories.availableCounts,
						item => item.name.toLowerCase() === category.toLowerCase(),
					)}
					isCollapsible
					getSearchValue={category => category.name}
					isUsingWindowScroll={false}
					renderItem={item => (
						<CheckboxWithCount
							onChange={() => applyCategoriesFilter(item.name)}
							checked={filters.categories.value.includes(item.name)}
							count={item.count}
						>
							{item.name}
						</CheckboxWithCount>
					)}
				/>
			</BookCatalog.Accordion>

			<BookCatalog.Accordion
				isForceCollapsed={isLoading}
				label={t(FILTERS_ROOT.pagesRange.label)}
			>
				<PageCountBookFilter
					currentPageCount={filters.pageCount.value}
					min={filters.pageCount.availableCounts.minPages}
					max={filters.pageCount.availableCounts.maxPages}
					applyPageCountFilter={applyPageCountFilter}
				/>
			</BookCatalog.Accordion>

			<BookCatalog.Accordion
				label={t(FILTERS_ROOT.contentWarnings.label)}
				isForceCollapsed={isLoading}
			>
				<SearchableList
					items={filters.contentWarnings.availableCounts}
					isCollapsible
					getSearchValue={contentWarning => contentWarning.name}
					isUsingWindowScroll={false}
					renderItem={item => (
						<CheckboxWithCount
							onChange={() => applyContentWarningsFilter(item.name)}
							checked={filters.contentWarnings.value.includes(item.name)}
							count={item.count}
							isDisabledOnZero={false}
						>
							{item.name}
						</CheckboxWithCount>
					)}
				/>
			</BookCatalog.Accordion>
		</BookCatalog.FiltersPanel>
	)
}

export default function Catalog(): ReactNode {
	const { isLoading } = useFetchedBooks()

	return (
		<BookCatalog
			className='categories-page__catalog'
			isLoading={isLoading}
			renderBooksSection={<BooksSection />}
			renderFiltersPanel={<FiltersPanel />}
			renderSortSelect={<SortSelect />}
		/>
	)
}
