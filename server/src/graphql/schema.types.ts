import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  self2?: Maybe<User>
  user?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  listing?: Maybe<Listing>
  listings?: Maybe<Array<Listing>>
  listingsPaginated?: Maybe<Array<Listing>>
  comments?: Maybe<Array<Comment>>
}

export interface QuerySelfArgs {
  email: Scalars['String']
}

export interface QueryUserArgs {
  userId: Scalars['Int']
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryListingArgs {
  listingId: Scalars['Int']
}

export interface QueryListingsPaginatedArgs {
  input?: Maybe<ListingInputPaginated>
}

export interface Mutation {
  __typename?: 'Mutation'
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
  addListing?: Maybe<Listing>
  addComment?: Maybe<Comment>
  addTag?: Maybe<Tag>
  editListing?: Maybe<Listing>
  editUser?: Maybe<User>
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface MutationAddListingArgs {
  listing?: Maybe<ListingInput>
}

export interface MutationAddCommentArgs {
  comment?: Maybe<CommentInput>
}

export interface MutationAddTagArgs {
  tag?: Maybe<TagInput>
}

export interface MutationEditListingArgs {
  editInfo?: Maybe<EditListingInput>
}

export interface MutationEditUserArgs {
  editInfo?: Maybe<EditUserInput>
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface ListingInputPaginated {
  offset: Scalars['Int']
  limit?: Maybe<Scalars['Int']>
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  number: Scalars['String']
  location: Scalars['String']
  about: Scalars['String']
  image?: Maybe<Scalars['String']>
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface EditUserInput {
  id?: Maybe<Scalars['Int']>
  email: Scalars['String']
  name?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface Listing {
  __typename?: 'Listing'
  id: Scalars['Int']
  username: Scalars['String']
  userId_ref: Scalars['Int']
  price?: Maybe<Scalars['Int']>
  sellingName: Scalars['String']
  startDate: Scalars['String']
  endDate: Scalars['String']
  location: Scalars['String']
  description: Scalars['String']
  image: Scalars['String']
  comments: Array<Maybe<Comment>>
  tags: Array<Maybe<Tag>>
}

export interface ListingInput {
  username: Scalars['String']
  userId_ref: Scalars['Int']
  price?: Maybe<Scalars['Int']>
  sellingName: Scalars['String']
  startDate: Scalars['String']
  endDate: Scalars['String']
  location: Scalars['String']
  description: Scalars['String']
  image: Scalars['String']
}

export interface EditListingInput {
  id: Scalars['Int']
  username?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Int']>
  sellingName?: Maybe<Scalars['String']>
  startDate?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
}

export interface Comment {
  __typename?: 'Comment'
  date: Scalars['String']
  commentContents: Scalars['String']
  listing: Listing
  userId: Scalars['Int']
  username: Scalars['String']
  userPic: Scalars['String']
}

export interface CommentInput {
  date: Scalars['String']
  commentContents: Scalars['String']
  listingId_ref: Scalars['Int']
  userId: Scalars['Int']
  username: Scalars['String']
  userPic: Scalars['String']
}

export enum TagType {
  Groceries = 'GROCERIES',
  Tutoring = 'TUTORING',
  Haircut = 'HAIRCUT',
  Other = 'OTHER',
}

export interface Tag {
  __typename?: 'Tag'
  type: TagType
  listing: Listing
}

export interface TagInput {
  type: TagType
  listingId: Scalars['Int']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Subscription: ResolverTypeWrapper<{}>
  ListingInputPaginated: ListingInputPaginated
  User: ResolverTypeWrapper<User>
  UserType: UserType
  EditUserInput: EditUserInput
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  SurveyInput: SurveyInput
  Listing: ResolverTypeWrapper<Listing>
  ListingInput: ListingInput
  EditListingInput: EditListingInput
  Comment: ResolverTypeWrapper<Comment>
  CommentInput: CommentInput
  TagType: TagType
  Tag: ResolverTypeWrapper<Tag>
  TagInput: TagInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Subscription: {}
  ListingInputPaginated: ListingInputPaginated
  User: User
  EditUserInput: EditUserInput
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  SurveyInput: SurveyInput
  Listing: Listing
  ListingInput: ListingInput
  EditListingInput: EditListingInput
  Comment: Comment
  CommentInput: CommentInput
  Tag: Tag
  TagInput: TagInput
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerySelfArgs, 'email'>>
  self2?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  listing?: Resolver<
    Maybe<ResolversTypes['Listing']>,
    ParentType,
    ContextType,
    RequireFields<QueryListingArgs, 'listingId'>
  >
  listings?: Resolver<Maybe<Array<ResolversTypes['Listing']>>, ParentType, ContextType>
  listingsPaginated?: Resolver<
    Maybe<Array<ResolversTypes['Listing']>>,
    ParentType,
    ContextType,
    RequireFields<QueryListingsPaginatedArgs, never>
  >
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
  addListing?: Resolver<
    Maybe<ResolversTypes['Listing']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddListingArgs, never>
  >
  addComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, never>
  >
  addTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationAddTagArgs, never>>
  editListing?: Resolver<
    Maybe<ResolversTypes['Listing']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditListingArgs, never>
  >
  editUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditUserArgs, never>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ListingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userId_ref?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  sellingName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  commentContents?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  listing?: Resolver<ResolversTypes['Listing'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userPic?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']
> = {
  type?: Resolver<ResolversTypes['TagType'], ParentType, ContextType>
  listing?: Resolver<ResolversTypes['Listing'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  Listing?: ListingResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Tag?: TagResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
