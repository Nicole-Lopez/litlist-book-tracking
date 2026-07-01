export const filterEffect = <ItemT>(
	items: ItemT[],
	isMatch: (item: ItemT) => boolean,
	onMatch: (item: ItemT) => void,
): ItemT[] => {
	return items.filter(item => {
		if (isMatch(item)) {
			onMatch(item)
			return true
		}
		return false
	})
}
