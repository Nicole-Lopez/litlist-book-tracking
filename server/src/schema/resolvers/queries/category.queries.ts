import { GQL_CATEGORY_TO_CATEGORY } from '@adapters/category.adapters.js'
import { gqlBookPreviewAdapter } from '@adapters/book.adapters.js'
import { generateArray } from '@utilities/array.utils.js'
import type { GqlBookPreview, GqlQueryResolvers } from '@gqlTypes'

export const booksByCategory: GqlQueryResolvers['booksByCategory'] = async (
	_,
	{ category },
	{ dataSources },
) => {
	const maxResults = 2000
	const calls = 5
	const resultsPerCall = maxResults / calls
	const categoryInfo = {
		name: GQL_CATEGORY_TO_CATEGORY[category],
		count: dataSources.bookApi.categories[GQL_CATEGORY_TO_CATEGORY[category]].count,
		lastOffset:
			dataSources.bookApi.categories[GQL_CATEGORY_TO_CATEGORY[category]].count -
			resultsPerCall,
	}

	let offsets: number[] = []

	if (categoryInfo.count < maxResults) {
		offsets = generateArray(
			Math.ceil(categoryInfo.count / resultsPerCall),
			i => i * resultsPerCall,
		).sort(() => Math.random() - 0.5)
	} else {
		const offsetsRanges: { min: number; max: number }[] = []

		while (offsets.length < calls) {
			let randomOffset = Math.floor(Math.random() * (categoryInfo.count + 1))

			if (randomOffset > categoryInfo.lastOffset) {
				randomOffset = categoryInfo.lastOffset
			}

			if (
				offsetsRanges.every(
					range => !(randomOffset > range.min && randomOffset < range.max),
				)
			) {
				offsets.push(randomOffset)
				offsetsRanges.push({
					min: randomOffset - resultsPerCall,
					max: randomOffset + resultsPerCall,
				})
			}
		}
	}

	const settledBooksResults = await Promise.allSettled(
		offsets.map(offset =>
			dataSources.bookApi.getBooksByCategory(
				categoryInfo.name,
				offset,
				resultsPerCall,
			),
		),
	)

	const results = new Map<string, GqlBookPreview>()

	for (let i = 0; i < settledBooksResults.length; ++i) {
		const settledResult = settledBooksResults[i]

		if (settledResult.status === 'fulfilled' && settledResult.value) {
			for (const [key, book] of settledResult.value) {
				if (!results.has(key)) {
					results.set(key, gqlBookPreviewAdapter(book))
				}
			}
		}
	}

	return results.size ? [...results.values()] : null
}
