import { BaseDataSource } from './baseDataSource.js'

export class BaseGraphqlDataSource extends BaseDataSource {
	protected async query<TResult, TVar = object>(
		query: string,
		variables?: TVar,
	): Promise<TResult> {
		const { data }: { data: TResult } = await this.post('', {
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ query, variables }),
		})
		return data
	}
}
