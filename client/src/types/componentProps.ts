import type { ReactNode } from 'react'

export type PropsWithChildren<P = unknown> = P & { children: ReactNode }

export type PropsWithoutChildren<P = unknown> = Omit<P, 'children'>

export type PropsWithOptionalChildren<P = unknown> = P & {
	children?: ReactNode
}

export type PropsOnlyChildren = { children: ReactNode }

export type PropsOnlyOptionalChildren = { children?: ReactNode }
