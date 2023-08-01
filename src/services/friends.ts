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

  if (!response.success) return response.error;

  return response.data.map((friend) => ({
    name: friend.name,
    lastLocationUpdate: new Date(friend.lastLocationUpdate),
    location: denormalize(friend.location),
  }));
};

export const addFriend = async (emailOrName: string): Promise<string | never> => {
  const response = await addFriendApi({ emailOrName });

  if (!response.success) return response.error;
};

export const removeFriend = async (emailOrName: string): Promise<string | never> => {
  const response = await removeFriendApi({ emailOrName });

  if (!response.success) return response.error;
};

export const getFriendRequests = async (): Promise<PendingRequests> => {
  const response = await getFriendRequestsApi();

  if (!response.success) return Promise.reject(response.error);
  return Promise.resolve(response.data);
};
