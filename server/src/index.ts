import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { readFileSync } from 'fs'
import resolvers from '@resolvers/index.js'
import { BestSellersAPI } from '@dataSources/BestSellersAPI.js'
import { BooksAPI } from '@dataSources/BooksAPI.js'
import { CategoriesAPI } from '@dataSources/CategoriesAPI.js'

process.loadEnvFile()

const typeDefs = readFileSync('src/schema/schema.graphql', {
	encoding: 'utf-8',
})

export type ContextServer = {
	dataSources: {
		bestSellersAPI: BestSellersAPI
		booksAPI: BooksAPI
		categoriesAPI: CategoriesAPI
	}
}

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer<ContextServer>({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
	'/graphql',
	cors<cors.CorsRequest>(),
	express.json(),
	expressMiddleware(server, {
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
	}),
)

await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
console.log(`Server ready at: http://localhost:${process.env.PORT}/graphql`)
