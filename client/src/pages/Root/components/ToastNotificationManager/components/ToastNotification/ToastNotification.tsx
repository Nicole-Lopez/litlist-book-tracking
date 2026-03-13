import { useEffect, useRef, useState } from 'react'
import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import { removeToastNotification } from '@utilities/feedback.utils'
import SuccessIcon from '@assets/icons/SuccessIcon'
import InfoIcon from '@assets/icons/InfoIcon'
import ErrorIcon from '@assets/icons/ErrorIcon'
import WarningIcon from '@assets/icons/WarningIcon'
import InOutTransition from '@components/InOutTransition/InOutTransition'
import ProgressBar from '../ProgressBar/ProgressBar'
import './ToastNotification.scss'
import type { ReactNode, PointerEvent } from 'react'
import type { ToastNotification as ToastNotificationT } from '@models/feedback.models'

export type ToastNotificationProps = ToastNotificationT

const DRAGGABLE_PERCENT = 80
const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, [data-no-drag]'

export default function ToastNotification({
	id,
	content,
	autoCloseDuration = 15000,
	isAutoClose = true,
	type,
	toastClassName = '',
}: ToastNotificationProps): ReactNode {
	const [isRunning, setIsRunning] = useState(true)
	const toastRef = useRef<HTMLDivElement>(null)
	const dragSession = useRef({
		start: 0,
		delta: 0,
		closingDistance: 0,
		isDraggable: false,
		isMoved: false,
	}).current

	const [isClosing, setIsClosing] = useState(false)

	const playToast = (): void => {
		setIsRunning(true)
	}

	const pauseToast = (): void => {
		setIsRunning(false)
	}

	const closeToast = (): void => {
		setIsClosing(true)
	}

	const onDragStart = (e: PointerEvent): void => {
		if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return
		e.currentTarget.setPointerCapture(e.pointerId)

		const toastElement = toastRef.current

		if (toastElement) {
			dragSession.isMoved = false

			dragSession.isDraggable = true
			dragSession.start = e.clientX
			dragSession.closingDistance =
				toastElement.offsetWidth * (DRAGGABLE_PERCENT / 100)
		}
	}

	const onDragMove = (e: PointerEvent): void => {
		const toastElement = toastRef.current

		if (dragSession.isDraggable && toastElement) {
			dragSession.isMoved = true
			if (isRunning) pauseToast()
			dragSession.delta = e.clientX - dragSession.start

			toastElement.style.transform = `translate3d(${dragSession.delta}px, 0,0)`
			toastElement.style.opacity = `${
				1 - Math.abs(dragSession.delta / dragSession.closingDistance)
			}`
		}
	}

	const onDragEnd = (e: PointerEvent): void => {
		const toastElement = toastRef.current
		if (!toastElement) return

		e.currentTarget.releasePointerCapture(e.pointerId)

		if (!dragSession.isDraggable) return

		dragSession.isDraggable = false

		if (
			dragSession.isMoved &&
			Math.abs(dragSession.delta) > dragSession.closingDistance
		) {
			closeToast()
			return
		}

		toastElement.style.removeProperty('transform')
		toastElement.style.removeProperty('opacity')

		dragSession.delta = 0
		dragSession.isMoved = false
	}

	useEffect(() => {
		const handleVisibilityChange = (): void => {
			if (document.hidden) {
				pauseToast()
			} else {
				playToast()
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])

	return (
		<InOutTransition
			className={`toast-notification ${
				isClosing ? 'toast-notification--shrink' : ''
			}`}
			hiddenClassName='toast-notification--hidden'
			isOut={isClosing}
			outDuration={500}
			onOutEnd={() => {
				removeToastNotification(id)
			}}
		>
			<div
				ref={toastRef}
				id={id}
				tabIndex={0}
				className={`toast-notification__toast toast-notification__toast--${
					type === FEEDBACK_TYPES.error
						? 'error'
						: type === FEEDBACK_TYPES.info
							? 'info'
							: type === FEEDBACK_TYPES.success
								? 'success'
								: 'warning'
				} ${toastClassName}`}
				onPointerDown={onDragStart}
				onPointerMove={onDragMove}
				onPointerUp={onDragEnd}
				onPointerEnter={pauseToast}
				onPointerLeave={playToast}
			>
				{type === FEEDBACK_TYPES.error ? (
					<ErrorIcon />
				) : type === FEEDBACK_TYPES.info ? (
					<InfoIcon />
				) : type === FEEDBACK_TYPES.success ? (
					<SuccessIcon />
				) : (
					<WarningIcon />
				)}

				<p className='toast-notification__message'>{content}</p>

				<button
					data-no-drag
					className='toast-notification__close-btn'
					onClick={closeToast}
				>
					&#x2716;
				</button>

				{isAutoClose ? (
					<ProgressBar
						autoClose={autoCloseDuration}
						isRunning={isRunning}
						closeToast={closeToast}
					/>
				) : null}
			</div>
		</InOutTransition>
	)
}
