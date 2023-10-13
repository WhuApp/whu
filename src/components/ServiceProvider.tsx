import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { FriendsV1Provider } from '../services/friends_v1';
import { UsersV1Provider } from '../services/users_v1';
import { LocationsV1Provider } from '../services/locations_v1';

const ServiceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <UsersV1Provider>
        <LocationsV1Provider>
          <FriendsV1Provider>{children}</FriendsV1Provider>
        </LocationsV1Provider>
      </UsersV1Provider>
    </AuthProvider>
  );
};

export default ServiceProvider;
