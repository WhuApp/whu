import { useQuery } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';
import { User } from '../types';

export const useGetUser = (id?: string) => {
  const { get } = useApiFetch();

  const path = id ? `by-id/${id}` : 'me';

  return useQuery({
    queryFn: async () => await get<User>('/users/v1/' + path),
    queryKey: ['users', id ?? 'me'],
  });
};
