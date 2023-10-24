import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';

export const getFriends = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/list'),
    queryKey: ['friends'],
  });
};

export const getIncomingFriendRequests = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/requests/in/list'),
    queryKey: ['incomingRequests'],
  });
};

export const getOutgoingFriendRequests = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/requests/out/list'),
    queryKey: ['outgoingRequests'],
  });
};

export const sendFriendRequest = () => {
  const { post } = useApiFetch();

  return useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/send', { friendId: id }),
  });
};

export const acceptFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/accept', { friendId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['incomingRequests'] });
    },
  });
};

export const declineFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/ignore', { friendId: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['incomingRequests'] }),
  });
};

export const cancelFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/cancel', { friendId: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outgoingRequests'] }),
  });
};
