import type { Dispatch } from 'react'
import type { UserSummaryAction, UserSummaryReducerState } from './reducer.models'

export type UserSummaryContextValue = UserSummaryReducerState
export type UserSummaryActionsContextValue = Dispatch<UserSummaryAction>
