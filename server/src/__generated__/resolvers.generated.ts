import { GraphQLResolveInfo } from 'graphql';
import { ContextServer } from '../index';
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
  last_modified: Scalars['String']['output'];
  listName: GqlBestSellersListsAvailable;
};

export enum GqlBestSellersListsAvailable {
  GraphicBooksAndManga = 'GRAPHIC_BOOKS_AND_MANGA',
  HardcoverFiction = 'HARDCOVER_FICTION',
  HardcoverNonfiction = 'HARDCOVER_NONFICTION',
  MiddleGradeHardcover = 'MIDDLE_GRADE_HARDCOVER',
  PaperbackFiction = 'PAPERBACK_FICTION',
  PaperbackNonfiction = 'PAPERBACK_NONFICTION',
  PrintAndEbookFiction = 'PRINT_AND_EBOOK_FICTION',
  PrintAndEbookNonfiction = 'PRINT_AND_EBOOK_NONFICTION',
  YoungAdultHardcover = 'YOUNG_ADULT_HARDCOVER'
}

export type GqlBookAdditionalInfo = {
  __typename?: 'BookAdditionalInfo';
  language?: Maybe<Scalars['String']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  publishedDate?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
};

export type GqlBookCategoriesDetail = {
  __typename?: 'BookCategoriesDetail';
  person?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  place?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  subject?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type GqlBookDetail = {
  __typename?: 'BookDetail';
  additionalInfo: GqlBookAdditionalInfo;
  authors: Array<Scalars['String']['output']>;
  categories?: Maybe<GqlBookCategoriesDetail>;
  cover: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GqlBookPreview = {
  __typename?: 'BookPreview';
  authors: Array<Scalars['String']['output']>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  cover: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isGoogleID: Scalars['Boolean']['output'];
  isbn?: Maybe<Array<Scalars['String']['output']>>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  publishedYear?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type GqlBookSummary = {
  __typename?: 'BookSummary';
  authors: Array<Scalars['String']['output']>;
  cover: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isGoogleID: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export enum GqlCategoriesAvailable {
  Action = 'ACTION',
  Art = 'ART',
  Childrens = 'CHILDRENS',
  Comics = 'COMICS',
  Fantasy = 'FANTASY',
  Fiction = 'FICTION',
  Horror = 'HORROR',
  Mystery = 'MYSTERY',
  NonFiction = 'NON_FICTION',
  Philosophy = 'PHILOSOPHY',
  Religion = 'RELIGION',
  Romance = 'ROMANCE',
  ScienceFiction = 'SCIENCE_FICTION',
  Suspense = 'SUSPENSE',
  Thriller = 'THRILLER',
  Travel = 'TRAVEL',
  Vampires = 'VAMPIRES',
  Werewolves = 'WEREWOLVES',
  YoungAdultFiction = 'YOUNG_ADULT_FICTION'
}

export type GqlQuery = {
  __typename?: 'Query';
  allBestSellersLists?: Maybe<Array<GqlBestSellersList>>;
  bookDetail?: Maybe<GqlBookDetail>;
  booksByAuthor?: Maybe<Array<GqlBookSummary>>;
  booksByCategory?: Maybe<Array<GqlBookPreview>>;
  findBookId?: Maybe<Scalars['ID']['output']>;
  searchBooks?: Maybe<Array<GqlBookPreview>>;
  searchLimitedBooks?: Maybe<GqlSearchLimitedBooks>;
};


export type GqlQueryBookDetailArgs = {
  id: Scalars['ID']['input'];
};


export type GqlQueryBooksByAuthorArgs = {
  author: Scalars['String']['input'];
};


export type GqlQueryBooksByCategoryArgs = {
  subject: GqlCategoriesAvailable;
};


export type GqlQueryFindBookIdArgs = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type GqlQuerySearchBooksArgs = {
  term: Scalars['String']['input'];
};


export type GqlQuerySearchLimitedBooksArgs = {
  term: Scalars['String']['input'];
};

export type GqlSearchLimitedBooks = {
  __typename?: 'SearchLimitedBooks';
  books: Array<GqlBookSummary>;
  length: Scalars['Int']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = ResolversObject<{
  BestSellersList: ResolverTypeWrapper<GqlBestSellersList>;
  BestSellersListsAvailable: GqlBestSellersListsAvailable;
  BookAdditionalInfo: ResolverTypeWrapper<GqlBookAdditionalInfo>;
  BookCategoriesDetail: ResolverTypeWrapper<GqlBookCategoriesDetail>;
  BookDetail: ResolverTypeWrapper<GqlBookDetail>;
  BookPreview: ResolverTypeWrapper<GqlBookPreview>;
  BookSummary: ResolverTypeWrapper<GqlBookSummary>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategoriesAvailable: GqlCategoriesAvailable;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SearchLimitedBooks: ResolverTypeWrapper<GqlSearchLimitedBooks>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = ResolversObject<{
  BestSellersList: GqlBestSellersList;
  BookAdditionalInfo: GqlBookAdditionalInfo;
  BookCategoriesDetail: GqlBookCategoriesDetail;
  BookDetail: GqlBookDetail;
  BookPreview: GqlBookPreview;
  BookSummary: GqlBookSummary;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  SearchLimitedBooks: GqlSearchLimitedBooks;
  String: Scalars['String']['output'];
}>;

export type GqlBestSellersListResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BestSellersList'] = GqlResolversParentTypes['BestSellersList']> = ResolversObject<{
  books?: Resolver<Array<GqlResolversTypes['BookSummary']>, ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  last_modified?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  listName?: Resolver<GqlResolversTypes['BestSellersListsAvailable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlBookAdditionalInfoResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookAdditionalInfo'] = GqlResolversParentTypes['BookAdditionalInfo']> = ResolversObject<{
  language?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  publishedDate?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlBookCategoriesDetailResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookCategoriesDetail'] = GqlResolversParentTypes['BookCategoriesDetail']> = ResolversObject<{
  person?: Resolver<Maybe<Array<Maybe<GqlResolversTypes['String']>>>, ParentType, ContextType>;
  place?: Resolver<Maybe<Array<Maybe<GqlResolversTypes['String']>>>, ParentType, ContextType>;
  subject?: Resolver<Maybe<Array<Maybe<GqlResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlBookDetailResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookDetail'] = GqlResolversParentTypes['BookDetail']> = ResolversObject<{
  additionalInfo?: Resolver<GqlResolversTypes['BookAdditionalInfo'], ParentType, ContextType>;
  authors?: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<GqlResolversTypes['BookCategoriesDetail']>, ParentType, ContextType>;
  cover?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlBookPreviewResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookPreview'] = GqlResolversParentTypes['BookPreview']> = ResolversObject<{
  authors?: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  cover?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isGoogleID?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  isbn?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  publishedYear?: Resolver<Maybe<GqlResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlBookSummaryResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['BookSummary'] = GqlResolversParentTypes['BookSummary']> = ResolversObject<{
  authors?: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>;
  cover?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isGoogleID?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlQueryResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = ResolversObject<{
  allBestSellersLists?: Resolver<Maybe<Array<GqlResolversTypes['BestSellersList']>>, ParentType, ContextType>;
  bookDetail?: Resolver<Maybe<GqlResolversTypes['BookDetail']>, ParentType, ContextType, RequireFields<GqlQueryBookDetailArgs, 'id'>>;
  booksByAuthor?: Resolver<Maybe<Array<GqlResolversTypes['BookSummary']>>, ParentType, ContextType, RequireFields<GqlQueryBooksByAuthorArgs, 'author'>>;
  booksByCategory?: Resolver<Maybe<Array<GqlResolversTypes['BookPreview']>>, ParentType, ContextType, RequireFields<GqlQueryBooksByCategoryArgs, 'subject'>>;
  findBookId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType, RequireFields<GqlQueryFindBookIdArgs, 'author' | 'title'>>;
  searchBooks?: Resolver<Maybe<Array<GqlResolversTypes['BookPreview']>>, ParentType, ContextType, RequireFields<GqlQuerySearchBooksArgs, 'term'>>;
  searchLimitedBooks?: Resolver<Maybe<GqlResolversTypes['SearchLimitedBooks']>, ParentType, ContextType, RequireFields<GqlQuerySearchLimitedBooksArgs, 'term'>>;
}>;

export type GqlSearchLimitedBooksResolvers<ContextType = ContextServer, ParentType extends GqlResolversParentTypes['SearchLimitedBooks'] = GqlResolversParentTypes['SearchLimitedBooks']> = ResolversObject<{
  books?: Resolver<Array<GqlResolversTypes['BookSummary']>, ParentType, ContextType>;
  length?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlResolvers<ContextType = ContextServer> = ResolversObject<{
  BestSellersList?: GqlBestSellersListResolvers<ContextType>;
  BookAdditionalInfo?: GqlBookAdditionalInfoResolvers<ContextType>;
  BookCategoriesDetail?: GqlBookCategoriesDetailResolvers<ContextType>;
  BookDetail?: GqlBookDetailResolvers<ContextType>;
  BookPreview?: GqlBookPreviewResolvers<ContextType>;
  BookSummary?: GqlBookSummaryResolvers<ContextType>;
  Query?: GqlQueryResolvers<ContextType>;
  SearchLimitedBooks?: GqlSearchLimitedBooksResolvers<ContextType>;
}>;

