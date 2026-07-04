import type { Dispatch } from 'react'
import type { SearchBookPreview } from '@pages/Search/models/searchBook.models'
import type { SearchCatalogFiltersInfo } from './filtersBooks.models'
import type { SearchCatalogSortInfo } from './sortBooks.models'
import type { SearchCatalogAction } from './reducer.models'

export type BooksContextValue = SearchBookPreview[]
export type SortContextValue = SearchCatalogSortInfo
export type FiltersContextValue = SearchCatalogFiltersInfo
export type SearchCatalogActionsContextValue = Dispatch<SearchCatalogAction>
