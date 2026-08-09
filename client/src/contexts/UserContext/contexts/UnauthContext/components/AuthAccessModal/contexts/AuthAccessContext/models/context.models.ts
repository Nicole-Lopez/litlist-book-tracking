import type { Dispatch, SetStateAction } from 'react'
import type { PANELS, SERVER_ERROR_TYPES } from '../../../constants/panels.constants'
import type { ArrayElement, ValueOf } from '@customTypes/customUtilityTypes'

export type ServerErrorType = ArrayElement<typeof SERVER_ERROR_TYPES>
export type ServerError = ServerErrorType | null

export type Panels = ValueOf<typeof PANELS>

export type AuthAccessContextValue = {
	currentPanel: Panels
	setCurrentPanel: Dispatch<SetStateAction<Panels>>
	isLoading: boolean
	serverError: ServerError
	setServerError: Dispatch<SetStateAction<ServerError>>
	submitAuth: (onAuth: () => Promise<void>) => Promise<void>
}
