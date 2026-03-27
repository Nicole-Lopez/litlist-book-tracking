import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import SuccessIcon from '@assets/icons/SuccessIcon'
import InfoIcon from '@assets/icons/InfoIcon'
import ErrorIcon from '@assets/icons/ErrorIcon'
import WarningIcon from '@assets/icons/WarningIcon'
import './AlertInline.scss'
import type { ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { FeedbackTypes } from '@models/feedback.models'

export type AlertInlineProps = PropsWithChildren<{
	className?: string
	type: FeedbackTypes
	isIconVisible?: boolean
}>

export default function AlertInline({
	className = '',
	type,
	children,
	isIconVisible = true,
}: AlertInlineProps): ReactNode {
	return (
		<p
			className={`alert-inline alert-inline--${
				type === FEEDBACK_TYPES.error
					? 'error'
					: type === FEEDBACK_TYPES.info
						? 'info'
						: type === FEEDBACK_TYPES.success
							? 'success'
							: 'warning'
			} ${className}`}
		>
			{isIconVisible ? (
				type === FEEDBACK_TYPES.error ? (
					<ErrorIcon />
				) : type === FEEDBACK_TYPES.info ? (
					<InfoIcon />
				) : type === FEEDBACK_TYPES.success ? (
					<SuccessIcon />
				) : (
					<WarningIcon />
				)
			) : null}

			{children}
		</p>
	)
}
