import type { Friend, PendingRequests } from '../types';
import { denormalize } from '../location';

/**
 * TODO: Implement caching
 */
export const getFriends = async (): Promise<Friend[] | string> => {
  return 'not implemented';
};

export const addFriend = async (target: string): Promise<string | never> => {
  return 'not implemented';
};

export const removeFriend = async (target: string): Promise<string | never> => {
  return 'not implemented';
};

export const getFriendRequests = async (): Promise<PendingRequests> => {
  return { incoming: ['not implemented'], outgoing: ['not implemented'] };
};
