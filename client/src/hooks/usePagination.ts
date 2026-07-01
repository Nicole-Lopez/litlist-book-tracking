import { useState } from 'react'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import type { Dispatch, SetStateAction } from 'react'

export type UsePaginationReturn<Item> = {
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	resetPage: () => void
	paginatedItems: Item[]
	endIndex: number
	startIndex: number
	itemsPerPage: number
}

export type UsePaginationOptions = {
	initialPage?: number
	isResetOnItemsChange?: boolean
}

export function usePagination<Item>(
	items: Item[],
	itemsPerPage: number,
	options?: UsePaginationOptions,
): UsePaginationReturn<Item> {
	const { initialPage = 1, isResetOnItemsChange = true } = options ?? {}
	const [currentPage, setCurrentPage] = useState(initialPage)
	const endIndex = currentPage * itemsPerPage
	const startIndex = endIndex - itemsPerPage

	const resetPage = (): void => {
		setCurrentPage(initialPage)
	}

	useUpdateEffect(() => {
		if (isResetOnItemsChange) {
			resetPage()
		}
	}, [items])

	return {
		currentPage,
		setCurrentPage,
		resetPage,
		startIndex,
		endIndex,
		paginatedItems: items.slice(startIndex, endIndex),
		itemsPerPage,
	}
}
