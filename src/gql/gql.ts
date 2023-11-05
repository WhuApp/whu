/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query FriendList {\n        friends {\n          ...FriendListItemFragment\n        }\n      }\n    ": types.FriendListDocument,
    "\n  fragment TimedLocationFragment on Location {\n    altitude\n    latitude\n    longitude\n    timestamp\n  }\n": types.TimedLocationFragmentFragmentDoc,
    "\n  fragment FriendListItemFragment on User {\n    id\n    nickname\n    location {\n      ...TimedLocationFragment\n    }\n  }\n": types.FriendListItemFragmentFragmentDoc,
    "\n  mutation UpdateLocation($location: LocationParam!) {\n    setLocation(location: $location)\n  }\n": types.UpdateLocationDocument,
    "\n  query FriendRequestsQuery {\n    incomingFriendRequests {\n      id\n      nickname\n    }\n    outgoingFriendRequests {\n      id\n      nickname\n    }\n  }\n": types.FriendRequestsQueryDocument,
    "\n  mutation SendFriendRequest($id: String!) {\n    sendFriendRequest(to: $id)\n  }\n": types.SendFriendRequestDocument,
    "\n  mutation AcceptFriendRequest($id: String!) {\n    acceptFriendRequest(to: $id)\n  }\n": types.AcceptFriendRequestDocument,
    "\n  mutation IgnoreFriendRequest($id: String!) {\n    ignoreFriendRequest(to: $id)\n  }\n": types.IgnoreFriendRequestDocument,
    "\n  mutation CancelFriendRequest($id: String!) {\n    cancelFriendRequest(to: $id)\n  }\n": types.CancelFriendRequestDocument,
    "\n  query CompassRootQuery($id: String!) {\n    getUserById(id: $id) {\n      id\n      nickname\n      location {\n        altitude\n        latitude\n        longitude\n        timestamp\n      }\n    }\n  }\n": types.CompassRootQueryDocument,
    "\n  query ProfileRootQuery {\n    me {\n      id\n      email\n    }\n  }\n": types.ProfileRootQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query FriendList {\n        friends {\n          ...FriendListItemFragment\n        }\n      }\n    "): (typeof documents)["\n      query FriendList {\n        friends {\n          ...FriendListItemFragment\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TimedLocationFragment on Location {\n    altitude\n    latitude\n    longitude\n    timestamp\n  }\n"): (typeof documents)["\n  fragment TimedLocationFragment on Location {\n    altitude\n    latitude\n    longitude\n    timestamp\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FriendListItemFragment on User {\n    id\n    nickname\n    location {\n      ...TimedLocationFragment\n    }\n  }\n"): (typeof documents)["\n  fragment FriendListItemFragment on User {\n    id\n    nickname\n    location {\n      ...TimedLocationFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLocation($location: LocationParam!) {\n    setLocation(location: $location)\n  }\n"): (typeof documents)["\n  mutation UpdateLocation($location: LocationParam!) {\n    setLocation(location: $location)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FriendRequestsQuery {\n    incomingFriendRequests {\n      id\n      nickname\n    }\n    outgoingFriendRequests {\n      id\n      nickname\n    }\n  }\n"): (typeof documents)["\n  query FriendRequestsQuery {\n    incomingFriendRequests {\n      id\n      nickname\n    }\n    outgoingFriendRequests {\n      id\n      nickname\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendFriendRequest($id: String!) {\n    sendFriendRequest(to: $id)\n  }\n"): (typeof documents)["\n  mutation SendFriendRequest($id: String!) {\n    sendFriendRequest(to: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptFriendRequest($id: String!) {\n    acceptFriendRequest(to: $id)\n  }\n"): (typeof documents)["\n  mutation AcceptFriendRequest($id: String!) {\n    acceptFriendRequest(to: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation IgnoreFriendRequest($id: String!) {\n    ignoreFriendRequest(to: $id)\n  }\n"): (typeof documents)["\n  mutation IgnoreFriendRequest($id: String!) {\n    ignoreFriendRequest(to: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelFriendRequest($id: String!) {\n    cancelFriendRequest(to: $id)\n  }\n"): (typeof documents)["\n  mutation CancelFriendRequest($id: String!) {\n    cancelFriendRequest(to: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompassRootQuery($id: String!) {\n    getUserById(id: $id) {\n      id\n      nickname\n      location {\n        altitude\n        latitude\n        longitude\n        timestamp\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompassRootQuery($id: String!) {\n    getUserById(id: $id) {\n      id\n      nickname\n      location {\n        altitude\n        latitude\n        longitude\n        timestamp\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProfileRootQuery {\n    me {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query ProfileRootQuery {\n    me {\n      id\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;