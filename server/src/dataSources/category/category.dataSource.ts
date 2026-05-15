import { BaseGraphqlDataSource } from '@dataSources/baseGraphqlDataSource.js'
import { CATEGORIES } from '@constants/category.constants.js'
import { bookPreviewAdapter } from '@adapters/book.adapters.js'
import type { AugmentedRequest, CacheOptions } from '@apollo/datasource-rest'
import type { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource.js'
import type { BookPreview } from '@models/book.models.js'
import type {
	Book,
	GetBooksByCategoryQuery,
	GetBooksByCategoryQueryVariables,
} from './category.apiModels.js'
import type { Category } from '@models/category.models.js'

const GET_BOOKS_BY_CATEGORY_QUERY = `
query GetBooksByCategory($id: bigint!, $offset: Int!, $limit: Int!) {
    tags_by_pk(id: $id) {
        taggings(offset: $offset, limit: $limit) {
            book {
                title
                id
                image {
                    url
                }
                contributions {
                    author {
                        name
                    }
                }
                pages
                release_year
                editions {
                    isbn_10
                    isbn_13
                    pages
                }
                taggings {
                    tag {
                        tag
                    }
                }
            }
        }
    }
}
`

export class CategoryDataSource extends BaseGraphqlDataSource {
	override baseURL = 'https://api.hardcover.app/v1/graphql'
	readonly categories = {
		[CATEGORIES.art]: { id: 994, count: 5109 },
		[CATEGORIES.business]: { id: 3435, count: 13592 },
		[CATEGORIES.childrens]: { id: 3463, count: 3518 },
		[CATEGORIES.classics]: { id: 1, count: 81302 },
		[CATEGORIES.fantasy]: { id: 2, count: 220721 },
		[CATEGORIES.fiction]: { id: 5, count: 231490 },
		[CATEGORIES.graphicBooksAndManga]: { id: 3421, count: 29253 },
		[CATEGORIES.horror]: { id: 52, count: 1924 },
		[CATEGORIES.lgbtq]: { id: 22, count: 45739 },
		[CATEGORIES.mystery]: { id: 7, count: 23294 },
		[CATEGORIES.nonFiction]: { id: 14, count: 13285 },
		[CATEGORIES.philosophy]: { id: 8, count: 13421 },
		[CATEGORIES.poetry]: { id: 29, count: 7946 },
		[CATEGORIES.religion]: { id: 37, count: 22321 },
		[CATEGORIES.romance]: { id: 11, count: 43950 },
		[CATEGORIES.scienceFiction]: { id: 6, count: 100689 },
		[CATEGORIES.thriller]: { id: 18, count: 9175 },
		[CATEGORIES.youngAdult]: { id: 3, count: 148377 },
	}

	protected override willSendRequest(
		_path: string,
		requestOpts: AugmentedRequest<CacheOptions>,
	): ValueOrPromise<void> {
		requestOpts.headers['authorization'] = `${process.env.CATEGORIES_API_KEY}`
	}

	protected mapBookIsbns(bookData: Book): Pick<BookPreview, 'isbn10' | 'isbn13'> {
		let isbns: Pick<BookPreview, 'isbn10' | 'isbn13'> = {
			isbn10: null,
			isbn13: null,
		}

		if (bookData.pages) {
			const isbnsByPageCount = bookData.editions.find(
				edition => edition.pages === bookData.pages,
			)

			isbns = {
				isbn10: isbnsByPageCount?.isbn_10 ?? null,
				isbn13: isbnsByPageCount?.isbn_13 ?? null,
			}
		}

		if (!isbns.isbn10) {
			isbns.isbn10 =
				bookData.editions.find(edition => edition.isbn_10)?.isbn_10 ?? null
		}

		if (!isbns.isbn13) {
			isbns.isbn13 =
				bookData.editions.find(edition => edition.isbn_13)?.isbn_13 ?? null
		}

		return isbns
	}

	protected mapBookAuthors(bookData: Book): string[] {
		return bookData.contributions.map(item => item.author.name)
	}

	protected mapBookCategories(bookData: Book): string[] {
		return bookData.taggings.map(item => item.tag.tag)
	}

	async getBooksByCategory(
		category: Category,
		offset: number,
		limit: number = 200,
	): Promise<Map<string, BookPreview> | null> {
		const data = await this.query<
			GetBooksByCategoryQuery,
			GetBooksByCategoryQueryVariables
		>(GET_BOOKS_BY_CATEGORY_QUERY, {
			id: this.categories[category].id,
			offset,
			limit,
		})

		const booksData = data.tags_by_pk.taggings

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < booksData.length; i++) {
			const book = booksData[i].book
			const id = `${book.id}`

			if (!results.has(id)) {
				const { isbn10, isbn13 } = this.mapBookIsbns(book)

				if (isbn13 || isbn10) {
					results.set(
						id,
						bookPreviewAdapter({
							id,
							isGoogleId: false,
							title: book.title,
							authors: this.mapBookAuthors(book),
							publishedYear: book.release_year,
							cover: book.image?.url,
							pageCount: book.pages,
							categories: this.mapBookCategories(book),
							isbn10,
							isbn13,
						}),
					)
				}
			}
		}

		return results
	}
}
