import { useTranslation } from 'react-i18next'
import { useHandleFormData } from '@hooks/useHandleFormData'
import { useHandleFormErrors } from '@hooks/useHandleFormErrors'
import { useAuthAccessContext } from '../../../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { USER_SETTINGS_FORM_ROOT } from '@constants/translationRoots.constants'
import { PANEL_ROOT } from '../../../../constants/translationRoots.constants'
import { createAccount } from '@services/user/auth/auth.service'
import { generateKeyMirror, mapValues } from '@utilities/object.utils'
import EmailInputField from '@components/EmailInputField/EmailInputField'
import UsernameInputField from '@components/UsernameInputField/UsernameInputField'
import UserPasswordInputField from '@components/UserPasswordInputField/UserPasswordInputField'
import InputFieldHelper from '@components/InputFieldHelper/InputFieldHelper'
import Panel from '../../../Panel/Panel'
import type { ReactNode } from 'react'

const INITIAL_FORM_DATA = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}
const INITIAL_FORM_ERRORS = mapValues(INITIAL_FORM_DATA, () => false)
const FORM_KEYS = generateKeyMirror(INITIAL_FORM_DATA)

export default function Form(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { handleAuthAccess, isLoading } = useAuthAccessContext()
	const { formData, onChangeFormValue, isSomeFieldEmpty } =
		useHandleFormData(INITIAL_FORM_DATA)

	const { formErrors, onFormValidation, isSomeFieldError, setFormErrors } =
		useHandleFormErrors(INITIAL_FORM_ERRORS)

	const onSubmit = (): void => {
		handleAuthAccess(async () => {
			await createAccount(formData.email, formData.password, formData.username)
		})
	}

	return (
		<form noValidate action={onSubmit}>
			<UsernameInputField
				id={`${FORM_KEYS.username}-sign-up`}
				name={FORM_KEYS.username}
				isErrorDisplayed={formErrors.username}
				onValidationError={onFormValidation}
				onChange={onChangeFormValue}
				value={formData.username}
				isRequirementsDisplayed
				isNonEmpty
				disabled={isLoading}
			/>

			<EmailInputField
				id={`${FORM_KEYS.email}-sign-up`}
				name={FORM_KEYS.email}
				isErrorDisplayed={formErrors.email}
				onValidationError={onFormValidation}
				onChange={onChangeFormValue}
				value={formData.email}
				isNonEmpty
				disabled={isLoading}
			/>

			<UserPasswordInputField
				id={`${FORM_KEYS.password}-sign-up`}
				name={FORM_KEYS.password}
				isErrorDisplayed={formErrors.password}
				onValidationError={(isError, value, name) => {
					setFormErrors(errors => ({
						...errors,
						[name]: isError,
						confirmPassword: value !== formData.confirmPassword,
					}))
				}}
				onChange={onChangeFormValue}
				value={formData.password}
				isRequirementsDisplayed
				isNonEmpty
				disabled={isLoading}
			/>

			<UserPasswordInputField
				label={t(USER_SETTINGS_FORM_ROOT.fields.confirmPassword.label)}
				id={`${FORM_KEYS.confirmPassword}-sign-up`}
				name={FORM_KEYS.confirmPassword}
				autoComplete='new-password'
				isErrorDisplayed={formErrors.confirmPassword}
				isValidationEnabled={false}
				onValidationError={(isError, value, name) => {
					onFormValidation(formData.password !== value || isError, value, name)
				}}
				onChange={onChangeFormValue}
				value={formData.confirmPassword}
				isNonEmpty
				disabled={isLoading}
			>
				{formErrors.confirmPassword ? (
					<InputFieldHelper isErrorHelper>
						{t(
							USER_SETTINGS_FORM_ROOT.fields.confirmPassword.errorMessages
								.notMatch,
						)}
					</InputFieldHelper>
				) : null}
			</UserPasswordInputField>

			<Panel.SubmitButton
				type='submit'
				disabled={isSomeFieldEmpty || isSomeFieldError}
			>
				{t(PANEL_ROOT.actions.signUp)}
			</Panel.SubmitButton>
		</form>
	)
}
