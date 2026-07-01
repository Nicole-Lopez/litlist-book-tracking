export const generateArray = <ItemT>(
	length: number,
	generateItem: (index: number, array: ItemT[]) => ItemT,
	onItemGenerated?: (index: number, array: ItemT[]) => void,
): ItemT[] => {
	const result = new Array<ItemT>(length)

	for (let i = 0; i < length; i++) {
		result[i] = generateItem(i, result)

		onItemGenerated?.(i, result)
	}

	return result
}

export const removeFirstMatch = <ItemT>(
	items: ItemT[],
	isMatch: (item: ItemT) => boolean,
): ItemT[] => {
	for (let i = 0; i < items.length; i++) {
		if (isMatch(items[i]!)) {
			return [...items.slice(0, i), ...items.slice(i + 1)]
		}
	}

	return items
}

export const isArrayIncludingAllStrings = (
	items: string[],
	matchingValues: string[],
): boolean => items.length !== 0 && matchingValues.every(value => items.includes(value))
