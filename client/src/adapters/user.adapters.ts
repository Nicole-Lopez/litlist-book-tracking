import {
	ANONYMOUS_USER_PHOTO_DEFAULT,
	ANONYMOUS_USERNAME_DEFAULT,
	USER_PHOTO_DEFAULT,
	USERNAME_DEFAULT,
} from '@constants/user.constants'
import {
	ANONYMOUS_USERNAME_PLACEHOLDER,
	PROVIDER_USERNAME_PLACEHOLDER,
} from '@services/user/profile/profile.constants'
import { GOOGLE_PROVIDER_ID } from '@services/user/auth/auth.constants'
import { removeEmptyValues } from '@utilities/object.utils'
import type { AuthInfo, UserSummary } from '@models/user.models'
import type { ApiAuthInfo } from '@services/user/auth/auth.apiModels'
import type { ApiUserSummary } from '@services/user/profile/profile.apiModels'
import type { WithRequired } from '@customTypes/customUtilityTypes'

export const authInfoAdapter = (data: ApiAuthInfo): AuthInfo => {
	return {
		isAnonymous: data.isAnonymous,
		uid: data.uid,
		email: data.email ?? '',
		isEmailVerified: data.emailVerified,
		dateCreated:
			data.metadata.creationTime !== undefined
				? new Date(data.metadata.creationTime).getTime()
				: new Date().getTime(),
		isGoogleLinked: data.providerData.some(
			provider => provider.providerId === GOOGLE_PROVIDER_ID,
		),
	}
}

export const userSummaryAdapter = (data: ApiUserSummary): UserSummary => {
	const isAnonymous = data.username === ANONYMOUS_USERNAME_PLACEHOLDER

	return {
		username: isAnonymous
			? ANONYMOUS_USERNAME_DEFAULT
			: data.username === PROVIDER_USERNAME_PLACEHOLDER
				? USERNAME_DEFAULT
				: data.username,
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

export const apiUserSummaryAdapter = (
	data: WithRequired<Partial<UserSummary>, 'username'>,
): ApiUserSummary => {
	const user: ApiUserSummary = {
		username: data.username,
		photo: data.photo,
		favoriteCategories: data.favoriteCategories,
		wantToReadLibrary: data.libraries?.wantToRead,
		currentlyReadingLibrary: data.libraries?.currentlyReading,
		alreadyReadLibrary: data.libraries?.alreadyRead,
	}

	return removeEmptyValues(user)
}
