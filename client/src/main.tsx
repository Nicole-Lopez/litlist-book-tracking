import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import MainLoader from '@assets/loaders/MainLoader/MainLoader'
import ThemeProvider from '@contexts/ThemeContext/ThemeProvider'
import RouterProvider from '@router/RouterProvider'
import '@styles/global.scss'
import type { ReactNode } from 'react'

function App(): ReactNode {
	return (
		<ThemeProvider>
			<Suspense fallback={<MainLoader />}>
				<RouterProvider />
			</Suspense>
		</ThemeProvider>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
