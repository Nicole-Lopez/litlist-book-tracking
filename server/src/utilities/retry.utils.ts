import type { HttpGraphQLError } from './errors.utils.js'

export const sleep = (ms: number): Promise<void> =>
	new Promise(res => setTimeout(res, ms))

const RETRYABLE_STATUSES = [408, 429, 500, 502, 503, 504]
export const isRetryableError = (errorStatus: number): boolean => {
	return RETRYABLE_STATUSES.includes(errorStatus)
}

const JITTER_PERCENT = 0.15 // ±15%

export const fetchWithRetry = async <ResponseT>(
	onFetch: () => Promise<ResponseT>,
	options: {
		baseDelay?: number
		maxDelay?: number
		maxAttempts?: number
	} = {},
): Promise<ResponseT> => {
	const { baseDelay = 800, maxDelay = 4_000, maxAttempts = 30 } = options

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await onFetch()
		} catch (err) {
			const error = err as HttpGraphQLError

			if (!isRetryableError(error.extensions.status) || attempt > maxAttempts) {
				throw error
			}

			const minFactor = 1 - JITTER_PERCENT
			const maxFactor = 1 + JITTER_PERCENT
			const randomFactor = minFactor + Math.random() * (maxFactor - minFactor)

			const delay = Math.min(baseDelay * 2 ** attempt, maxDelay) * randomFactor

			// console.log(`Retry attempt ${attempt} in ${delay}ms`)

			await sleep(delay)
		}
	}

	throw new Error()
}
