import './InputFieldHelper.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type InputFieldHelperProps = PropsWithChildren<{
	id?: string
	className?: string
	isErrorHelper?: boolean
}>

export default function InputFieldHelper({
	className = '',
	isErrorHelper,
	id,
	children,
}: InputFieldHelperProps): ReactNode {
	if (isErrorHelper) {
		return (
			<span
				id={id}
				className={`input-field-helper input-field-helper--error ${className}`}
			>
				&#9888; {children}
			</span>
		)
	}

	return (
		<span id={id} className={`input-field-helper ${className}`}>
			{children}
		</span>
	)
}
