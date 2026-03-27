export type AuthInfo = {
	uid: string
	isAnonymous: boolean
	email: string
	dateCreated: number
	isEmailVerified: boolean
	isGoogleLinked: boolean
}

export type UserSummary = {
	username: string
	photo: string
	favoriteCategories: string[]
	libraries: {
		wantToRead: string[]
		currentlyReading: string[]
		alreadyRead: string[]
	}
}
