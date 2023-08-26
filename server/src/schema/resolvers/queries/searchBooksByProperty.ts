import { CATEGORIES_AVAILABLE_OPENLIBRARY_SEARCH_TERM } from '@constants/apiConstants.js'
import { arrayIsNotEmpty } from '@utilities/generalUtils.js'
import {
	bookSummaryAdapter,
	bookPreviewAdapter,
} from '@adapters/bookAdapters.js'
import type { GqlQueryResolvers } from '@gqlTypes'
import type { Results } from '@models/restApiModels/OpenLibraryApiModel'

export const booksByCategory: GqlQueryResolvers['booksByCategory'] = async (
	_,
	{ subject },
	{ dataSources },
) => {
	const totalBooks = 700
	const perCall = 50
	let offset = 0

	const fetchApiArr: Array<Promise<Results[] | null>> = []

	for (let i = 0; i <= totalBooks / perCall; i++) {
		fetchApiArr.push(
			dataSources.categoriesAPI.getBooksByCategory(
				CATEGORIES_AVAILABLE_OPENLIBRARY_SEARCH_TERM[subject],
				`${offset}`,
				`${perCall}`,
			),
		)

		offset += perCall
	}

	const fulfilledBooksResults = (await Promise.allSettled(fetchApiArr).then(
		res =>
			res.filter(
				p =>
					p.status === 'fulfilled' &&
					p.value !== null &&
					arrayIsNotEmpty(p.value),
			),
	)) as Array<PromiseFulfilledResult<Results[]>>

	const books = fulfilledBooksResults.flatMap(item =>
		item.value.map(book =>
			bookPreviewAdapter({
				id: book.key?.split('/')[2],
				isGoogleID: false,
				title: book.title,
				authors: book.author_name?.slice(0, 1),
				cover: dataSources.categoriesAPI.getCover(book.cover_i),
				publishedYear:
					book.first_publish_year ??
					(arrayIsNotEmpty(book.publish_year)
						? book.publish_year![0]
						: undefined),
				pageCount: book.number_of_pages_median,
				categories: book.subject,
				isbn: book.isbn,
			}),
		),
	)

	return books
}

export const booksByAuthor: GqlQueryResolvers['booksByAuthor'] = async (
	_,
	{ author },
	{ dataSources },
) => {
	const data = await dataSources.booksAPI.getSearchBook(author, '0')
	const MAX_BOOKS = 20

	const books = data
		?.filter(book => book.volumeInfo.authors?.includes(author))
		.slice(0, MAX_BOOKS)
		.map(book =>
			bookSummaryAdapter({
				id: book.id,
				isGoogleID: true,
				title: book.volumeInfo.title,
				authors: book.volumeInfo.authors,
				cover: dataSources.booksAPI.getCover(
					book.volumeInfo.imageLinks,
				),
			}),
		)

	return arrayIsNotEmpty(books) ? books! : null
}
