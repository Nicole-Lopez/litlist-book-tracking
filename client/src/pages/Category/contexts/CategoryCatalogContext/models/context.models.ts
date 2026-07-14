import type { Dispatch } from 'react'
import type { CategoryCatalogAction } from './reducer.models'
import type { CategoryCatalogFiltersInfo } from './filtersBooks.models'
import type { CategoryCatalogSortInfo } from './sortBooks.models'
import type { BookPreview } from '@models/book.models'

export type BooksContextValue = BookPreview[]
export type SortContextValue = CategoryCatalogSortInfo
export type FiltersContextValue = CategoryCatalogFiltersInfo
export type CategoryCatalogActionsContextValue = Dispatch<CategoryCatalogAction>
