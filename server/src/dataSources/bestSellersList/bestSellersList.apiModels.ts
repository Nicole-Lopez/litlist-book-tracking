export type ListsFullOverview = {
	status: string
	copyright: string
	num_results: number
	results: Results
}

export type Results = {
	previous_published_date: string
	published_date: string
	next_published_date: string
	published_date_description: string
	bestsellers_date: string
	lists: List[]
	monthly_uri: string
	weekly_uri: string
}

export type List = {
	display_name: string
	list_name: string
	list_name_encoded: ListNameEncoded
	normal_list_ends_at: number
	updated: Updated
	list_id: number
	uri: string
	books: Book[]
}

export type Book = {
	age_group: string
	amazon_product_url: string
	article_chapter_link: string
	asterisk: number
	author: string
	book_image: string
	book_image_height: number
	book_image_width: number
	book_review_link: string
	book_uri: string
	contributor: string
	contributor_note: string
	created_date: string
	dagger: number
	description: string
	first_chapter_link: string
	price: string
	primary_isbn10: string
	primary_isbn13: string
	publisher: string
	rank: number
	rank_last_week: number
	sunday_review_link: string
	title: string
	updated_date: string
	weeks_on_list: number
	isbns: Isbn[]
	buy_links?: BuyLink[]
}

export type Isbn = {
	isbn10: string
	isbn13: string
}

export type BuyLink = {
	name: string
	url: string
}

export const enum ListNameEncoded {
	CombinedPrintAndEBookFiction = 'combined-print-and-e-book-fiction',
	CombinedPrintAndEBookNonfiction = 'combined-print-and-e-book-nonfiction',
	HardcoverFiction = 'hardcover-fiction',
	HardcoverNonfiction = 'hardcover-nonfiction',
	TradeFictionPaperback = 'trade-fiction-paperback',
	AdviceHowToAndMiscellaneous = 'advice-how-to-and-miscellaneous',
	ChildrensMiddleGradeHardcover = 'childrens-middle-grade-hardcover',
	PictureBooks = 'picture-books',
	SeriesBooks = 'series-books',
	YoungAdultHardcover = 'young-adult-hardcover',
	AudioAdviceHowToAndMiscellaneous = 'audio-advice-how-to-and-miscellaneous',
	AudioChildrens = 'audio-childrens',
	AudioFiction = 'audio-fiction',
	AudioNonfiction = 'audio-nonfiction',
	BusinessBooks = 'business-books',
	GraphicBooksAndManga = 'graphic-books-and-manga',
	MiddleGradePaperbackMonthly = 'middle-grade-paperback-monthly',
	PaperbackNonfictionMonthly = 'paperback-nonfiction-monthly',
	YoungAdultPaperbackMonthly = 'young-adult-paperback-monthly',
}

export const enum Updated {
	Weekly = 'WEEKLY',
	Monthly = 'MONTHLY',
}
