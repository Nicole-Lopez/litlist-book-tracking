import { useTranslation } from 'react-i18next'
import { useHandleFormData } from '@hooks/useHandleFormData'
import { useHandleFormErrors } from '@hooks/useHandleFormErrors'
import { useAuthAccessContext } from '../../../../contexts/AuthAccessContext/authAccessContext'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { AUTH_ERROR_TYPES } from '@services/user/auth/auth.constants'
import { PANEL_ROOT } from '../../../../constants/translationRoots.constants'
import { signInAccount } from '@services/user/auth/auth.service'
import { generateKeyMirror, mapValues } from '@utilities/object.utils'
import EmailInputField from '@components/EmailInputField/EmailInputField'
import UserPasswordInputField from '@components/UserPasswordInputField/UserPasswordInputField'
import Panel from '../../../Panel/Panel'
import type { ReactNode } from 'react'

const INITIAL_FORM_DATA = {
	email: '',
	password: '',
}
const INITIAL_FORM_ERRORS = mapValues(INITIAL_FORM_DATA, () => false)

const FORM_KEYS = generateKeyMirror(INITIAL_FORM_DATA)

export default function Form(): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.user)
	const { handleAuthAccess, isLoading } = useAuthAccessContext()
	const { formData, onChangeFormValue, isSomeFieldEmpty } =
		useHandleFormData(INITIAL_FORM_DATA)
	const { onFormValidation, isSomeFieldError } =
		useHandleFormErrors(INITIAL_FORM_ERRORS)

	const onSubmit = (): void => {
		handleAuthAccess(async () => {
			if (isSomeFieldEmpty || isSomeFieldError) {
				throw new Error(AUTH_ERROR_TYPES.invalidCredentials)
			}

			await signInAccount(formData.email, formData.password)
		})
	}

	return (
		<form noValidate action={onSubmit}>
			<EmailInputField
				id={`${FORM_KEYS.email}-sign-in`}
				name={FORM_KEYS.email}
				value={formData.email}
				onChange={onChangeFormValue}
				onValidationError={onFormValidation}
				isNonEmpty
				disabled={isLoading}
			/>

			<UserPasswordInputField
				id={`${FORM_KEYS.password}-sign-in`}
				name={FORM_KEYS.password}
				isResetPasswordLinkDisplayed
				value={formData.password}
				onChange={onChangeFormValue}
				onValidationError={onFormValidation}
				isNonEmpty
				disabled={isLoading}
			/>

			<Panel.SubmitButton type='submit'>
				{t(PANEL_ROOT.actions.signIn)}
			</Panel.SubmitButton>
		</form>
	)
}
