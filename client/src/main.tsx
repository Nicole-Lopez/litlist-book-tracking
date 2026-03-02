import { createRoot } from 'react-dom/client'
import RouterProvider from '@router/RouterProvider'
import '@styles/global.scss'
import type { ReactNode } from 'react'

function App(): ReactNode {
	return <RouterProvider />
}

createRoot(document.getElementById('root')!).render(<App />)
