import {
	API_PROFILES_DB_PATH_ROOT,
	API_USER_SUMMARIES_DB_PATH_ROOT,
} from './profile.apiConstants'

export const getApiUserSummaryDocDbPath = (userId: string): string =>
	`${API_USER_SUMMARIES_DB_PATH_ROOT}/${userId}`

export const getApiProfileDocDbPath = (userId: string): string =>
	`${API_PROFILES_DB_PATH_ROOT}/${userId}`

export const getApiProfileRecentActivitiesColDbPath = (userId: string): string =>
	`${getApiProfileDocDbPath(userId)}/recentActivities`

export const getApiProfileReadingHistoryColDbPath = (userId: string): string =>
	`${getApiProfileDocDbPath(userId)}/readingHistory`
