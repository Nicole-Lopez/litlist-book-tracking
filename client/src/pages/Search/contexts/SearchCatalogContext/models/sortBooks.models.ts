import type { ArrayElement } from '@customTypes/customUtilityTypes'
import type { BookSortInfo } from '@models/bookCatalog.models'
import type { SEARCH_CATALOG_SORT_OPTIONS } from '@pages/Search/constants/bookCatalog.constants'

export type SearchCatalogSort = ArrayElement<typeof SEARCH_CATALOG_SORT_OPTIONS>

export type SearchCatalogSortInfo = BookSortInfo<SearchCatalogSort>
