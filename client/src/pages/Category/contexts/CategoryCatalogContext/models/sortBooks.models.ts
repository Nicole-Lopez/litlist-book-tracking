import type { ArrayElement } from '@customTypes/customUtilityTypes'
import type { BookSortInfo } from '@models/bookCatalog.models'
import type { CATEGORY_CATALOG_SORT_OPTIONS } from '@pages/Category/constants/bookCatalog.constants'

export type CategoryCatalogSort = ArrayElement<typeof CATEGORY_CATALOG_SORT_OPTIONS>

export type CategoryCatalogSortInfo = BookSortInfo<CategoryCatalogSort>
