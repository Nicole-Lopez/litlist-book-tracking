import type { GraphQLResolveInfo } from 'graphql';
import type { ContextServer } from '../index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GqlBestSellersList = {
  __typename?: 'BestSellersList';
  books: Array<GqlBookSummary>;
  id: Scalars['ID']['output'];
  latestUpdate: Scalars['String']['output'];
  listName: GqlBestSellersListName;
};

export const enum GqlBestSellersListName {
  Childrens = 'CHILDRENS',
  Fiction = 'FICTION',
  GraphicBooksAndManga = 'GRAPHIC_BOOKS_AND_MANGA',
  NonFiction = 'NON_FICTION',
  YoungAdult = 'YOUNG_ADULT'
};

export type GqlBookDetails = {
  __typename?: 'BookDetails';
  authors?: Maybe<Array<Scalars['String']['output']>>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  characters?: Maybe<Array<Scalars['String']['output']>>;
  contentWarnings?: Maybe<Array<Scalars['String']['output']>>;
  cover?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isExternalId: Scalars['Boolean']['output'];
  isbn10?: Maybe<Scalars['String']['output']>;
  isbn13?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  publishedDate?: Maybe<Scalars['String']['output']>;
  publishedYear?: Maybe<Scalars['Int']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  relatedBooks?: Maybe<Array<GqlBookSummary>>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GqlBookDetailsInput = {
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  isExternalId: Scalars['Boolean']['input'];
  isbn10?: InputMaybe<Scalars['String']['input']>;
  isbn13?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type GqlBookPreview = {
  __typename?: 'BookPreview';
  authors?: Maybe<Array<Scalars['String']['output']>>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  contentWarnings?: Maybe<Array<Scalars['String']['output']>>;
  cover?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isExternalId: Scalars['Boolean']['output'];
  isbn10?: Maybe<Scalars['String']['output']>;
  isbn13?: Maybe<Scalars['String']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  publishedYear?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type GqlBookSummary = {
  __typename?: 'BookSummary';
  authors?: Maybe<Array<Scalars['String']['output']>>;
  cover?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isExternalId: Scalars['Boolean']['output'];
  isbn10?: Maybe<Scalars['String']['output']>;
  isbn13?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export const enum GqlCategory {
  Art = 'ART',
  Business = 'BUSINESS',
  Childrens = 'CHILDRENS',
  Classics = 'CLASSICS',
  Fantasy = 'FANTASY',
  Fiction = 'FICTION',
  GraphicBooksAndManga = 'GRAPHIC_BOOKS_AND_MANGA',
  Horror = 'HORROR',
  Lgbtq = 'LGBTQ',
  Mystery = 'MYSTERY',
  NonFiction = 'NON_FICTION',
  Philosophy = 'PHILOSOPHY',
  Poetry = 'POETRY',
  Religion = 'RELIGION',
  Romance = 'ROMANCE',
  ScienceFiction = 'SCIENCE_FICTION',
  Thriller = 'THRILLER',
  YoungAdult = 'YOUNG_ADULT'
};

export type GqlQuery = {
  __typename?: 'Query';
  bestSellersLists?: Maybe<Array<GqlBestSellersList>>;
  bookDetails?: Maybe<GqlBookDetails>;
  booksByCategory?: Maybe<Array<GqlBookPreview>>;
  searchBooks: GqlSearchBooksResult;
};


export type GqlQueryBookDetailsArgs = {
  book: GqlBookDetailsInput;
};


export type GqlQueryBooksByCategoryArgs = {
  category: GqlCategory;
};


export type GqlQuerySearchBooksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type GqlSearchBooksResult = {
  __typename?: 'SearchBooksResult';
  books?: Maybe<Array<GqlBookPreview>>;
  totalCount: Scalars['Int']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = {
  BestSellersList: ResolverTypeWrapper<GqlBestSellersList>;
  BestSellersListName: GqlBestSellersListName;
  BookDetails: ResolverTypeWrapper<GqlBookDetails>;
  BookDetailsInput: GqlBookDetailsInput;
  BookPreview: ResolverTypeWrapper<GqlBookPreview>;
  BookSummary: ResolverTypeWrapper<GqlBookSummary>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: GqlCategory;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SearchBooksResult: ResolverTypeWrapper<GqlSearchBooksResult>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = {
  BestSellersList: GqlBestSellersList;
  BookDetails: GqlBookDetails;
  BookDetailsInput: GqlBookDetailsInput;
  BookPreview: GqlBookPreview;
  BookSummary: GqlBookSummary;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: Record<PropertyKey, never>;
  SearchBooksResult: GqlSearchBooksResult;
  String: Scalars['String']['output'];
};

export type GqlBestSellersListResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BestSellersList'] = GqlResolversParentTypes['BestSellersList']> = {
  books?: Resolver<Array<GqlResolversTypes['BookSummary']>, ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  latestUpdate?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  listName?: Resolver<GqlResolversTypes['BestSellersListName'], ParentType, ContextType>;
};

export type GqlBookDetailsResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookDetails'] = GqlResolversParentTypes['BookDetails']> = {
  authors?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  characters?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  contentWarnings?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isExternalId?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  isbn10?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  isbn13?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  publishedDate?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  publishedYear?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  relatedBooks?: Resolver<Maybe<Array<GqlResolversTypes['BookSummary']>>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
};

export type GqlBookPreviewResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookPreview'] = GqlResolversParentTypes['BookPreview']> = {
  authors?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  contentWarnings?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isExternalId?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  isbn10?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  isbn13?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  publishedYear?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
};

export type GqlBookSummaryResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookSummary'] = GqlResolversParentTypes['BookSummary']> = {
  authors?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isExternalId?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  isbn10?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  isbn13?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
};

export type GqlQueryResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = {
  bestSellersLists?: Resolver<Maybe<Array<GqlResolversTypes['BestSellersList']>>, ParentType, ContextType>;
  bookDetails?: Resolver<Maybe<GqlResolversTypes['BookDetails']>, ParentType, ContextType, RequireFields<GqlQueryBookDetailsArgs, 'book'>>;
  booksByCategory?: Resolver<Maybe<Array<GqlResolversTypes['BookPreview']>>, ParentType, ContextType, RequireFields<GqlQueryBooksByCategoryArgs, 'category'>>;
  searchBooks?: Resolver<GqlResolversTypes['SearchBooksResult'], ParentType, ContextType, RequireFields<GqlQuerySearchBooksArgs, 'query'>>;
};

export type GqlSearchBooksResultResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['SearchBooksResult'] = GqlResolversParentTypes['SearchBooksResult']> = {
  books?: Resolver<Maybe<Array<GqlResolversTypes['BookPreview']>>, ParentType, ContextType>;
  totalCount?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
};

export type GqlResolvers<ContextType = ContextServer> = {
  BestSellersList?: GqlBestSellersListResolvers<ContextType>;
  BookDetails?: GqlBookDetailsResolvers<ContextType>;
  BookPreview?: GqlBookPreviewResolvers<ContextType>;
  BookSummary?: GqlBookSummaryResolvers<ContextType>;
  Query?: GqlQueryResolvers<ContextType>;
  SearchBooksResult?: GqlSearchBooksResultResolvers<ContextType>;
};

