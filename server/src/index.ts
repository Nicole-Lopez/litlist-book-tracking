import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { readFileSync } from 'fs'
import resolvers from '@resolvers/index.js'
import { BestSellersListDataSource } from '@dataSources/bestSellersList/bestSellersList.dataSource.js'
import { BookDataSource } from '@dataSources/book/book.dataSource.js'

process.loadEnvFile()

const typeDefs = readFileSync('src/schema/schema.graphql', {
	encoding: 'utf-8',
})

export type ContextServer = {
	dataSources: {
		bestSellersListApi: BestSellersListDataSource
		bookApi: BookDataSource
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
					bestSellersListApi: new BestSellersListDataSource({ cache }),
					bookApi: new BookDataSource({ cache }),
				},
			}
		},
	}),
)

await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
console.log(`Server ready at: http://localhost:${process.env.PORT}/graphql`)
