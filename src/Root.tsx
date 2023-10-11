import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './constants';
import App from './App';

const Root: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <App />
      </Auth0Provider>
    </SafeAreaProvider>
  );
};

export default Root;
