export interface FullListsNYTimesAPI {
	status: string
	copyright?: string
	num_results?: number
	results?: Results
}

export interface Results {
	bestsellers_date?: string
	published_date?: string
	published_date_description?: string
	previous_published_date?: string
	next_published_date?: string
	lists: List[]
}

export interface List {
	list_id: number
	list_name: string
	list_name_encoded: ListNameEncoded
	display_name: string
	updated?: Updated
	list_image?: null
	list_image_width?: null
	list_image_height?: null
	books: Book[]
}

export type ListNameEncoded =
	| 'combined-print-and-e-book-fiction'
	| 'combined-print-and-e-book-nonfiction'
	| 'hardcover-fiction'
	| 'hardcover-nonfiction'
	| 'trade-fiction-paperback'
	| 'paperback-nonfiction'
	| 'advice-how-to-and-miscellaneous'
	| 'childrens-middle-grade-hardcover'
	| 'picture-books'
	| 'series-books'
	| 'young-adult-hardcover'
	| 'audio-fiction'
	| 'audio-nonfiction'
	| 'business-books'
	| 'graphic-books-and-manga'
	| 'mass-market-monthly'
	| 'middle-grade-paperback-monthly'
	| 'young-adult-paperback-monthly'

export interface Book {
	age_group?: string
	amazon_product_url?: string
	article_chapter_link?: string
	author: string
	book_image?: string
	book_image_width?: number
	book_image_height?: number
	book_review_link?: string
	book_uri: string
	contributor?: string
	contributor_note?: string
	created_date: string
	description?: string
	first_chapter_link?: string
	price?: string
	primary_isbn10?: string
	primary_isbn13?: string
	publisher?: string
	rank: number
	rank_last_week?: number
	sunday_review_link?: string
	title: string
	updated_date?: string
	weeks_on_list?: number
	buy_links?: BuyLink[]
}

export interface BuyLink {
	name?: string
	url?: string
}

export type Updated = 'WEEKLY' | 'MONTHLY'
