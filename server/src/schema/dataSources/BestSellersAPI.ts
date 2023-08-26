import { RESTDataSource } from '@apollo/datasource-rest'
import type {
	FullListsNYTimesAPI,
	List,
} from '@models/restApiModels/NYTimesApiModel'

export class BestSellersAPI extends RESTDataSource {
	override baseURL = 'https://api.nytimes.com/svc/books/v3/'

	async getAllBestSellersLists(): Promise<List[] | null> {
		const { results } = await this.get<FullListsNYTimesAPI>(
			'lists/full-overview.json',
			{
				params: {
					'api-key': process.env.NYTIMES_APIKEY,
				},
			},
		)

		return results !== undefined ? results.lists : null
	}
}
