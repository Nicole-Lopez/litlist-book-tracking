import CheckableInputField from '@components/CheckableInputField/CheckableInputField'
import './CheckboxInputField.scss'
import type { ReactNode } from 'react'
import type { CheckableInputFieldProps } from '@components/CheckableInputField/CheckableInputField'

export type CheckboxInputFieldProps = Omit<CheckableInputFieldProps, 'type'>

export default function CheckboxInputField({
	className = '',
	...props
}: CheckboxInputFieldProps): ReactNode {
	return (
		<CheckableInputField
			{...props}
			className={`checkbox-input-field ${className}`}
			type='checkbox'
		/>
	)
}
