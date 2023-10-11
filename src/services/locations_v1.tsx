import React, { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import useAuth from '../components/AuthContext';
import { Service } from './fetch';
import { TimedLocation } from '../types';

export class LocationsV1 extends Service {
  constructor(token: string) {
    super(token, 'https://api.whu.app/locations/v1/');
  }

  async setLocation(timedLocation: TimedLocation): Promise<string | undefined> {
    const response = await this.innerFetchPost('me', timedLocation);

    if (response.ok) {
      return null;
    }

    return await response.text();
  }

  async getLocation(id?: string): Promise<TimedLocation> {
    const path = id ? 'by-id/' + id : 'me';
    return await this.innerFetch<TimedLocation>(path);
  }
}

const LocationsV1Context = createContext<LocationsV1>(undefined);
const LocationsV1Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const { idToken } = useAuth();
  const c = new LocationsV1(undefined);
  c.token = idToken;

  useEffect(() => {
    c.token = idToken;
  }, [idToken]);

  return <LocationsV1Context.Provider value={c}>{children}</LocationsV1Context.Provider>;
};

const useLocationsV1 = () => {
  return useContext(LocationsV1Context);
};

export { LocationsV1Context, LocationsV1Provider };
export default useLocationsV1;
