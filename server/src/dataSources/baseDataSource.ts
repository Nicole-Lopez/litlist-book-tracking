import { RESTDataSource } from '@apollo/datasource-rest'
import { HttpGraphQLError } from '@utilities/errors.utils.js'
import { fetchWithRetry } from '@utilities/retry.utils.js'
import type {
	CacheOptions,
	DataSourceFetchResult,
	GetRequest,
	PostRequest,
} from '@apollo/datasource-rest'

export class BaseDataSource extends RESTDataSource {
	protected override async errorFromResponse({
		response,
	}: {
		response: DataSourceFetchResult<unknown>['response']
	}): Promise<HttpGraphQLError> {
		return new HttpGraphQLError(response)
	}

	protected override async get<TResult>(
		path: string,
		request?: GetRequest<CacheOptions> | undefined,
	): Promise<TResult> {
		return await fetchWithRetry<TResult>(() => super.get(path, request))
	}

	protected override async post<TResult>(
		path: string,
		request?: PostRequest<CacheOptions> | undefined,
	): Promise<TResult> {
		return await fetchWithRetry<TResult>(() => super.post(path, request))
	}
}
