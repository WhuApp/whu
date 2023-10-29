import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';

export const useGetFriends = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/list'),
    queryKey: ['friends'],
  });
};

export const useGetIncomingFriendRequests = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/requests/in/list'),
    queryKey: ['incomingRequests'],
  });
};

export const useGetOutgoingFriendRequests = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<string[]>('/friends/v1/requests/out/list'),
    queryKey: ['outgoingRequests'],
  });
};

export const useSendFriendRequest = () => {
  const { post } = useApiFetch();

  const { mutate: sendFriendRequest, ...rest } = useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/send', { friendId: id }),
  });

  return { sendFriendRequest, ...rest };
};

export const useAcceptFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  const { mutate: acceptFriendRequest, ...rest } = useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/accept', { friendId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['incomingRequests'] });
    },
  });

  return { acceptFriendRequest, ...rest };
};

export const useDeclineFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  const { mutate: declineFriendRequest, ...rest } = useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/ignore', { friendId: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['incomingRequests'] }),
  });

  return { declineFriendRequest, ...rest };
};

export const useCancelFriendRequest = () => {
  const { post } = useApiFetch();
  const queryClient = useQueryClient();

  const { mutate: cancelFriendRequest, ...rest } = useMutation({
    mutationFn: (id: string) => post('/friends/v1/requests/cancel', { friendId: id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outgoingRequests'] }),
  });

  return { cancelFriendRequest, ...rest };
};
