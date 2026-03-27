import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { createPortal } from 'react-dom'
import DelayedUnmount from '@components/DelayedUnmount/DelayedUnmount'
import './Modal.scss'
import type { ReactNode, ReactPortal } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'
import type { WithRequired } from '@customTypes/customUtilityTypes'

export type ModalProps = PropsWithChildren<{
	isOpen?: boolean
	className?: string
	withOverlay?: boolean
	isAnimated?: boolean
}>

export default function Modal({
	isOpen = true,
	isAnimated = false,
	...modalProps
}: ModalProps): ReactNode {
	if (isAnimated) {
		return <ModalWithTransition {...modalProps} isOpen={isOpen} />
	}
	if (!isOpen) {
		return null
	}

	return createPortal(<ModalContent {...modalProps} />, document.body)
}

type ModalWithTransitionProps = Omit<WithRequired<ModalProps, 'isOpen'>, 'isAnimated'>

function ModalWithTransition({
	isOpen,
	...modalProps
}: ModalWithTransitionProps): ReactPortal {
	return createPortal(
		<div className={`modal-transition ${isOpen ? 'modal-transition--open' : ''}`}>
			<DelayedUnmount isVisible={isOpen} delay={200}>
				<ModalContent {...modalProps} />
			</DelayedUnmount>
		</div>,
		document.body,
	)
}

type ModalContentProps = Omit<ModalProps, 'isAnimated' | 'isOpen'>

function ModalContent({
	children,
	className = '',
	withOverlay = true,
}: ModalContentProps): ReactNode {
	useLockBodyScroll()

	return (
		<div className={`modal ${className} ${withOverlay ? 'modal--with-overlay' : ''}`}>
			{children}
		</div>
	)
}

export type DialogProps = PropsWithChildren<{
	className?: string
}>

function Dialog({ children, className = '' }: DialogProps): ReactNode {
	return <div className={`modal__dialog ${className}`}>{children}</div>
}

export type CloseButtonProps = {
	onClose: () => void
	className?: string
	disabled?: boolean
}

function CloseButton({ onClose, className = '', disabled }: CloseButtonProps): ReactNode {
	return (
		<button
			className={`modal__close-btn ${className}`}
			onClick={onClose}
			disabled={disabled}
		>
			&#x2716;
		</button>
	)
}

export type TitleProps = PropsWithChildren<{
	className?: string
}>

function Title({ children, className = '' }: TitleProps): ReactNode {
	return <h1 className={`modal__title ${className}`}>{children}</h1>
}

Modal.Dialog = Dialog
Modal.CloseButton = CloseButton
Modal.Title = Title
