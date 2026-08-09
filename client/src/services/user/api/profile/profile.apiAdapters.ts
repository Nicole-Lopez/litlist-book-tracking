import { removeEmptyValues } from '@utilities/object.utils'
import type { WithRequired } from '@customTypes/customUtilityTypes'
import type { UserSummary } from '@models/user.models'
import type { ApiUserSummary } from './profile.apiModels'

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
