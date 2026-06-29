import { useUpdateEffect } from '@hooks/useUpdateEffect'

export function useDebounce<ValueT>(
	value: ValueT,
	delay: number = 500,
	onDebounce?: (value: ValueT) => void,
): void {
	useUpdateEffect(() => {
		const timeout = setTimeout(() => {
			onDebounce?.(value)
		}, delay)

		return () => {
			clearTimeout(timeout)
		}
	}, [value, delay])
}
