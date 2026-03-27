import type { Dispatch, SetStateAction } from 'react'
import type { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'
import type { PANELS } from '../../../constants/panels.constants'
import type { Prettify, ValueOf } from '@customTypes/customUtilityTypes'

export type ServerError = Prettify<Exclude<
	ValueOf<typeof AUTH_ERROR_TYPES>,
	typeof AUTH_ERROR_TYPES.popupError
> | null>

export type Panels = ValueOf<typeof PANELS>

export type AuthAccessContextValue = {
	currentPanel: Panels
	setCurrentPanel: Dispatch<SetStateAction<Panels>>
	isLoading: boolean
	serverError: ServerError
	setServerError: Dispatch<SetStateAction<ServerError>>
	handleAuthAccess: (onAuth: () => Promise<void>) => Promise<void>
}
