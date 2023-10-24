import { useQuery } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';
import { User } from '../types';

export const getUserById = (id: string) => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<User>('/users/v1/by-id/' + id),
    queryKey: ['users', id],
  });
};

export const getUser = () => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<User>('/users/v1/me'),
    queryKey: ['users', 'me'],
  });
};

// TODO: add findUserByNickname
