import { useState } from 'react'

export function useLocalStorage<StoredValue>(
	key: string,
	initialValue: StoredValue,
): [StoredValue, (value: StoredValue) => void] {
	const [storedValue, setStoredValue] = useState<StoredValue>(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item !== null ? JSON.parse(item) : initialValue
		} catch {
			return initialValue
		}
	})

	const setValue = (value: StoredValue): void => {
		try {
			setStoredValue(value)
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}

	return [storedValue, setValue]
}
