import { ONLY_NUMBERS_REGEX } from '@constants/number.constants'
import WritableInputField from '@components/WritableInputField/WritableInputField'
import type {
	InputProps,
	WritableInputFieldProps,
} from '@components/WritableInputField/WritableInputField'
import type {
	PropsWithoutChildren,
	PropsWithOptionalChildren,
} from '@customTypes/componentProps'
import type { ReactNode } from 'react'

export type NumberInputFieldProps = PropsWithOptionalChildren<
	Omit<PropsWithoutChildren<WritableInputFieldProps>, 'idLabel'> &
		Omit<InputProps, 'type' | 'id' | 'inputMode'> & {
			id: string
		}
>

export default function NumberInputField({
	id,
	label,
	isErrorDisplayed,
	classNameContainer,
	children,
	onChange,
	...inputAttributes
}: NumberInputFieldProps): ReactNode {
	return (
		<WritableInputField
			classNameContainer={classNameContainer}
			label={label}
			idLabel={id}
			isErrorDisplayed={isErrorDisplayed}
		>
			<WritableInputField.Input
				{...inputAttributes}
				id={id}
				type='text'
				inputMode='numeric'
				onChange={e => {
					if (
						ONLY_NUMBERS_REGEX.test(e.target.value) ||
						e.target.value.length === 0
					) {
						onChange?.(e)
					}
				}}
			/>
			{children}
		</WritableInputField>
	)
}
