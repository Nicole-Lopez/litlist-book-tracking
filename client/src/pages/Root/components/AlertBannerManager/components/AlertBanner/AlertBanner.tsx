import { useState } from 'react'
import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import { removeAlertBanner } from '@utilities/feedback.utils'
import InOutTransition from '@components/InOutTransition/InOutTransition'
import './AlertBanner.scss'
import type { ReactNode } from 'react'
import type { AlertBanner as AlertBannerT } from '@models/feedback.models'

export type AlertBannerProps = AlertBannerT

export default function AlertBanner({
	id,
	content,
	isCloseButtonDisplayed = false,
	type,
	alertBannerClassName = '',
}: AlertBannerProps): ReactNode {
	const [isClosing, setIsClosing] = useState(false)

	return (
		<InOutTransition
			className={`alert-banner alert-banner--${
				type === FEEDBACK_TYPES.error
					? 'error'
					: type === FEEDBACK_TYPES.info
						? 'info'
						: type === FEEDBACK_TYPES.success
							? 'success'
							: 'warning'
			} ${alertBannerClassName}`}
			hiddenClassName='alert-banner--hidden'
			isOut={isClosing}
			outDuration={120}
			onOutEnd={() => {
				removeAlertBanner(id)
			}}
		>
			{content}

			{isCloseButtonDisplayed ? (
				<button
					className='alert-banner__close-btn'
					onClick={() => {
						setIsClosing(true)
					}}
				>
					&#x2716;
				</button>
			) : null}
		</InOutTransition>
	)
}
