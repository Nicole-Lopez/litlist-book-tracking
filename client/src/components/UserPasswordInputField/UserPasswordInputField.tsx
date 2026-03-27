import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToggle } from '@hooks/useToggle'
import {
	USER_PASSWORD_MAX_LENGTH,
	USER_PASSWORD_MIN_LENGTH,
	VALID_USER_PASSWORD_REGEX,
} from '@constants/user.constants'
import { USER_SETTINGS_FORM_ROOT } from '@constants/translationRoots.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { getHomeRoute } from '@router/routeFormatters.utils'
import HidePasswordIcon from './assets/icons/HidePasswordIcon'
import ShowPasswordIcon from './assets/icons/ShowPasswordIcon'
import WritableInputField from '@components/WritableInputField/WritableInputField'
import InputRequirementList from '@components/InputRequirementList/InputRequirementList'
import Link from '@components/Link/Link'
import './UserPasswordInputField.scss'
import type { ReactNode } from 'react'
import type {
	InputProps,
	WritableInputFieldProps,
} from '@components/WritableInputField/WritableInputField'

export type UserPasswordInputFieldProps = Partial<
	Omit<WritableInputFieldProps, 'idLabel'>
> &
	Omit<InputProps, 'type' | 'maxLength' | 'className'> & {
		isRequirementsDisplayed?: boolean
		isResetPasswordLinkDisplayed?: boolean
		isValidationEnabled?: boolean
	}

export default function UserPasswordInputField({
	id,
	label,
	isErrorDisplayed,
	children,
	classNameContainer = '',
	isRequirementsDisplayed = false,
	isResetPasswordLinkDisplayed = false,
	isValidationEnabled = true,
	onValidationError,
	disabled,
	autoComplete,
	...inputAttributes
}: UserPasswordInputFieldProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const [isPasswordVisible, togglePasswordVisible] = useToggle()
	const [passwordValidity, setPasswordValidity] = useState({
		length: false,
		content: false,
	})

	return (
		<WritableInputField
			classNameContainer={`user-password-input-field ${classNameContainer}`}
			label={label ?? t(USER_SETTINGS_FORM_ROOT.fields.password.label)}
			idLabel={id}
			isErrorDisplayed={isErrorDisplayed}
		>
			<WritableInputField.Input
				{...inputAttributes}
				id={id}
				type={isPasswordVisible ? 'text' : 'password'}
				autoComplete={autoComplete ?? 'current-password'}
				maxLength={USER_PASSWORD_MAX_LENGTH}
				disabled={disabled}
				className='user-password-input-field__input'
				onValidationError={(isError, value, name) => {
					if (!isValidationEnabled) {
						onValidationError?.(isError, value, name)
						return
					}

					const isLengthValid = value.length >= USER_PASSWORD_MIN_LENGTH
					const isContentValid = VALID_USER_PASSWORD_REGEX.test(value)

					setPasswordValidity({
						length: isLengthValid,
						content: isContentValid,
					})

					onValidationError?.(
						!isLengthValid || !isContentValid || isError,
						value,
						name,
					)
				}}
			/>

			{children}

			<button
				type='button'
				onClick={togglePasswordVisible}
				className='user-password-input-field__visibility-toggle-btn'
				disabled={disabled}
			>
				{isPasswordVisible ? <HidePasswordIcon /> : <ShowPasswordIcon />}
			</button>

			{isResetPasswordLinkDisplayed ? (
				<Link
					to={getHomeRoute()}
					className='user-password-input-field__reset-password-link'
				>
					{t(USER_SETTINGS_FORM_ROOT.fields.password.resetPasswordLabel)}
				</Link>
			) : null}

			{isRequirementsDisplayed ? (
				<InputRequirementList>
					<InputRequirementList.Requirement
						isCompleted={passwordValidity.length}
					>
						{t(USER_SETTINGS_FORM_ROOT.fields.password.requirements.length)}
					</InputRequirementList.Requirement>

					<InputRequirementList.Requirement
						isCompleted={passwordValidity.content}
					>
						{t(USER_SETTINGS_FORM_ROOT.fields.password.requirements.content)}
					</InputRequirementList.Requirement>
				</InputRequirementList>
			) : null}
		</WritableInputField>
	)
}
