import { CombinedGraphQLErrors } from '@apollo/client'
import type { ErrorLike } from '@apollo/client'

export const isNotFoundError = (error: ErrorLike): error is CombinedGraphQLErrors =>
	CombinedGraphQLErrors.is(error) &&
	(error.errors[0]?.extensions as { status?: number })?.status === 404
