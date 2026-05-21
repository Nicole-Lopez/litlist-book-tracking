export const generateArray = <Item>(
	length: number,
	generateItem: (index: number, array: Item[]) => Item,
	onItemGenerated?: (index: number, array: Item[]) => void,
): Item[] => {
	const result = new Array<Item>(length)

	for (let i = 0; i < length; i++) {
		result[i] = generateItem(i, result)

		onItemGenerated?.(i, result)
	}

	return result
}
