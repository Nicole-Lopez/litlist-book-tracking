import { useTranslation } from 'react-i18next'
import { useUnauthContext } from '@contexts/UserContext/userContext'
import { useAuthAccessContext } from '../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FEEDBACK_TYPES } from '@constants/feedback.constants'
import { USER_TRANSLATION_ROOT } from '@services/internationalization/roots/user.constants'
import { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'
import { authWithGoogle } from '@services/user/auth/auth.service'
import GoogleIcon from '@assets/icons/GoogleIcon'
import Modal from '@components/Modal/Modal'
import AlertInline from '@components/AlertInline/AlertInline'
import ButtonWithLoader from '@components/ButtonWithLoader/ButtonWithLoader'
import './Panel.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type PanelProps = PropsWithChildren<{
	className?: string
	title: string
}>

export default function Panel({
	className = '',
	children,
	title,
}: PanelProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { toggleAuthAccessModalOpen } = useUnauthContext()
	const { isLoading, serverError } = useAuthAccessContext()

	return (
		<Modal.Dialog
			className={`auth-access-modal-panel ${
				isLoading ? 'auth-access-modal-panel--loading' : ''
			} ${className}`}
		>
			<Modal.CloseButton onClose={toggleAuthAccessModalOpen} disabled={isLoading} />

			<Modal.Title>{title}</Modal.Title>

			{serverError ? (
				<AlertInline type={FEEDBACK_TYPES.error}>
					{t(
						serverError === AUTH_ERROR_TYPES.emailAlreadyInUse
							? USER_TRANSLATION_ROOT.errorMessages.emailAlreadyInUse
							: serverError === AUTH_ERROR_TYPES.invalidCredentials
								? USER_TRANSLATION_ROOT.errorMessages.invalidCredentials
								: USER_TRANSLATION_ROOT.errorMessages.networkError,
					)}
				</AlertInline>
			) : null}

			{children}
		</Modal.Dialog>
	)
}

export type AuthProviderButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function AuthProviderButton({
	className = '',
	disabled,
	...props
}: AuthProviderButtonProps): ReactNode {
	const { isLoading } = useAuthAccessContext()

	return (
		<button
			{...props}
			className={`auth-access-modal-panel__auth-provider-btn ${className}`}
			disabled={isLoading || disabled}
		/>
	)
}

export type GoogleAuthButtonProps = Omit<AuthProviderButtonProps, 'onClick'>

function GoogleAuthButton({ children, ...props }: GoogleAuthButtonProps): ReactNode {
	const { submitAuth } = useAuthAccessContext()

	const onAuth = (): void => {
		submitAuth(authWithGoogle)
	}

	return (
		<AuthProviderButton {...props} onClick={onAuth}>
			<GoogleIcon />
			{children}
		</AuthProviderButton>
	)
}

function Divider(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)

	return (
		<p className='auth-access-modal-panel__divider'>
			{t(USER_TRANSLATION_ROOT.authAccess.divider)}
		</p>
	)
}

export type ChangePanelButtonProps = {
	label: string
	actionLabel: string
	onClick: () => void
}

function ChangePanelButton({
	label,
	actionLabel,
	onClick,
}: ChangePanelButtonProps): ReactNode {
	const { setServerError, isLoading } = useAuthAccessContext()

	return (
		<p className='auth-access-modal-panel__change-panel'>
			{label}

			<button
				onClick={() => {
					setServerError(null)
					onClick()
				}}
				disabled={isLoading}
			>
				{actionLabel}
			</button>
		</p>
	)
}

export type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function SubmitButton({
	className = '',
	children,
	disabled,
	...props
}: SubmitButtonProps): ReactNode {
	const { isLoading } = useAuthAccessContext()

	return (
		<ButtonWithLoader
			{...props}
			className={`auth-access-modal-panel__submit-btn ${className}`}
			disabled={isLoading || disabled}
			isLoading={isLoading}
		>
			{children}
		</ButtonWithLoader>
	)
}

Panel.AuthProviderButton = AuthProviderButton
Panel.GoogleAuthButton = GoogleAuthButton
Panel.Divider = Divider
Panel.ChangePanelButton = ChangePanelButton
Panel.SubmitButton = SubmitButton
