import { client } from '../appwrite';
import { Functions } from 'appwrite';
import type { Friend, PendingRequests } from '../types';
import { denormalize } from '../location';

const FUNCTION_GET_FRIENDS_ID = '64afee76ae420de6cc3d';
const FUNCTION_ADD_FRIEND_ID = '64aef40f8bc33879bb25';
const FUNCTION_REMOVE_FRIEND_ID = '64b67d44e75c49e2110e';
const FUNCTION_GET_FRIEND_REQUESTS_ID = '64b645dbb12660ad9258';

const functions = new Functions(client);

/**
 * TODO: Implement caching
 */
export const getFriends = async (): Promise<Friend[]> => {
  const execution = await functions.createExecution(FUNCTION_GET_FRIENDS_ID);
  const data = JSON.parse(execution.response);

  return data.map((friend) => ({
    name: friend.name,
    location: denormalize(friend.location),
  }));
};

export const addFriend = async (id: string): Promise<string | undefined> => {
  const payload = JSON.stringify({ receiver: id });
  const execution = await functions.createExecution(FUNCTION_ADD_FRIEND_ID, payload);
  const data = JSON.parse(execution.response);
  
  if (!data.success) return data.message;
};

export const removeFriend = async (id: string): Promise<string | undefined> => {
  const payload = JSON.stringify({ receiver: id });
  const execution = await functions.createExecution(FUNCTION_REMOVE_FRIEND_ID, payload);
  const data = JSON.parse(execution.response);

  if (!data.success) return data.message;
};

export const getFriendRequests = async (): Promise<PendingRequests> => {
  const execution = await functions.createExecution(FUNCTION_GET_FRIEND_REQUESTS_ID);
  const data = JSON.parse(execution.response);

  return data;
};
