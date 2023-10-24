import { useMutation, useQuery } from '@tanstack/react-query';
import { useApiFetch } from '../hooks';
import { TimedLocation } from '../types';

export const getLocationById = (id: string) => {
  const { get } = useApiFetch();

  return useQuery({
    queryFn: async () => await get<TimedLocation>('/locations/v1/by-id/' + id),
    queryKey: ['locations', id],
  });
};

export const updateLocation = () => {
  const { post } = useApiFetch();

  return useMutation({
    mutationFn: (location: TimedLocation) => post('/locations/v1/me', location),
  });
};
