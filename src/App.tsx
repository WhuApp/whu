import React, { useEffect } from 'react';
import { AddFriends, Home, Profile, Settings, Welcome, DevPage, CompassView } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { useColors } from './hooks';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Alert } from 'react-native';
import { LocationProvider } from './components/context/LocationContext';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const colors = useColors();
  const { user } = useAuth0();

  // TODO: no?
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <LocationProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              navigationBarColor: colors('backgroundPrimary'),
            }}
          >
            <Stack.Screen name='Home' component={Home} options={{ animation: 'simple_push' }} />
            <Stack.Screen
              name='Profile'
              component={Profile}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name='Settings'
              component={Settings}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name='AddFriends'
              component={AddFriends}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name='DevPage'
              component={DevPage}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name={'CompassView'}
              component={CompassView}
              options={{ animation: 'simple_push', navigationBarColor: colors('accent') }}
            />
          </Stack.Navigator>
        </LocationProvider>
      ) : (
        <>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              navigationBarColor: colors('backgroundPrimary'),
            }}
          >
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{
                animation: 'simple_push',
                navigationBarColor: '#0F0F31',
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
