import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_SETTINGS_FORM_ROOT } from '@constants/translationRoots.constants'
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	VALID_USERNAME_REGEX,
} from '@constants/user.constants'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import WritableInputField from '@components/WritableInputField/WritableInputField'
import InputRequirementList from '@components/InputRequirementList/InputRequirementList'
import type { ReactNode } from 'react'
import type {
	InputProps,
	WritableInputFieldProps,
} from '@components/WritableInputField/WritableInputField'

export type UsernameInputFieldProps = Partial<Omit<WritableInputFieldProps, 'idLabel'>> &
	Omit<InputProps, 'type' | 'maxLength' | 'autocomplete'> & {
		isRequirementsDisplayed?: boolean
	}

export default function UsernameInputField({
	id,
	label,
	classNameContainer,
	isErrorDisplayed,
	onValidationError,
	children,
	isRequirementsDisplayed = false,
	...inputAttributes
}: UsernameInputFieldProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const [usernameValidity, setUsernameValidity] = useState({
		length: false,
		content: false,
	})

	return (
		<WritableInputField
			classNameContainer={classNameContainer}
			label={label ?? t(USER_SETTINGS_FORM_ROOT.fields.username.label)}
			idLabel={id}
			isErrorDisplayed={isErrorDisplayed}
		>
			<WritableInputField.Input
				{...inputAttributes}
				id={id}
				type='text'
				autoComplete='username'
				maxLength={USERNAME_MAX_LENGTH}
				onValidationError={(isError, value, name) => {
					const isUsernameLengthValid = value.length >= USERNAME_MIN_LENGTH
					const isUsernameValid = VALID_USERNAME_REGEX.test(value)

					setUsernameValidity({
						length: isUsernameLengthValid,
						content: isUsernameValid,
					})

					onValidationError?.(
						!isUsernameLengthValid || !isUsernameValid || isError,
						value,
						name,
					)
				}}
			/>
			{children}

			{isRequirementsDisplayed ? (
				<InputRequirementList>
					<InputRequirementList.Requirement
						isCompleted={usernameValidity.length}
					>
						{t(USER_SETTINGS_FORM_ROOT.fields.username.requirements.length)}
					</InputRequirementList.Requirement>
					<InputRequirementList.Requirement
						isCompleted={usernameValidity.content}
					>
						{t(USER_SETTINGS_FORM_ROOT.fields.username.requirements.content)}
					</InputRequirementList.Requirement>
				</InputRequirementList>
			) : null}
		</WritableInputField>
	)
}
