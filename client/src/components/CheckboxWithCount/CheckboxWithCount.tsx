import CheckboxInputField from '@components/CheckboxInputField/CheckboxInputField'
import './CheckboxWithCount.scss'
import type { ReactNode } from 'react'
import type { CheckboxInputFieldProps } from '@components/CheckboxInputField/CheckboxInputField'

export type CheckboxWithCountProps = CheckboxInputFieldProps & {
	count: number
	isDisabledOnZero?: boolean
}

export default function CheckboxWithCount({
	count,
	isDisabledOnZero = true,
	children,
	disabled,
	className = '',
	...inputAttributes
}: CheckboxWithCountProps): ReactNode {
	return (
		<CheckboxInputField
			{...inputAttributes}
			className={`checkbox-with-count ${className}`}
			disabled={disabled || (isDisabledOnZero && count === 0)}
		>
			<span>
				{children}
				<span className='checkbox-with-count__count'>({count})</span>
			</span>
		</CheckboxInputField>
	)
}
