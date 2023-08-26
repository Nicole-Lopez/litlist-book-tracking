import { bookDetailAdapter } from '@adapters/bookAdapters.js'
import type { GqlQueryResolvers } from '@gqlTypes'
import type { BookDetail } from '@models/bookModel'

export const bookDetail: GqlQueryResolvers['bookDetail'] = async (
	_,
	{ id },
	{ dataSources },
) => {
	const dataBookDetail = await dataSources.booksAPI.getBookDetail(`${id}`)

	if (dataBookDetail !== undefined) {
		const detail: BookDetail = {
			title: dataBookDetail.title,
			subtitle: dataBookDetail.subtitle,
			authors: dataBookDetail.authors,
			cover: dataSources.booksAPI.getCover(dataBookDetail.imageLinks),
			description: dataBookDetail.description,
			additionalInfo: {
				pageCount: dataBookDetail.pageCount,
				publishedDate: dataBookDetail.publishedDate,
				language: dataBookDetail.language,
				publisher: dataBookDetail.publisher,
			},
			categories: { subject: new Set(dataBookDetail.categories) },
		}

		const bookIsbn = dataSources.booksAPI.getIsbn(
			dataBookDetail.industryIdentifiers,
		)

		if (bookIsbn !== null) {
			for (let i = 0; i < bookIsbn.length; ++i) {
				const moreCategories =
					await dataSources.categoriesAPI.getCategoriesByISBN(
						bookIsbn[i],
					)

				if (moreCategories !== null) {
					moreCategories.subject?.forEach(item =>
						detail.categories.subject!.add(item),
					)

					detail.categories.person = new Set(moreCategories.person)
					detail.categories.place = new Set(moreCategories.place)

					break
				}
			}
		}

		return bookDetailAdapter(detail)
	} else {
		return null
	}
}

export const findBookId: GqlQueryResolvers['findBookId'] = async (
	_,
	{ title, author },
	{ dataSources },
) => {
	const id = await dataSources.booksAPI.getBookId(title, author)

	return id
}
