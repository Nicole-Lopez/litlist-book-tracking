import './CheckableInputField.scss'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckableInputFieldProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> & {
	type: 'radio' | 'checkbox'
}

export default function CheckableInputField({
	className = '',
	children,
	...inputAttributes
}: CheckableInputFieldProps): ReactNode {
	return (
		<label
			className={`checkable-input-field ${
				inputAttributes?.disabled ? 'checkable-input-field--disabled' : ''
			} ${className}`}
		>
			<input {...inputAttributes} />

			{children}
		</label>
	)
}
