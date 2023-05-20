import React, { useState } from 'react';
import {
  Home,
  SignIn,
  SignUp,
  Welcome
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User, getAuth } from 'firebase/auth';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [user, setUser] = useState<User | 'loading'>('loading');

  getAuth().onAuthStateChanged(setUser);

  if (user === 'loading') { return <></> }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          {user ? (
            <Stack.Screen name='Home' component={Home} />
          ) : (
            <>
              <Stack.Screen name='Welcome' component={Welcome} />
              <Stack.Screen name='SignIn' component={SignIn} />
              <Stack.Screen name='SignUp' component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
