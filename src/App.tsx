import React from 'react';
import {
  Home,
  SignIn,
  SignUp,
  Welcome
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAuth from './useAuth';
import { ActivityIndicator, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const { loggedIn, loading } = useAuth();

  if (loading) { return <ActivityIndicator /> }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          {loggedIn ? (
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
      <Text>{loggedIn.toString()}</Text>
    </SafeAreaProvider>
  );
};

export default App;
