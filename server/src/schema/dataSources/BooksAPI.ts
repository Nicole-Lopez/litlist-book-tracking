import { RESTDataSource } from '@apollo/datasource-rest'
import { GOOGLEBOOKS_MAXRESULTS_LIMIT } from '@constants/apiConstants.js'
import { arrayIsNotEmpty } from '@utilities/generalUtils.js'
import type {
	SearchGoogleBooksAPI,
	ImageLinks,
	IndustryIdentifier,
	DetailGoogleBooksAPI,
	Item,
} from '@models/restApiModels/GoogleBooksApiModel'

const GOOGLEBOOKS_SEARCH_API_PARAMS_DEFAULT = {
	printType: 'books',
	maxResults: GOOGLEBOOKS_MAXRESULTS_LIMIT,
	key: process.env.GOOGLEBOOKS_APIKEY,
}

export class BooksAPI extends RESTDataSource {
	override baseURL = 'https://www.googleapis.com/books/v1/'

	getCover(imageLinks?: ImageLinks): string | undefined {
		if (imageLinks !== undefined) {
			return imageLinks.thumbnail ?? imageLinks.smallThumbnail
		}
	}

	getIsbn(industryIdentifiers?: IndustryIdentifier[]): string[] | null {
		const isbn = industryIdentifiers
			?.filter(e => e.type?.includes('ISBN_'))
			.map(e => e.identifier)

		return arrayIsNotEmpty(isbn) ? isbn! : null
	}

	async getSearchBook(
		term: string,
		startIndex: string,
	): Promise<Item[] | null> {
		const { items } = await this.get<SearchGoogleBooksAPI>('volumes', {
			params: {
				q: `${term}`,
				startIndex,
				...GOOGLEBOOKS_SEARCH_API_PARAMS_DEFAULT,
			},
		})

		return arrayIsNotEmpty(items) ? items! : null
	}

	async getBookDetail(
		id: string,
	): Promise<DetailGoogleBooksAPI['volumeInfo']> {
		const { volumeInfo } = await this.get<DetailGoogleBooksAPI>(
			`volumes/${id}`,
		)

		return volumeInfo
	}

	async getBookId(title: string, author: string): Promise<string | null> {
		const { items } = await this.get<SearchGoogleBooksAPI>('volumes', {
			params: {
				q: `+intitle:"${title}"+inauthor:"${author}"`,
				startIndex: '0',
				...GOOGLEBOOKS_SEARCH_API_PARAMS_DEFAULT,
			},
		})

		if (items !== undefined) {
			const findBookByTitle = items.find(
				e => e.volumeInfo.title.toLowerCase() === title.toLowerCase(),
			)

			return findBookByTitle?.id ?? items[0].id
		} else {
			return null
		}
	}
}
