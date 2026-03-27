export type ApiUserSummary = {
	username: string
	photo?: string
	favoriteCategories?: string[]
	wantToReadLibrary?: string[]
	currentlyReadingLibrary?: string[]
	alreadyReadLibrary?: string[]
}
