export const getRandomNumber = (max: number): number =>
	Math.floor(Math.random() * (max + 1))

export const roundToDecimals = (value: number, decimals: number = 2): number => {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
}

export const isAtLeast = (value: number, min: number): boolean => value >= min

export const isAtMost = (value: number, max: number): boolean => value <= max

export const isInRange = (value: number, min: number, max: number): boolean =>
	isAtLeast(value, min) && isAtMost(value, max)
