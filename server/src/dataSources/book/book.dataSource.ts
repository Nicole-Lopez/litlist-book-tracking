import { BaseDataSource } from '@dataSources/baseDataSource.js'
import { bookDetailsAdapter, bookPreviewAdapter } from '@adapters/book.adapters.js'
import type { Item, QueryFields, VolumeInfo, Volumes } from './book.apiModels.js'
import type {
	BookDetails,
	BookId,
	BookPreview,
	BookSummary,
} from '@models/book.models.js'

export class BookDataSource extends BaseDataSource {
	override baseURL = 'https://www.googleapis.com/books/v1/'
	readonly searchMaxResults = 300
	readonly searchLimit = 20

	protected resolveQueryFields(
		query: string,
		{ isbn, title, author, category }: QueryFields,
	): string {
		const fields = []

		if (query.length) {
			fields.push(query)
		}

		if (isbn) {
			fields.push(`isbn:${isbn}`)
		}

		if (title) {
			fields.push(`intitle:"${title}"`)
		}

		if (author) {
			fields.push(`inauthor:"${author}"`)
		}

		if (category) {
			fields.push(`subject:${category}`)
		}

		return fields.join('+')
	}

	protected mapBookCover(volumeInfoData: VolumeInfo): string | null {
		return (
			volumeInfoData.imageLinks?.thumbnail ??
			volumeInfoData.imageLinks?.smallThumbnail ??
			null
		)
	}

	protected mapBookPublishedYear(volumeInfoData: VolumeInfo): number | null {
		if (volumeInfoData.publishedDate) {
			const year = parseInt(volumeInfoData.publishedDate)

			if (!isNaN(year)) return year
		}
		return null
	}

	protected mapBookIsbn10(volumeInfoData: VolumeInfo): string | null {
		if (volumeInfoData.industryIdentifiers) {
			for (let i = 0; i < volumeInfoData.industryIdentifiers.length; i++) {
				const industryIdentifier = volumeInfoData.industryIdentifiers[i]

				if (
					industryIdentifier.type === 'ISBN_10' &&
					industryIdentifier.identifier?.length
				)
					return industryIdentifier.identifier
			}
		}
		return null
	}

	protected mapBookIsbn13(volumeInfoData: VolumeInfo): string | null {
		if (volumeInfoData.industryIdentifiers) {
			for (let i = 0; i < volumeInfoData.industryIdentifiers.length; i++) {
				const industryIdentifier = volumeInfoData.industryIdentifiers[i]

				if (
					industryIdentifier.type === 'ISBN_13' &&
					industryIdentifier.identifier?.length
				)
					return industryIdentifier.identifier
			}
		}
		return null
	}

	async getSearchBooks(
		query: string,
		offset: number,
		limit: number = this.searchLimit,
		queryFields?: QueryFields,
	): Promise<Map<string, BookPreview> | null> {
		const { items } = await this.get<Volumes>('volumes', {
			params: {
				q: queryFields ? this.resolveQueryFields(query, queryFields) : query,
				startIndex: `${offset}`,
				printType: 'books',
				maxResults: `${limit}`,
			},
		})

		if (!items?.length) return null

		const results: Map<string, BookPreview> = new Map()

		for (let i = 0; i < items.length; i++) {
			const item = items[i]

			results.set(
				item.id,
				bookPreviewAdapter({
					id: item.id,
					isGoogleId: true,
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors,
					cover: this.mapBookCover(item.volumeInfo),
					publishedYear: this.mapBookPublishedYear(item.volumeInfo),
					pageCount: item.volumeInfo.pageCount,
					categories: item.volumeInfo.categories,
					isbn10: this.mapBookIsbn10(item.volumeInfo),
					isbn13: this.mapBookIsbn13(item.volumeInfo),
				}),
			)
		}

		return results
	}

	async getBookDetails(id: string): Promise<BookDetails> {
		const { volumeInfo } = await this.get<Item>(`volumes/${id}`)

		return bookDetailsAdapter({
			id,
			isGoogleId: true,
			title: volumeInfo.title,
			authors: volumeInfo.authors,
			cover: this.mapBookCover(volumeInfo),
			isbn10: this.mapBookIsbn10(volumeInfo),
			isbn13: this.mapBookIsbn13(volumeInfo),
			publishedYear: this.mapBookPublishedYear(volumeInfo),
			pageCount: volumeInfo.pageCount,
			categories: [
				...new Set(
					volumeInfo.categories?.flatMap(category => category.split(' / ')),
				),
			],
			subtitle: volumeInfo.subtitle,
			description: volumeInfo.description,
			publishedDate: volumeInfo.publishedDate,
			language: volumeInfo.language,
			publisher: volumeInfo.publisher,
		})
	}

	async getBookId({
		isbn10,
		isbn13,
		title,
		authors,
	}: BookSummary): Promise<BookId | null> {
		if (isbn13) {
			const { items } = await this.get<Volumes>('volumes', {
				params: { q: this.resolveQueryFields('', { isbn: isbn13 }) },
			})

			if (items?.length) return items[0].id
		}

		if (isbn10) {
			const { items } = await this.get<Volumes>('volumes', {
				params: { q: this.resolveQueryFields('', { isbn: isbn10 }) },
			})

			if (items?.length) return items[0].id
		}

		const targetAuthor = authors?.[0]

		const { items } = await this.get<Volumes>('volumes', {
			params: { q: this.resolveQueryFields('', { title, author: targetAuthor }) },
		})

		if (items?.length) {
			if (targetAuthor) {
				const targetAuthorNames = targetAuthor.toLowerCase().split(' ')

				for (let i = 0; i < items.length; i++) {
					if (
						items[i].volumeInfo.authors?.some(author =>
							author
								.toLowerCase()
								.split(' ')
								.some(authorNames =>
									targetAuthorNames.includes(authorNames),
								),
						)
					) {
						return items[i].id
					}
				}
			} else {
				return items[0].id
			}
		}

		return null
	}
}
