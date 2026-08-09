import {
	ANONYMOUS_USER_PHOTO_DEFAULT,
	USER_PHOTO_DEFAULT,
} from '@services/user/profile/profile.constants'
import { ANONYMOUS_USERNAME_DEFAULT, USERNAME_DEFAULT } from '@constants/user.constants'
import type { AuthInfo, UserSummary } from '@models/user.models'

export const authInfoAdapter = (data: {
	uid: string
	isAnonymous: boolean
	email: string
	isEmailVerified: boolean
	dateCreated: number
	isGoogleLinked: boolean
}): AuthInfo => {
	return {
		uid: data.uid,
		isAnonymous: data.isAnonymous,
		email: data.email,
		isEmailVerified: data.isEmailVerified,
		dateCreated: data.dateCreated,
		isGoogleLinked: data.isGoogleLinked,
	}
}

export const userSummaryAdapter = (
	data: {
		username?: string
		photo?: string
		favoriteCategories?: string[]
		wantToReadLibrary?: string[]
		currentlyReadingLibrary?: string[]
		alreadyReadLibrary?: string[]
	},
	isAnonymous: boolean,
): UserSummary => {
	return {
		username: isAnonymous
			? ANONYMOUS_USERNAME_DEFAULT
			: (data.username ?? USERNAME_DEFAULT),
		photo: isAnonymous
			? ANONYMOUS_USER_PHOTO_DEFAULT
			: (data.photo ?? USER_PHOTO_DEFAULT),
		favoriteCategories: data.favoriteCategories ?? [],
		libraries: {
			wantToRead: data.wantToReadLibrary ?? [],
			currentlyReading: data.currentlyReadingLibrary ?? [],
			alreadyRead: data.alreadyReadLibrary ?? [],
		},
	}
}
