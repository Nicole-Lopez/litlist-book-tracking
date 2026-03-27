import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import './InputRequirementList.scss'

export type InputRequirementListProps = PropsWithChildren<{
	id?: string
	className?: string
}>

export default function InputRequirementList({
	id,
	children,
	className = '',
}: InputRequirementListProps): ReactNode {
	return (
		<ul id={id} className={`input-requirement-list ${className}`}>
			{children}
		</ul>
	)
}

export type RequirementProps = PropsWithChildren<{
	isCompleted?: boolean
}>

function Requirement({ children, isCompleted }: RequirementProps): ReactNode {
	return (
		<li
			className={`input-requirement-list__requirement ${
				isCompleted ? 'input-requirement-list__requirement--completed' : ''
			}`}
		>
			{children}
		</li>
	)
}

InputRequirementList.Requirement = Requirement
