import { GraphQLError } from 'graphql'

type HttpGraphQLErrorExtensions = {
	url: string
	status: number
	statusText: string
}

export class HttpGraphQLError extends GraphQLError {
	declare extensions: HttpGraphQLErrorExtensions

	constructor(response: HttpGraphQLErrorExtensions) {
		const extensions: HttpGraphQLErrorExtensions = {
			url: response.url,
			status: response.status,
			statusText: response.statusText,
		}

		super(`${response.status}: ${response.statusText}`, { extensions })
	}
}
