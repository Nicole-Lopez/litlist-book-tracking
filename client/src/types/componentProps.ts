import type { ReactNode } from 'react'
import type { Prettify } from '@customTypes/customUtilityTypes'

export type PropsWithChildren<P = unknown> = Prettify<P & { children: ReactNode }>

export type PropsWithoutChildren<P = unknown> = Prettify<Omit<P, 'children'>>

export type PropsWithOptionalChildren<P = unknown> = Prettify<
	P & {
		children?: ReactNode
	}
>

export type PropsOnlyChildren = { children: ReactNode }

export type PropsOnlyOptionalChildren = { children?: ReactNode }

export type InputFieldBaseProps = {
	label: string
	isErrorDisplayed?: boolean
	onValidationError?: (isError: boolean, value: string, name: string) => void
	isNonEmpty?: boolean
}
