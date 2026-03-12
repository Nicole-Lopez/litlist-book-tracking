import type { ReactNode } from 'react'
import type { FEEDBACK_TYPES } from '@constants/feedback.constants'

export type FeedbackTypes = keyof typeof FEEDBACK_TYPES

export type Toast = {
	id: string
	content: ReactNode
	type?: FeedbackTypes
	autoCloseDuration?: number
	isAutoClose?: boolean
	toastClassName?: string
}
