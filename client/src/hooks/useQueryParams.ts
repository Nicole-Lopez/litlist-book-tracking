import { useSearchParams } from 'react-router-dom'

export type UseQueryParamsReturn<QueryParamsT extends Record<string, string>> = {
	queryParams: Partial<QueryParamsT>
	setQueryParams: (updateQueryParams: Partial<QueryParamsT>) => void
}

export function useQueryParams<
	QueryParamsT extends Record<string, string>,
>(): UseQueryParamsReturn<QueryParamsT> {
	const [searchParams, setSearchParams] = useSearchParams()

	return {
		queryParams: Object.fromEntries(searchParams) as QueryParamsT,
		setQueryParams: updateQueryParams => {
			setSearchParams(prev => ({ ...prev, ...updateQueryParams }))
		},
	}
}
