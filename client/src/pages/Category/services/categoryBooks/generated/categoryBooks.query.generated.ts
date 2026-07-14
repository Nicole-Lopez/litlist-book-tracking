/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from '@services/books/api/generated/enums.generated.ts';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GqlCategoryBooksQueryVariables = Exact<{
  category: Types.GqlCategory;
}>;


export type GqlCategoryBooksQuery = { booksByCategory: Array<{ __typename: 'BookPreview', publishedYear: number | null, pageCount: number | null, categories: Array<string> | null, contentWarnings: Array<string> | null, id: string, isExternalId: boolean, title: string, authors: Array<string> | null, cover: string | null, isbn10: string | null, isbn13: string | null }> | null };


export const CategoryBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booksByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookPreviewCatalog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookPreviewBasic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookPreviewCatalog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookPreviewBasic"}},{"kind":"Field","name":{"kind":"Name","value":"publishedYear"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"contentWarnings"}}]}}]} as unknown as DocumentNode<GqlCategoryBooksQuery, GqlCategoryBooksQueryVariables>;