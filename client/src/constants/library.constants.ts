export const PROGRESS_LIBRARY_KEYS = {
	wantToRead: 'want_to_read',
	currentlyReading: 'currently_reading',
	alreadyRead: 'already_read',
} as const

export const PROGRESS_LIBRARY_KEYS_LIST = Object.values(PROGRESS_LIBRARY_KEYS)

export const ANONYMOUS_LIBRARY_LIMITS = {
	maxProgressBooks: 10,
	maxReadingLists: 3,
	maxBooksPerReadingList: 5,
} as const
