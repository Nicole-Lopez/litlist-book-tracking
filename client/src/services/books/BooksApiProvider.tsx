import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { RetryLink } from '@apollo/client/link/retry'
import type { ReactNode } from 'react'
import type { PropsOnlyChildren } from '@customTypes/componentProps'

const retryLink = new RetryLink({
	delay: {
		initial: 800,
		max: 4_000,
		jitter: true,
	},
	attempts: {
		max: 30,
	},
})

const httpLink = new HttpLink({ uri: import.meta.env.VITE_BOOKS_SERVER })

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([retryLink, httpLink]),
})

export default function BooksApiProvider({ children }: PropsOnlyChildren): ReactNode {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
