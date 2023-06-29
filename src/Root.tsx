import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './components/AuthContext';
import App from './App';

const Root: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default Root;
