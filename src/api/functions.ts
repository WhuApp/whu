import { client } from '../appwrite';
import { Functions } from 'appwrite';
import { PendingRequests, Location } from '../types';
import { FUNCTION_IDS } from '../constants';

const functions = new Functions(client);

type FunctionResponse<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

type UnparsedFriend = {
  name: string;
  lastLocationUpdate: number;
  location: Location;
};

type GetFriendsResponse = UnparsedFriend[];

type AddFriendRequest = {
  emailOrName: string;
};

type RemoveFriendRequest = {
  emailOrName: string;
};

type GetFriendRequestsResponse = PendingRequests;

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

type UserExistsRequest = {
  email: string;
};

type UserExistsResponse = {
  exists: boolean;
};

export const getFriends = async (): Promise<FunctionResponse<GetFriendsResponse>> => {
  const execution = await functions.createExecution(FUNCTION_IDS.getFriends);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
    data: response.data,
  };
};

export const addFriend = async (input: AddFriendRequest): Promise<FunctionResponse<never>> => {
  const payload = JSON.stringify(input);
  const execution = await functions.createExecution(FUNCTION_IDS.addFriend, payload);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
  };
};

export const removeFriend = async (
  input: RemoveFriendRequest,
): Promise<FunctionResponse<never>> => {
  const payload = JSON.stringify(input);
  const execution = await functions.createExecution(FUNCTION_IDS.removeFriend, payload);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
  };
};

export const getFriendRequests = async (): Promise<FunctionResponse<GetFriendRequestsResponse>> => {
  const execution = await functions.createExecution(FUNCTION_IDS.getFriendRequests);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
    data: response.data,
  };
};

export const register = async (input: RegisterRequest): Promise<FunctionResponse<never>> => {
  const payload = JSON.stringify(input);
  const execution = await functions.createExecution(FUNCTION_IDS.register, payload);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
  };
};

export const userExists = async (
  input: UserExistsRequest,
): Promise<FunctionResponse<UserExistsResponse>> => {
  const payload = JSON.stringify(input);
  const execution = await functions.createExecution(FUNCTION_IDS.userExists, payload);
  const response = JSON.parse(execution.response);

  return {
    success: execution.statusCode === 200 && !response.message,
    error: response.message,
    data: response.data,
  };
};
