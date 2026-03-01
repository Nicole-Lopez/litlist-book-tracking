import {
	createBrowserRouter,
	RouterProvider as RouterProviderReact,
} from 'react-router-dom'
import { HOME_PATH } from '@router/routePaths.constants'
import type { ReactNode } from 'react'

const router = createBrowserRouter([
	{
		path: HOME_PATH,
		element: <p>Home</p>,
	},
])

export default function RouterProvider(): ReactNode {
	return <RouterProviderReact router={router} />
}
