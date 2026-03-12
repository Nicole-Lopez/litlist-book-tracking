import type { ReactNode } from 'react'

export type ProgressBarProps = {
	autoClose: number
	isRunning: boolean
	closeToast: () => void
}

export default function ProgressBar({
	autoClose,
	isRunning,
	closeToast,
}: ProgressBarProps): ReactNode {
	return (
		<div className='toast-notification__progress-bar'>
			<div
				style={{
					animationDuration: `${autoClose}ms`,
					animationPlayState: isRunning ? 'running' : 'paused',
				}}
				onAnimationEnd={closeToast}
			/>
		</div>
	)
}
