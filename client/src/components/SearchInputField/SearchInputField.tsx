import { isBlankString } from '@utilities/string.utils'
import SearchIcon from '@assets/icons/SearchIcon'
import './SearchInputField.scss'
import type {
	DetailedHTMLProps,
	InputHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from 'react'
import type { PropsWithChildren } from '@customTypes/componentProps'

export type SearchInputFieldProps = PropsWithChildren<{
	className?: string
	onSearch?: (query: string) => void
}>

export default function SearchInputField({
	children,
	className = '',
	onSearch,
}: SearchInputFieldProps): ReactNode {
	return (
		<form
			className={`search-input-field ${className}`}
			action={formData => {
				const query = formData.get('query') as string

				onSearch?.(query)
			}}
		>
			{children}
		</form>
	)
}

export type InputProps = Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'type' | 'name' | 'children'
>

function Input({ className = '', ...inputAttributes }: InputProps): ReactNode {
	return (
		<input
			{...inputAttributes}
			type='text'
			name='query'
			className={`search-input-field__input ${className}`}
		/>
	)
}

export type SearchButtonProps = Omit<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'type' | 'children'
> & {
	query: string
}

function SearchButton({
	query,
	className = '',
	disabled,
	...buttonAttributes
}: SearchButtonProps): ReactNode {
	return (
		<button
			{...buttonAttributes}
			type='submit'
			className={`search-input-field__search-btn ${className}`}
			disabled={isBlankString(query) || disabled}
		>
			<SearchIcon />
		</button>
	)
}

export type ClearQueryButtonProps = Omit<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'type' | 'children'
> & {
	query: string
}

function ClearQueryButton({
	query,
	className = '',
	...buttonAttributes
}: ClearQueryButtonProps): ReactNode {
	if (!query) {
		return null
	}

	return (
		<button
			{...buttonAttributes}
			type='button'
			className={`search-input-field__clear-query-btn ${className}`}
		>
			&#x2716;
		</button>
	)
}

SearchInputField.Input = Input
SearchInputField.SearchButton = SearchButton
SearchInputField.ClearQueryButton = ClearQueryButton
