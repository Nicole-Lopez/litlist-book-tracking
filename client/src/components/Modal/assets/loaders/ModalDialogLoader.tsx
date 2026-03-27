import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { createPortal } from 'react-dom'
import ThreeDotsLoader from '@assets/loaders/ThreeDotsLoader/ThreeDotsLoader'
import '../../Modal.scss'
import type { ReactNode } from 'react'

export type ModalDialogLoaderProps = {
	classNameContainer?: string
	classNameDialog?: string
	withOverlay?: boolean
	onClose?: () => void
}

export default function ModalDialogLoader({
	classNameContainer = '',
	classNameDialog = '',
	withOverlay = true,
	onClose,
}: ModalDialogLoaderProps): ReactNode {
	useLockBodyScroll()

	return createPortal(
		<div
			className={`modal ${classNameContainer} ${
				withOverlay ? 'modal--with-overlay' : ''
			}`}
		>
			<div className={`modal__dialog modal__dialog--loader ${classNameDialog}`}>
				<ThreeDotsLoader />

				{onClose !== undefined ? (
					<button className='modal__close-btn' onClick={onClose}>
						&#x2716;
					</button>
				) : null}
			</div>
		</div>,
		document.body,
	)
}
