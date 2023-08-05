import type { Friend, PendingRequests } from '../types';
import { denormalize } from '../location';
import {
  getFriends as getFriendsApi,
  addFriend as addFriendApi,
  removeFriend as removeFriendApi,
  getFriendRequests as getFriendRequestsApi,
} from '../api/functions';

/**
 * TODO: Implement caching
 */
export const getFriends = async (): Promise<Friend[] | string> => {
  const response = await getFriendsApi();

  if (!response.success) {
    return response.error ?? 'Unknown Error';
  }

  return response.data.map((friend) => ({
    id: friend.id,
    name: friend.name,
    lastLocationUpdate: new Date(friend.lastLocationUpdate),
    location: denormalize(friend.location),
  }));
};

export const addFriend = async (target: string): Promise<string | never> => {
  const response = await addFriendApi({ target });

  if (!response.success) {
    return response.error ?? 'Unknown Error';
  }
};

export const removeFriend = async (target: string): Promise<string | never> => {
  const response = await removeFriendApi({ target });

  if (!response.success) {
    return response.error ?? 'Unknown Error';
  }
};

export const getFriendRequests = async (): Promise<PendingRequests> => {
  const response = await getFriendRequestsApi();

  if (!response.success) {
    throw new Error(response.error ?? 'Unknown Error');
  }

  return response.data;
};
