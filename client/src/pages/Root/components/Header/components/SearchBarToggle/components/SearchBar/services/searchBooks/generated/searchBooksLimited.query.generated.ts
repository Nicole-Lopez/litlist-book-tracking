/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from '@services/books/generated/graphql.generated.ts';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GqlSearchBooksLimitedQueryVariables = Exact<{
  query: string;
  limit: number;
}>;


export type GqlSearchBooksLimitedQuery = { searchBooks: { __typename: 'SearchBooksResult', totalCount: number, books: Array<{ __typename: 'BookPreview', id: string, isExternalId: boolean, title: string, authors: Array<string> | null, cover: string | null, isbn10: string | null, isbn13: string | null }> | null } };


export const SearchBooksLimitedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchBooksLimited"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookPreviewBasic"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookPreviewBasic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}}]}}]} as unknown as DocumentNode<GqlSearchBooksLimitedQuery, GqlSearchBooksLimitedQueryVariables>;