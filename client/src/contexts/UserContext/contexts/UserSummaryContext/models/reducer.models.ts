import type { AuthInfo, UserSummary } from '@models/user.models'
import type { ACTION_TYPES } from '../constants/reducer.constants'

export type UserSummaryReducerState = AuthInfo & UserSummary

export type UserSummaryAction = {
	type: typeof ACTION_TYPES.INIT_USER_SUMMARY
	payload: {
		authInfo: AuthInfo
		userSummary: UserSummary
	}
}
