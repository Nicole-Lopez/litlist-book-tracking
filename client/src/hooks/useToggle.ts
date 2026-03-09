import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function useToggle(
	initialValue: boolean = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
	const [value, setValue] = useState(initialValue)

	const toggle = (): void => {
		setValue(x => !x)
	}

	return [value, toggle, setValue]
}
