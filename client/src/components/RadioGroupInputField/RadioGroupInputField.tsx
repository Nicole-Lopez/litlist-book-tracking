import { Children, cloneElement } from 'react'
import CheckableInputField from '@components/CheckableInputField/CheckableInputField'
import './RadioGroupInputField.scss'
import type { ReactElement, ChangeEvent, ReactNode } from 'react'
import type { CheckableInputFieldProps } from '@components/CheckableInputField/CheckableInputField'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type RadioGroupInputFieldProps<Value extends string> = PropsWithChildren<{
	onChange: (value: Value, e: ChangeEvent<HTMLInputElement>) => void
	selectedValue?: Value
	name: string
}>

export default function RadioGroupInputField<Value extends string>({
	children,
	onChange,
	selectedValue,
	name,
}: RadioGroupInputFieldProps<Value>): ReactNode {
	return (
		<ul className='radio-group-input-field'>
			{Children.map(children as ReactElement<RadioInputProps>, child => (
				<li className='radio-group-input-field__option'>
					{cloneElement(child, {
						name,
						onChange: (e: ChangeEvent<HTMLInputElement>) => {
							child.props.onChange?.(e)

							onChange(e.target.value as Value, e)
						},
						checked:
							child.props.checked || child.props.value === selectedValue,
					})}
				</li>
			))}
		</ul>
	)
}

export type RadioInputProps = Omit<CheckableInputFieldProps, 'type'>

function RadioInput(props: RadioInputProps): ReactNode {
	return <CheckableInputField {...props} type='radio' />
}

RadioGroupInputField.RadioInput = RadioInput
