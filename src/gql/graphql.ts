/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Location = {
  __typename?: 'Location';
  altitude: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['Float']['output'];
};

export type LocationParam = {
  altitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Scalars['Boolean']['output'];
  cancelFriendRequest: Scalars['Boolean']['output'];
  deleteMe: Scalars['Boolean']['output'];
  ignoreFriendRequest: Scalars['Boolean']['output'];
  removeFriend: Scalars['Boolean']['output'];
  sendFriendRequest: Scalars['Boolean']['output'];
  setLocation: Scalars['Boolean']['output'];
};


export type MutationAcceptFriendRequestArgs = {
  to: Scalars['String']['input'];
};


export type MutationCancelFriendRequestArgs = {
  to: Scalars['String']['input'];
};


export type MutationIgnoreFriendRequestArgs = {
  to: Scalars['String']['input'];
};


export type MutationRemoveFriendArgs = {
  to: Scalars['String']['input'];
};


export type MutationSendFriendRequestArgs = {
  to: Scalars['String']['input'];
};


export type MutationSetLocationArgs = {
  location: LocationParam;
};

export type Query = {
  __typename?: 'Query';
  friends: Array<User>;
  getLocationById?: Maybe<Location>;
  getUserById?: Maybe<User>;
  incomingFriendRequests: Array<User>;
  me: User;
  outgoingFriendRequests: Array<User>;
  searchUsersByName: Array<User>;
};


export type QueryGetLocationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchUsersByNameArgs = {
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location?: Maybe<Location>;
  nickname: Scalars['String']['output'];
};

export type FriendListQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendListQuery = { __typename: 'Query', friends: Array<(
    { __typename: 'User' }
    & { ' $fragmentRefs'?: { 'FriendListItemFragmentFragment': FriendListItemFragmentFragment } }
  )> };

export type TimedLocationFragmentFragment = { __typename: 'Location', altitude: number, latitude: number, longitude: number, timestamp: number } & { ' $fragmentName'?: 'TimedLocationFragmentFragment' };

export type FriendListItemFragmentFragment = { __typename: 'User', id: string, nickname: string, location?: (
    { __typename: 'Location' }
    & { ' $fragmentRefs'?: { 'TimedLocationFragmentFragment': TimedLocationFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'FriendListItemFragmentFragment' };

export type UpdateLocationMutationVariables = Exact<{
  location: LocationParam;
}>;


export type UpdateLocationMutation = { __typename: 'Mutation', setLocation: boolean };

export type FriendRequestsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQueryQuery = { __typename: 'Query', incomingFriendRequests: Array<{ __typename: 'User', id: string, nickname: string }>, outgoingFriendRequests: Array<{ __typename: 'User', id: string, nickname: string }> };

export type SendFriendRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SendFriendRequestMutation = { __typename: 'Mutation', sendFriendRequest: boolean };

export type AcceptFriendRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename: 'Mutation', acceptFriendRequest: boolean };

export type IgnoreFriendRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type IgnoreFriendRequestMutation = { __typename: 'Mutation', ignoreFriendRequest: boolean };

export type CancelFriendRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CancelFriendRequestMutation = { __typename: 'Mutation', cancelFriendRequest: boolean };

export type CompassRootQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CompassRootQueryQuery = { __typename: 'Query', getUserById?: { __typename: 'User', id: string, nickname: string, location?: { __typename: 'Location', altitude: number, latitude: number, longitude: number, timestamp: number } | null } | null };

export type ProfileRootQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileRootQueryQuery = { __typename: 'Query', me: { __typename: 'User', id: string, email: string } };

export const TimedLocationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimedLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"altitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<TimedLocationFragmentFragment, unknown>;
export const FriendListItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FriendListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimedLocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimedLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"altitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<FriendListItemFragmentFragment, unknown>;
export const FriendListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FriendList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FriendListItemFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimedLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"altitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FriendListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimedLocationFragment"}}]}}]}}]} as unknown as DocumentNode<FriendListQuery, FriendListQueryVariables>;
export const UpdateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationParam"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"setLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}]}]}}]} as unknown as DocumentNode<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const FriendRequestsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FriendRequestsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"incomingFriendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outgoingFriendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<FriendRequestsQueryQuery, FriendRequestsQueryQueryVariables>;
export const SendFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sendFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"acceptFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const IgnoreFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IgnoreFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"ignoreFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<IgnoreFriendRequestMutation, IgnoreFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"cancelFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const CompassRootQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompassRootQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"altitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<CompassRootQueryQuery, CompassRootQueryQueryVariables>;
export const ProfileRootQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileRootQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ProfileRootQueryQuery, ProfileRootQueryQueryVariables>;