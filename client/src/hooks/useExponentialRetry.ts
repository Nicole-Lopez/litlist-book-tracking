import { useEffect, useRef } from 'react'

export type UseExponentialRetryOptions = {
	baseDelay?: number
	maxDelay?: number
	maxAttempts?: number
	jitter?: boolean
}
const JITTER_PERCENT = 0.15 // ±15%

export function useExponentialRetry(
	asyncFn: () => Promise<void>,
	options?: UseExponentialRetryOptions,
): [() => Promise<void>] {
	const {
		baseDelay = 500,
		maxDelay = 2 * 60_000,
		maxAttempts = 10,
		jitter = true,
	} = options ?? {}

	const retryAttemptRef = useRef(0)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const isMountedRef = useRef(true)

	const execute = async (): Promise<void> => {
		try {
			await asyncFn()

			retryAttemptRef.current = 0

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		} catch {
			if (!isMountedRef.current) return

			retryAttemptRef.current += 1

			if (retryAttemptRef.current > maxAttempts) return

			let delay = Math.min(baseDelay * 2 ** retryAttemptRef.current, maxDelay)

			if (jitter) {
				const minFactor = 1 - JITTER_PERCENT
				const maxFactor = 1 + JITTER_PERCENT

				const randomFactor = minFactor + Math.random() * (maxFactor - minFactor)

				delay = delay * randomFactor
			}

			timeoutRef.current = setTimeout(() => {
				execute()
			}, delay)
		}
	}

	useEffect(() => {
		return () => {
			isMountedRef.current = false

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	return [execute]
}
