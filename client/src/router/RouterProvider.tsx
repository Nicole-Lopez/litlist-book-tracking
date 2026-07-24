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
import MainLoader from '@assets/loaders/MainLoader/MainLoader'
import Root from '@pages/Root/Root'
import NotFound from '@pages/NotFound/NotFound'
import type { ReactNode } from 'react'

const Home = lazy(() => import('@pages/Home/Home'))

const router = createBrowserRouter([
	{
		path: HOME_PATH,
		Component: Root,
		HydrateFallback: MainLoader,
		children: [
			{
				ErrorBoundary: NotFound,
				children: [
					{ index: true, Component: Home },
					{
						path: CATEGORIES_PATH,
						lazy: async () => {
							const [componentModule, routeModule] = await Promise.all([
								import('@pages/Category/Category'),
								import('@pages/Category/categoryRoute'),
							])

							return {
								Component: componentModule.default,
								loader: routeModule.categoryLoader,
							}
						},
					},
					{
						path: CONTACT_PATH,
						element: <h1>Contact</h1>,
					},
					{
						path: SEARCH_PATH,
						lazy: async () => {
							const [componentModule, routeModule] = await Promise.all([
								import('@pages/Search/Search'),
								import('@pages/Search/searchRoute'),
							])

							return {
								Component: componentModule.default,
								loader: routeModule.searchLoader,
							}
						},
					},
					{
						path: BOOK_DETAILS_PATH,
						lazy: {
							Component: async () => {
								return (await import('@pages/BookDetails/BookDetails'))
									.default
							},
						},
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
					{ path: '*', Component: NotFound },
				],
			},
		],
	},
])

export default function RouterProvider(): ReactNode {
	return <RouterProviderReact router={router} />
}
