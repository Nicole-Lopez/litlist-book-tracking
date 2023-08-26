export const arrayIsNotEmpty = <T>(array: T[] | undefined): boolean => {
	return Array.isArray(array) && array !== undefined && array.length !== 0
}
