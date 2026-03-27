import { useTranslation } from 'react-i18next'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_SETTINGS_FORM_ROOT } from '@constants/translationRoots.constants'
import { VALID_EMAIL_REGEX } from '@constants/user.constants'
import WritableInputField from '@components/WritableInputField/WritableInputField'
import InputFieldHelper from '@components/InputFieldHelper/InputFieldHelper'
import type { ReactNode } from 'react'
import type {
	InputProps,
	WritableInputFieldProps,
} from '@components/WritableInputField/WritableInputField'

export type EmailInputFieldProps = Partial<Omit<WritableInputFieldProps, 'idLabel'>> &
	Omit<InputProps, 'type' | 'maxLength' | 'autocomplete'> & {
		isValidationEnabled?: boolean
	}

export default function EmailInputField({
	id,
	classNameContainer,
	label,
	isErrorDisplayed,
	children,
	onValidationError,
	isValidationEnabled = true,
	...inputAttributes
}: EmailInputFieldProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)

	return (
		<WritableInputField
			classNameContainer={classNameContainer}
			label={label ?? t(USER_SETTINGS_FORM_ROOT.fields.email.label)}
			idLabel={id}
			isErrorDisplayed={isErrorDisplayed}
		>
			<WritableInputField.Input
				{...inputAttributes}
				id={id}
				type='email'
				autoComplete='email'
				maxLength={128}
				onValidationError={(isError, value, name) => {
					if (!isValidationEnabled) {
						onValidationError?.(isError, value, name)
						return
					}

					onValidationError?.(
						!VALID_EMAIL_REGEX.test(value) || isError,
						value,
						name,
					)
				}}
			/>
			{children}

			{isValidationEnabled && isErrorDisplayed ? (
				<InputFieldHelper isErrorHelper>
					{t(USER_SETTINGS_FORM_ROOT.fields.email.errorMessages.invalidEmail)}
				</InputFieldHelper>
			) : null}
		</WritableInputField>
	)
}
