export const CATEGORIES = {
	fiction: 'fiction',
	nonFiction: 'non_fiction',
	romance: 'romance',
	youngAdultFiction: 'young_adult_fiction',
	action: 'action',
	fantasy: 'fantasy',
	horror: 'horror',
	mystery: 'mystery',
	thriller: 'thriller',
	suspense: 'suspense',
	scienceFiction: 'science_fiction',
	art: 'art',
	philosophy: 'philosophy',
	religion: 'religion',
	childrens: 'childrens',
	business: 'business',
	classics: 'classics',
	poetry: 'poetry',
	werewolves: 'werewolves',
	vampires: 'vampires',
} as const

export const CATEGORIES_LIST = Object.values(CATEGORIES)
