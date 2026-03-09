import {
	createBrowserRouter,
	RouterProvider as RouterProviderReact,
} from 'react-router-dom'
import { CATEGORIES_PATH, CONTACT_PATH, HOME_PATH } from '@router/routePaths.constants'
import Root from '@pages/Root/Root'
import type { ReactNode } from 'react'

const router = createBrowserRouter([
	{
		path: HOME_PATH,
		Component: Root,
		children: [
			{ index: true, element: <h1>Home</h1> },
			{
				path: CATEGORIES_PATH,
				element: <h1>Categories</h1>,
			},
			{
				path: CONTACT_PATH,
				element: <h1>Contact</h1>,
			},
		],
	},
])

export default function RouterProvider(): ReactNode {
	return <RouterProviderReact router={router} />
}
