import { gqlBestSellersListAdapter } from '@adapters/bestSellersList.adapters.js'
import type { GqlQueryResolvers } from '@gqlTypes'

export const bestSellersLists: GqlQueryResolvers['bestSellersLists'] = async (
	_,
	_2,
	{ dataSources },
) => {
	const lists = await dataSources.bestSellersListApi.getBestSellersLists()

	return lists.map(list => gqlBestSellersListAdapter(list))
}
