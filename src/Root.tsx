import React from 'react';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './constants';
import App from './App';
import Toast from 'react-native-toast-message';
import UrqlProvider from './components/context/UrqlContext';

const Root: React.FC = () => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <UrqlProvider>
        <App />
        <Toast position='bottom' type='error' />
      </UrqlProvider>
    </Auth0Provider>
  );
};

export default Root;
