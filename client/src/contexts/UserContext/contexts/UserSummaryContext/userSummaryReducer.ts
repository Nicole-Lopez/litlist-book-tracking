import { ACTION_TYPES } from './constants/reducer.constants'
import type { UserSummaryReducerState, UserSummaryAction } from './models/reducer.models'

export const initialState: UserSummaryReducerState = {
	uid: '',
	isAnonymous: false,
	username: '',
	photo: '',
	email: '',
	dateCreated: 0,
	isEmailVerified: false,
	isGoogleLinked: false,
	favoriteCategories: [],
	libraries: {
		wantToRead: [],
		currentlyReading: [],
		alreadyRead: [],
	},
}

export default function userSummaryReducer(
	state: UserSummaryReducerState,
	action: UserSummaryAction,
): UserSummaryReducerState {
	switch (action.type) {
		case ACTION_TYPES.INIT_USER_SUMMARY: {
			return { ...action.payload.authInfo, ...action.payload.userSummary }
		}

		default:
			return state
	}
}
