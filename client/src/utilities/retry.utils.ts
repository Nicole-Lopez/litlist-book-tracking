export const sleep = (ms: number, signal?: AbortSignal): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			return reject(new DOMException('Aborted', 'AbortError'))
		}

		const handleAbort = (): void => {
			clearTimeout(timeoutId)
			reject(new DOMException('Aborted', 'AbortError'))
		}

		const timeoutId = setTimeout(() => {
			signal?.removeEventListener('abort', handleAbort)
			resolve()
		}, ms)

		signal?.addEventListener('abort', handleAbort, { once: true })
	})
}

const JITTER_PERCENT = 0.15 // ±15%

export const fetchWithRetry = async <ResponseT, ErrorT = unknown>(
	onFetch: () => Promise<ResponseT>,
	options: {
		baseDelay?: number
		maxDelay?: number
		maxAttempts?: number
		signal?: AbortSignal
		isRetryableError?: (error: ErrorT) => boolean
	} = {},
): Promise<ResponseT> => {
	const {
		baseDelay = 800,
		maxDelay = 4_000,
		maxAttempts = 30,
		signal,
		isRetryableError = () => true,
	} = options

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

			return await onFetch()
		} catch (err) {
			const error = err as ErrorT

			if (
				(error instanceof DOMException && error.name === 'AbortError') ||
				signal?.aborted
			)
				throw error

			if (!isRetryableError(error) || attempt >= maxAttempts) throw error

			const minFactor = 1 - JITTER_PERCENT
			const maxFactor = 1 + JITTER_PERCENT
			const randomFactor = minFactor + Math.random() * (maxFactor - minFactor)

			const delay = Math.min(baseDelay * 2 ** attempt, maxDelay) * randomFactor

			// console.log(`Retry attempt ${attempt} in ${delay}ms`)

			await sleep(delay, signal)
		}
	}

	throw new Error('Max retry attempts reached')
}
