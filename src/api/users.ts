import { useQuery } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';
import { User } from '../types';

export const useGetUser = (id?: string) => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<User>('/users/v1/' + id ? 'by-id/' + id : 'me'),
    queryKey: ['users', id ?? 'me'],
  });
};
