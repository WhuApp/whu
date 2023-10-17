import React from 'react';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './constants';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Root: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <App />
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default Root;
