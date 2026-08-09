// username
export const USERNAME_DEFAULT = 'BookishBound_X'
export const ANONYMOUS_USERNAME_DEFAULT = 'TrialTome_X'

export const VALID_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
export const USERNAME_MIN_LENGTH = 5
export const USERNAME_MAX_LENGTH = 20

// password
export const VALID_USER_PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/
export const USER_PASSWORD_MIN_LENGTH = 8
export const USER_PASSWORD_MAX_LENGTH = 20

// email
export const VALID_EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
