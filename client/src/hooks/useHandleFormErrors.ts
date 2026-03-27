import { useState } from 'react'
import { mapValues } from '@utilities/object.utils'
import type { Dispatch, SetStateAction } from 'react'

export type UseHandleFormErrorsReturn<FormErrorsT> = {
	formErrors: FormErrorsT
	setFormErrors: Dispatch<SetStateAction<FormErrorsT>>
	clearFormErrors: () => void
	onFormValidation: (isError: boolean, value: string, name: string) => void
	isSomeFieldError: boolean
}

export function useHandleFormErrors<FormErrorsT extends Record<string, boolean>>(
	initialFormErrors: FormErrorsT,
): UseHandleFormErrorsReturn<FormErrorsT> {
	const [formErrors, setFormErrors] = useState(initialFormErrors)

	const clearFormErrors = (): void => {
		setFormErrors(formErrors => mapValues(formErrors, () => false) as FormErrorsT)
	}

	const onFormValidation = (isError: boolean, _: string, name: string): void => {
		setFormErrors(formErrors => ({
			...formErrors,
			[name]: isError,
		}))
	}

	const isSomeFieldError = (): boolean => {
		for (const key in formErrors) {
			if (formErrors[key]) return true
		}
		return false
	}

	return {
		formErrors,
		setFormErrors,
		clearFormErrors,
		onFormValidation,
		isSomeFieldError: isSomeFieldError(),
	}
}
