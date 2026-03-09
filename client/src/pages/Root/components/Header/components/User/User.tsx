import { lazy } from 'react'
import type { ReactNode } from 'react'

const AuthAccessButton = lazy(
	() => import('./components/AuthAccessButton/AuthAccessButton'),
)

export default function User(): ReactNode {
	return <AuthAccessButton />
}
