import React, { useEffect } from 'react';
import { AddFriends, Home, Profile, Settings, SignIn, SignUp, Welcome } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './components/AuthContext';
import * as Location from 'expo-location';
import { useColors } from './utils';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const { session } = useAuth();
  const colors = useColors();

  // TODO: no?
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          navigationBarColor: colors('backgroundPrimary')
        }}
      >
        {session ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
            />
            <Stack.Screen
              name='Profile'
              component={Profile}
            />
            <Stack.Screen
              name='Settings'
              component={Settings}
            />
            <Stack.Screen
              name='AddFriends'
              component={AddFriends}
              options={{ animation: 'slide_from_bottom' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{ navigationBarColor: '#0F0F31' }}
            />
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{ animation: 'slide_from_bottom' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
