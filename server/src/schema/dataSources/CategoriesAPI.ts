import { RESTDataSource } from '@apollo/datasource-rest'
import { BOOK_CATEGORIES_DETAIL_AVAILABLE } from '@constants/apiConstants.js'
import { arrayIsNotEmpty } from '@utilities/generalUtils.js'
import type {
	SearchOpenLibraryAPI,
	Results,
	Categories,
} from '@models/restApiModels/OpenLibraryApiModel'

export class CategoriesAPI extends RESTDataSource {
	override baseURL = 'https://openlibrary.org/'

	getCover(cover: Results['cover_i']): string | undefined {
		if (cover !== undefined) {
			return `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
		}
	}

	async getCategoriesByISBN(isbn: string): Promise<Categories | null> {
		const { docs } = await this.get<SearchOpenLibraryAPI>('search.json', {
			params: {
				q: `isbn:${isbn}`,
				mode: 'everything',
				fields: BOOK_CATEGORIES_DETAIL_AVAILABLE.toString(),
				limit: '5',
				offset: '0',
			},
		})

		return arrayIsNotEmpty(docs) ? docs![0] : null
	}

	async getBooksByCategory(
		subject: string,
		offset: string,
		limit: string,
	): Promise<Results[] | null> {
		const { docs } = await this.get<SearchOpenLibraryAPI>('search.json', {
			params: {
				q: `subject:${subject}`,
				mode: 'everything',
				fields: 'key,title,author_name,cover_i,first_publish_year,publish_year,number_of_pages_median,subject,isbn',
				limit,
				offset,
			},
		})

		return arrayIsNotEmpty(docs) ? docs! : null
	}
}
