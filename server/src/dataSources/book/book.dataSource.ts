import { CATEGORIES } from '@constants/category.constants.js'
import { BaseGraphqlDataSource } from '@dataSources/baseGraphqlDataSource.js'
import { bookDetailsAdapter, bookPreviewAdapter } from '@adapters/book.adapters.js'
import { readFileSync } from 'fs'
import { TagCategory } from './book.apiModels.js'
import type {
	BookDetails,
	BookId,
	BookPreview,
	BookSummary,
} from '@models/book.models.js'
import type { AugmentedRequest, CacheOptions } from '@apollo/datasource-rest'
import type { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource.js'
import type { Category } from '@models/category.models.js'
import type {
	BookCharacter,
	BookDetailsQuery,
	BookDetailsQueryVariables,
	BooksByAuthorQuery,
	BooksByAuthorQueryVariables,
	BooksByCategoryQuery,
	BooksByCategoryQueryVariables,
	Contribution,
	Image,
	RelatedBooksQuery,
	RelatedBooksQueryVariables,
	SearchBooksQuery,
	SearchBooksQueryVariables,
	Tag,
} from './book.apiModels.js'

const booksByCategoryQuery = readFileSync(
	'src/dataSources/book/queries/booksByCategory.apiQuery.graphql',
	{ encoding: 'utf-8' },
)

const booksByAuthorQuery = readFileSync(
	'src/dataSources/book/queries/booksByAuthor.apiQuery.graphql',
	{ encoding: 'utf-8' },
)

const relatedBooksQuery = readFileSync(
	'src/dataSources/book/queries/relatedBooks.apiQuery.graphql',
	{ encoding: 'utf-8' },
)

const searchBooksQuery = readFileSync(
	'src/dataSources/book/queries/searchBooks.apiQuery.graphql',
	{ encoding: 'utf-8' },
)

const bookDetailsQuery = readFileSync(
	'src/dataSources/book/queries/bookDetails.apiQuery.graphql',
	{ encoding: 'utf-8' },
)

export class BookDataSource extends BaseGraphqlDataSource {
	override baseURL = 'https://api.hardcover.app/v1/graphql'
	readonly searchInitialPage = 1
	readonly searchResultsPerPage = 25
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
		requestOpts.headers['authorization'] = `${process.env.BOOK_API_KEY}`
	}

	protected mapBookAuthors(
		contributionsData: Contribution[] | undefined,
	): string[] | null {
		if (contributionsData?.length) {
			const authors: string[] = []

			for (let i = 0; i < contributionsData.length; i++) {
				const author = contributionsData[i].author?.name

				if (author) {
					authors.push(author)
				}
			}

			if (authors.length) return authors
		}

		return null
	}

	protected mapBookCover(imageData: Image | undefined): string | null {
		return imageData?.url ?? null
	}

	protected mapBookTags(
		taggingsData: Tag[] | undefined,
	): Pick<BookPreview, 'categories' | 'contentWarnings'> {
		const categories = new Set<string>()
		const contentWarnings = new Set<string>()

		if (taggingsData) {
			for (let i = 0; i < taggingsData.length; i++) {
				const tag = taggingsData[i].tag?.tag
				const category = taggingsData[i].tag?.tag_category?.category

				if (tag && category) {
					if (category === TagCategory.Genre && !categories.has(tag)) {
						categories.add(tag)
					} else if (
						category === TagCategory.ContentWarning &&
						!contentWarnings.has(tag)
					) {
						contentWarnings.add(tag)
					}
				}
			}
		}

		return {
			categories: categories.size ? [...categories] : null,
			contentWarnings: contentWarnings.size ? [...contentWarnings] : null,
		}
	}

	protected mapBookCharacters(
		bookCharactersData: BookCharacter[] | undefined,
	): string[] | null {
		if (bookCharactersData?.length) {
			const characters = new Set<string>()

			for (let i = 0; i < bookCharactersData.length; i++) {
				const characterName = bookCharactersData[i].character?.name

				if (characterName) {
					characters.add(characterName)
				}
			}

			if (characters.size) return [...characters]
		}

		return null
	}

	async getBooksByCategory(
		category: Category,
		offset: number,
		limit: number = 200,
	): Promise<Map<string, BookPreview> | null> {
		const data = await this.query<
			BooksByCategoryQuery,
			BooksByCategoryQueryVariables
		>(booksByCategoryQuery, {
			categoryId: this.categories[category].id,
			offset,
			limit,
		})

		const booksData = data.tags_by_pk?.taggings

		if (!booksData?.length) return null

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < booksData.length; i++) {
			const book = booksData[i].book

			if (book?.title) {
				const id = `${book.id}`

				if (!results.has(id)) {
					const { categories, contentWarnings } = this.mapBookTags(
						book.taggings,
					)

					results.set(
						id,
						bookPreviewAdapter({
							id,
							isExternalId: false,
							title: book.title,
							authors: this.mapBookAuthors(book.contributions),
							isbn10: book.default_cover_edition?.isbn_10,
							isbn13: book.default_cover_edition?.isbn_13,
							publishedYear: book.release_year,
							pageCount: book.pages,
							cover: this.mapBookCover(book.image),
							categories,
							contentWarnings,
						}),
					)
				}
			}
		}

		return results
	}

	async getBooksByAuthor(
		authorName: string,
		offset: number = 0,
		limit: number = 50,
	): Promise<Map<string, BookPreview> | null> {
		const data = await this.query<BooksByAuthorQuery, BooksByAuthorQueryVariables>(
			booksByAuthorQuery,
			{ authorName, offset, limit },
		)

		const booksData = data.books

		if (!booksData?.length) return null

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < booksData.length; i++) {
			const book = booksData[i]

			if (book?.title) {
				const id = `${book.id}`

				if (!results.has(id)) {
					const { categories, contentWarnings } = this.mapBookTags(
						book.taggings,
					)

					results.set(
						id,
						bookPreviewAdapter({
							id,
							isExternalId: false,
							title: book.title,
							authors: this.mapBookAuthors(book.contributions),
							isbn10: book.default_cover_edition?.isbn_10,
							isbn13: book.default_cover_edition?.isbn_13,
							publishedYear: book.release_year,
							pageCount: book.pages,
							cover: this.mapBookCover(book.image),
							categories,
							contentWarnings,
						}),
					)
				}
			}
		}

		return results
	}

	async getRelatedBooks(
		category: string,
		offset: number = 0,
		limit: number = 50,
	): Promise<Map<string, BookPreview> | null> {
		const data = await this.query<RelatedBooksQuery, RelatedBooksQueryVariables>(
			relatedBooksQuery,
			{ category, offset, limit },
		)

		const booksData = data.books

		if (!booksData?.length) return null

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < booksData.length; i++) {
			const book = booksData[i]

			if (book?.title) {
				const id = `${book.id}`

				if (!results.has(id)) {
					const { categories, contentWarnings } = this.mapBookTags(
						book.taggings,
					)

					results.set(
						id,
						bookPreviewAdapter({
							id,
							isExternalId: false,
							title: book.title,
							authors: this.mapBookAuthors(book.contributions),
							isbn10: book.default_cover_edition?.isbn_10,
							isbn13: book.default_cover_edition?.isbn_13,
							publishedYear: book.release_year,
							pageCount: book.pages,
							cover: this.mapBookCover(book.image),
							categories,
							contentWarnings,
						}),
					)
				}
			}
		}

		return results
	}

	async getSearchBooks(
		query: string,
		page: number = this.searchInitialPage,
		perPage: number = this.searchResultsPerPage,
	): Promise<Map<string, BookPreview> | null> {
		const data = await this.query<SearchBooksQuery, SearchBooksQueryVariables>(
			searchBooksQuery,
			{ query, page, perPage },
		)

		const resultsData = data.search?.results?.hits

		if (!resultsData?.length) return null

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < resultsData.length; i++) {
			const book = resultsData[i].document

			if (book?.id && book.title) {
				results.set(
					book.id,
					bookPreviewAdapter({
						id: book.id,
						isExternalId: false,
						title: book.title,
						authors: book.author_names?.length ? book.author_names : null,
						cover: this.mapBookCover(book.image),
						isbn10: book.isbns?.find(isbn => isbn.length === 10),
						isbn13: book.isbns?.find(isbn => isbn.length === 13),
						publishedYear: book.release_year,
						pageCount: book.pages,
						categories: book.genres?.length ? book.genres : null,
						contentWarnings: book.content_warnings?.length
							? book.content_warnings
							: null,
					}),
				)
			}
		}

		return results
	}

	async getBookDetails(id: string): Promise<BookDetails | null> {
		const data = await this.query<BookDetailsQuery, BookDetailsQueryVariables>(
			bookDetailsQuery,
			{ id: +id },
		)
		const bookData = data.books_by_pk

		if (!bookData?.title) return null

		const { categories, contentWarnings } = this.mapBookTags(bookData.taggings)

		return bookDetailsAdapter({
			id,
			isExternalId: false,
			title: bookData.title,
			authors: this.mapBookAuthors(bookData.contributions),
			cover: this.mapBookCover(bookData.image),
			isbn10: bookData.default_cover_edition?.isbn_10,
			isbn13: bookData.default_cover_edition?.isbn_13,
			publishedYear: bookData.release_year,
			pageCount: bookData.pages,
			categories,
			contentWarnings,
			subtitle: bookData.subtitle,
			description: bookData.description,
			characters: this.mapBookCharacters(bookData.book_characters),
			publishedDate: bookData.release_date,
			language: bookData.default_cover_edition?.language?.language,
			publisher: bookData.default_cover_edition?.publisher?.name,
		})
	}

	async getBookId({
		isbn10,
		isbn13,
		title,
		authors,
	}: BookSummary): Promise<BookId | null> {
		const isbns = [isbn13, isbn10]

		for (let i = 0; i < isbns.length; i++) {
			const query = isbns[i]
			if (query) {
				const data = await this.query<
					SearchBooksQuery,
					SearchBooksQueryVariables
				>(searchBooksQuery, { query })

				const result = data?.search?.results?.hits?.[0]?.document?.id
				if (result) return result
			}
		}

		const data = await this.query<SearchBooksQuery, SearchBooksQueryVariables>(
			searchBooksQuery,
			{ query: title },
		)

		const results = data?.search?.results?.hits

		const targetAuthor = authors?.[0].toLowerCase()

		if (results?.length) {
			if (targetAuthor) {
				const targetAuthorNames = targetAuthor.split(' ')

				for (let i = 0; i < results.length; i++) {
					const book = results[i].document

					if (
						book?.id &&
						book?.author_names?.some(author => {
							const authorFullName = author.toLowerCase()

							return (
								authorFullName === targetAuthor ||
								authorFullName
									.split(' ')
									.some(authorName =>
										targetAuthorNames.includes(authorName),
									)
							)
						})
					) {
						return book.id
					}
				}
			} else {
				const book = results[0].document

				if (book?.id) return book.id
			}
		}

		return null
	}
}
