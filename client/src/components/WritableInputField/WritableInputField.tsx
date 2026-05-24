import { isBlankString } from '@utilities/string.utils'
import './WritableInputField.scss'
import type {
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
} from 'react'
import type { InputFieldBaseProps, PropsWithChildren } from '@customTypes/componentProps'
import type { WithRequired } from '@customTypes/customUtilityTypes'

export type WritableInputFieldProps = PropsWithChildren<{
	idLabel: string
	classNameContainer?: string
}> &
	Pick<InputFieldBaseProps, 'label' | 'isErrorDisplayed'>

export default function WritableInputField({
	children,
	label,
	idLabel,
	isErrorDisplayed,
	classNameContainer = '',
}: WritableInputFieldProps): ReactNode {
	return (
		<div
			className={`writable-input-field ${
				isErrorDisplayed ? 'writable-input-field--error' : ''
			} ${classNameContainer}`}
		>
			{children}

			<label htmlFor={idLabel} className='writable-input-field__label'>
				{label}
			</label>
		</div>
	)
}

export type InputProps = Pick<InputFieldBaseProps, 'onValidationError' | 'isNonEmpty'> &
	WithRequired<
		Omit<
			DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
			'placeholder' | 'children'
		>,
		'id' | 'name'
	>

function Input({
	className = '',
	onValidationError,
	onChange,
	isNonEmpty = false,
	...inputAttributes
}: InputProps): ReactNode {
	return (
		<input
			{...inputAttributes}
			className={`writable-input-field__input ${className}`}
			placeholder=' '
			onChange={e => {
				onChange?.(e)
				onValidationError?.(
					isNonEmpty && isBlankString(e.target.value),
					e.target.value,
					e.target.name,
				)
			}}
		/>
	)
}

export type TextareaProps = Pick<
	InputFieldBaseProps,
	'onValidationError' | 'isNonEmpty'
> &
	WithRequired<
		Omit<
			DetailedHTMLProps<
				TextareaHTMLAttributes<HTMLTextAreaElement>,
				HTMLTextAreaElement
			>,
			'placeholder'
		>,
		'id' | 'name'
	>

function Textarea({
	className = '',
	onValidationError,
	onChange,
	isNonEmpty = false,
	...textareaAttributes
}: TextareaProps): ReactNode {
	return (
		<textarea
			{...textareaAttributes}
			className={`writable-input-field__input writable-input-field__input--textarea ${className}`}
			placeholder=' '
			onChange={e => {
				onChange?.(e)
				onValidationError?.(
					isNonEmpty && isBlankString(e.target.value),
					e.target.value,
					e.target.name,
				)
			}}
		/>
	)
}

WritableInputField.Input = Input
WritableInputField.Textarea = Textarea
