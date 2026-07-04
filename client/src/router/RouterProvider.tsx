import { lazy } from 'react'
import {
	createBrowserRouter,
	RouterProvider as RouterProviderReact,
} from 'react-router-dom'
import {
	BOOK_DETAILS_PATH,
	CATEGORIES_PATH,
	CONTACT_PATH,
	HOME_PATH,
	SEARCH_PATH,
	USER_PROFILE_PATH,
	USER_SETTINGS_PATH,
} from '@router/routePaths.constants'
import Root from '@pages/Root/Root'
import type { ReactNode } from 'react'

const Home = lazy(() => import('@pages/Home/Home'))
const Search = lazy(() => import('@pages/Search/Search'))

const router = createBrowserRouter([
	{
		path: HOME_PATH,
		Component: Root,
		children: [
			{ index: true, Component: Home },
			{
				path: CATEGORIES_PATH,
				element: <h1>Categories</h1>,
			},
			{
				path: CONTACT_PATH,
				element: <h1>Contact</h1>,
			},
			{
				path: SEARCH_PATH,
				Component: Search,
			},
			{
				path: BOOK_DETAILS_PATH,
				element: <h1>Book details</h1>,
			},
			{
				path: USER_PROFILE_PATH,
				children: [
					{ index: true, element: <h1>User profile</h1> },
					{
						path: USER_SETTINGS_PATH,
						element: <h1>User settings</h1>,
					},
				],
			},
		],
	},
])

export default function RouterProvider(): ReactNode {
	return <RouterProviderReact router={router} />
}
