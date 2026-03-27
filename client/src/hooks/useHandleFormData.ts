import { useState } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

export type UseHandleFormDataReturn<FormDataT> = {
	formData: FormDataT
	setFormData: Dispatch<SetStateAction<FormDataT>>
	clearFormData: () => void
	onChangeFormValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	onChangeFormChecked: (e: ChangeEvent<HTMLInputElement>) => void
	isSomeFieldEmpty: boolean
}

export type UseHandleFormDataOptions<FormDataT> = {
	emptyFormData?: FormDataT
}

export function useHandleFormData<FormDataT extends Record<string, unknown>>(
	initialFormData: FormDataT,
	options?: UseHandleFormDataOptions<FormDataT>,
): UseHandleFormDataReturn<FormDataT> {
	const [formData, setFormData] = useState(initialFormData)

	const clearFormData = (): void => {
		setFormData(options?.emptyFormData ?? initialFormData)
	}

	const onChangeFormValue = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		setFormData(formData => ({
			...formData,
			[e.target.name]: e.target.value,
		}))
	}

	const onChangeFormChecked = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormData(formData => ({
			...formData,
			[e.target.name]: e.target.checked,
		}))
	}

	const isSomeFieldEmpty = (): boolean => {
		const emptyFormReference = options?.emptyFormData ?? initialFormData

		for (const key in formData) {
			if (JSON.stringify(formData[key]) === JSON.stringify(emptyFormReference[key]))
				return true
		}

		return false
	}

	return {
		formData,
		setFormData,
		clearFormData,
		onChangeFormValue,
		onChangeFormChecked,
		isSomeFieldEmpty: isSomeFieldEmpty(),
	}
}
