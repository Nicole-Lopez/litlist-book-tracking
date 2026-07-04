import { useTranslation } from 'react-i18next'
import { useFetchedBooks } from '@pages/Search/hooks/useFetchedBooks'
import {
	useBooksContext,
	useFiltersContext,
	useSortContext,
	useSearchCatalogActionsContext,
} from '@pages/Search/contexts/SearchCatalogContext/searchCatalogContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { SEARCH_BOOKS_ROOT } from '@services/internationalization/roots/search.constants'
import { FILTERS_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import {
	AUTHORS_ACTIVE_FILTER_KEY,
	CATEGORIES_ACTIVE_FILTER_KEY,
	CONTENT_WARNINGS_ACTIVE_FILTER_KEY,
	PAGE_COUNT_RANGE_ACTIVE_FILTER_KEY,
} from '@constants/bookCatalog.constants'
import {
	BOOK_SEARCH_MATCHES,
	SEARCH_CATALOG_SORT_OPTIONS,
	SEARCH_TYPE_ACTIVE_FILTER_KEY,
	SEARCH_TYPE_FILTER_INACTIVE_OPTION,
} from '@pages/Search/constants/bookCatalog.constants'
import BookCatalog from '@components/BookCatalog/BookCatalog'
import RadioGroupInputField from '@components/RadioGroupInputField/RadioGroupInputField'
import PageCountBookFilter from '@components/PageCountBookFilter/PageCountBookFilter'
import SearchableList from '@components/SearchableList/SearchableList'
import CheckboxWithCount from '@components/CheckboxWithCount/CheckboxWithCount'
import type { ReactNode } from 'react'
import type { BookSearchMatch } from '@pages/Search/models/searchBook.models'

function BooksSection(): ReactNode {
	const books = useBooksContext()
	const { isLoading } = useFetchedBooks()

	return <BookCatalog.BooksSection books={books} isLoading={isLoading} />
}

function SortSelect(): ReactNode {
	const { sort } = useSortContext()
	const { applySort } = useSearchCatalogActionsContext()

	return (
		<BookCatalog.SortSelect
			options={SEARCH_CATALOG_SORT_OPTIONS}
			onSelect={applySort}
			value={sort}
		/>
	)
}

const SEARCH_TYPE_ROOT = {
	[BOOK_SEARCH_MATCHES.title]: SEARCH_BOOKS_ROOT.searchIn.options.title,
	[BOOK_SEARCH_MATCHES.author]: SEARCH_BOOKS_ROOT.searchIn.options.author,
	[BOOK_SEARCH_MATCHES.isbn]: SEARCH_BOOKS_ROOT.searchIn.options.isbn,
}

function FiltersPanel(): ReactNode {
	const { t } = useTranslation([TRANSLATIONS_NS.sortAndFilter, TRANSLATIONS_NS.search])
	const {
		clearFilters,
		applyPageCountFilter,
		applyCategoriesFilter,
		applyAuthorsFilter,
		applyContentWarningsFilter,
		applySearchTypeFilter,
		removeSearchTypeFilter,
		removeCategoryFilter,
		removeAuthorFilter,
		removeContentWarningFilter,
		removePageCountRangeFilter,
		removeUnspecifiedPageCountFilter,
	} = useSearchCatalogActionsContext()
	const { filters, activeFilters } = useFiltersContext()
	const { isLoading } = useFetchedBooks()

	return (
		<BookCatalog.FiltersPanel
			activeFilterList={activeFilters.map(activeFilter => {
				if (activeFilter.key === SEARCH_TYPE_ACTIVE_FILTER_KEY) {
					return {
						label: `${t(SEARCH_BOOKS_ROOT.searchIn.label, {
							ns: TRANSLATIONS_NS.search,
						})}: ${t(
							SEARCH_TYPE_ROOT[activeFilter.value as BookSearchMatch],
							{ ns: TRANSLATIONS_NS.search },
						)}`,
						onRemove: removeSearchTypeFilter,
					}
				}

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
				label={t(SEARCH_BOOKS_ROOT.searchIn.label, {
					ns: TRANSLATIONS_NS.search,
				})}
				isForceCollapsed={isLoading}
			>
				<RadioGroupInputField
					name='filter_type_search'
					onChange={applySearchTypeFilter}
					selectedValue={filters.searchType.value}
				>
					<RadioGroupInputField.RadioInput
						value={SEARCH_TYPE_FILTER_INACTIVE_OPTION}
					>
						{t(SEARCH_BOOKS_ROOT.searchIn.options.anywhere, {
							ns: TRANSLATIONS_NS.search,
						})}
					</RadioGroupInputField.RadioInput>

					<RadioGroupInputField.RadioInput value={BOOK_SEARCH_MATCHES.title}>
						{t(SEARCH_BOOKS_ROOT.searchIn.options.title, {
							ns: TRANSLATIONS_NS.search,
						})}
					</RadioGroupInputField.RadioInput>

					<RadioGroupInputField.RadioInput value={BOOK_SEARCH_MATCHES.author}>
						{t(SEARCH_BOOKS_ROOT.searchIn.options.author, {
							ns: TRANSLATIONS_NS.search,
						})}
					</RadioGroupInputField.RadioInput>

					<RadioGroupInputField.RadioInput value={BOOK_SEARCH_MATCHES.isbn}>
						{t(SEARCH_BOOKS_ROOT.searchIn.options.isbn, {
							ns: TRANSLATIONS_NS.search,
						})}
					</RadioGroupInputField.RadioInput>
				</RadioGroupInputField>
			</BookCatalog.Accordion>

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
					items={filters.categories.availableCounts}
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
			isLoading={isLoading}
			renderBooksSection={<BooksSection />}
			renderFiltersPanel={<FiltersPanel />}
			renderSortSelect={<SortSelect />}
		/>
	)
}
