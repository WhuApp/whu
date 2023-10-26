import { useMutation, useQuery } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';
import { TimedLocation } from '../types';

export const useGetLocation = (id: string) => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<TimedLocation>('/locations/v1/by-id/' + id),
    queryKey: ['locations', id],
  });
};

export const useUpdateLocation = () => {
  const { post } = useApiFetch();

  const { mutateAsync: updateLocation, ...rest } = useMutation({
    mutationFn: (location: TimedLocation) => post('/locations/v1/me', location),
  });

  return { updateLocation, ...rest };
};
