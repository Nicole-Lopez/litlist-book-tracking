import { UNICODE_LETTER_REGEX } from '@constants/strings.constants'
import { SORT_OPTIONS } from '@constants/sort.constants'
import { removeDiacritics } from '@utilities/string.utils'

const compareNumbers = (
	aValue: number | undefined | null,
	bValue: number | undefined | null,
	sortOrder: (a: number, b: number) => number,
): number => {
	const aIsNumber = !isNaN(aValue ?? NaN)
	const bIsNumber = !isNaN(bValue ?? NaN)

	if (!aIsNumber && !bIsNumber) return 0
	if (!aIsNumber) return 1
	if (!bIsNumber) return -1

	return sortOrder(aValue!, bValue!)
}

export const sortObjectsByNumberAsc = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, number>>,
>(
	items: Item[],
	sortKey: SortKey,
): Item[] => {
	return [...items].sort((a, b) =>
		compareNumbers(a[sortKey], b[sortKey], (aValue, bValue) => aValue - bValue),
	)
}

export const sortObjectsByNumberDesc = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, number>>,
>(
	items: Item[],
	sortKey: SortKey,
): Item[] => {
	return [...items].sort((a, b) =>
		compareNumbers(a[sortKey], b[sortKey], (aValue, bValue) => bValue - aValue),
	)
}

const collator = new Intl.Collator(undefined, {
	sensitivity: 'base',
	numeric: true,
	ignorePunctuation: true,
	localeMatcher: 'best fit',
})

const compareStrings = (
	aValue: string | undefined | null,
	bValue: string | undefined | null,
	sortOrder: (a: string, b: string) => number,
): number => {
	const aChars = (aValue ?? '').match(UNICODE_LETTER_REGEX)
	const bChars = (bValue ?? '').match(UNICODE_LETTER_REGEX)

	const aIsAlphabetic = aChars !== null
	const bIsAlphabetic = bChars !== null

	if (aIsAlphabetic && bIsAlphabetic) {
		const maxIndex = Math.min(aChars.length, bChars.length)

		for (let i = 0; i < maxIndex; i++) {
			const aChar = aChars[i]!
			const bChar = bChars[i]!

			if (
				removeDiacritics(aChar.toLowerCase()) !==
				removeDiacritics(bChar.toLowerCase())
			)
				return sortOrder(aChar, bChar)
		}
	}

	const aIsNumber = aValue && !isNaN(+aValue)
	const bIsNumber = bValue && !isNaN(+bValue)

	if ((aIsAlphabetic && bIsAlphabetic) || (aIsNumber && bIsNumber)) {
		return sortOrder(aValue!, bValue!)
	}

	if (bIsAlphabetic || bIsNumber) return 1

	return -1
}

export const sortObjectsByStringAsc = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, string>>,
>(
	items: Item[],
	sortKey: SortKey,
): Item[] => {
	return [...items].sort((a, b) =>
		compareStrings(a[sortKey], b[sortKey], (aValue, bValue) =>
			collator.compare(aValue, bValue),
		),
	)
}

export const sortObjectsByStringDesc = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, string>>,
>(
	items: Item[],
	sortKey: SortKey,
): Item[] => {
	return [...items].sort((a, b) =>
		compareStrings(a[sortKey], b[sortKey], (aValue, bValue) =>
			collator.compare(bValue, aValue),
		),
	)
}

export const sortObjectsByPageCount = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, number>>,
>(
	items: Item[],
	sortKey: SortKey,
	sort: typeof SORT_OPTIONS.mostPages | typeof SORT_OPTIONS.leastPages,
): Item[] => {
	return sort === SORT_OPTIONS.mostPages
		? sortObjectsByNumberDesc(items, sortKey)
		: sortObjectsByNumberAsc(items, sortKey)
}

export const sortObjectsByTitle = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, string>>,
>(
	items: Item[],
	sortKey: SortKey,
	sort: typeof SORT_OPTIONS.titleAZ | typeof SORT_OPTIONS.titleZA,
): Item[] => {
	return sort === SORT_OPTIONS.titleAZ
		? sortObjectsByStringAsc(items, sortKey)
		: sortObjectsByStringDesc(items, sortKey)
}

export const sortObjectsByTime = <
	SortKey extends string,
	Item extends Partial<Record<SortKey, number>>,
>(
	items: Item[],
	sortKey: SortKey,
	sort:
		| typeof SORT_OPTIONS.latest
		| typeof SORT_OPTIONS.oldest
		| typeof SORT_OPTIONS.latestUpdated
		| typeof SORT_OPTIONS.oldestUpdated
		| typeof SORT_OPTIONS.latestSaved
		| typeof SORT_OPTIONS.oldestSaved,
): Item[] => {
	if (
		sort === SORT_OPTIONS.latest ||
		sort === SORT_OPTIONS.latestUpdated ||
		sort === SORT_OPTIONS.latestSaved
	) {
		return sortObjectsByNumberDesc(items, sortKey)
	}

	return sortObjectsByNumberAsc(items, sortKey)
}
