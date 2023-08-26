import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import dotenv from 'dotenv'
import resolvers from '@resolvers/index.js'
import { BestSellersAPI } from '@dataSources/BestSellersAPI.js'
import { BooksAPI } from '@dataSources/BooksAPI.js'
import { CategoriesAPI } from '@dataSources/CategoriesAPI.js'

const typeDefs = readFileSync('src/schema/schema.graphql', {
	encoding: 'utf-8',
})
dotenv.config()

export interface ContextServer {
	dataSources: {
		bestSellersAPI: BestSellersAPI
		booksAPI: BooksAPI
		categoriesAPI: CategoriesAPI
	}
}

const server = new ApolloServer<ContextServer>({
	typeDefs,
	resolvers,
})

const { url } = await startStandaloneServer(server, {
	context: async () => {
		const { cache } = server
		return {
			dataSources: {
				bestSellersAPI: new BestSellersAPI({ cache }),
				booksAPI: new BooksAPI({ cache }),
				categoriesAPI: new CategoriesAPI({ cache }),
			},
		}
	},

	listen: { port: Number(process.env.PORT) },
})

console.log(`Server ready at: ${url}`)
