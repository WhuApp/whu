import React from 'react';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './constants';
import App from './App';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/context/AuthContext';
import Toast from 'react-native-toast-message';

const Root: React.FC = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => Toast.show({ text1: error.message }),
    }),
  });

  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <Toast position='bottom' type='error' />
        </AuthProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default Root;
