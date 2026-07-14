import { ACTION_TYPES, INITIAL_STATE } from './constants/reducer.constants'
import { sortCatalogBooks } from '@utilities/bookCatalog.utils'
import {
    filterByCategories,
    filterByPageCount,
    applyActiveFilters,
    clearFilters,
    filterByAuthors,
    filterByContentWarnings,
} from './utilities/filtersBooks.utils'
import { applySort } from './utilities/sortBooks.utils'
import type {
    CategoryCatalogAction,
    CategoryCatalogReducerState,
} from './models/reducer.models'

export default function categoryCatalogReducer(
    state: CategoryCatalogReducerState,
    action: CategoryCatalogAction,
): CategoryCatalogReducerState {
    switch (action.type) {
        case ACTION_TYPES.CATALOG_RESET: {
            return clearFilters(
                { ...state, sortInfo: { ...INITIAL_STATE.sortInfo } },
                action.payload.fetchedBooks,
            )
        }

        case ACTION_TYPES.FILTERS_CLEARED: {
            return clearFilters(state, action.payload.fetchedBooks)
        }

        case ACTION_TYPES.CATEGORIES_FILTER_UPDATED: {
            return filterByCategories(
                action.payload.category,
                state,
                action.payload.fetchedBooks,
            )
        }

        case ACTION_TYPES.AUTHORS_FILTER_UPDATED: {
            return filterByAuthors(
                action.payload.author,
                state,
                action.payload.fetchedBooks,
            )
        }

        case ACTION_TYPES.CONTENT_WARNINGS_FILTER_UPDATED: {
            return filterByContentWarnings(
                action.payload.contentWarning,
                state,
                action.payload.fetchedBooks,
            )
        }

        case ACTION_TYPES.PAGE_COUNT_FILTER_UPDATED: {
            return filterByPageCount(
                action.payload.pageCount,
                state,
                action.payload.fetchedBooks,
            )
        }

        case ACTION_TYPES.SORT_UPDATED: {
            return sortCatalogBooks({
                sort: action.payload.sort,
                defaultOption: INITIAL_STATE.sortInfo.sort,
                state,
                fetchedBooks: action.payload.fetchedBooks,
                applyActiveFilters,
                applySort,
            })
        }

        default:
            return state
    }
}
