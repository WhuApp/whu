import React, { useEffect } from 'react';
import { AddFriends, Home, Profile, Settings, SignIn, Test, Welcome, DevPage } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { useColors } from './utils';
import { MainLayout } from './layouts';
import { useAuth0 } from 'react-native-auth0';
import { AuthProvider } from './services/auth';
import { FriendsV1Provider } from './services/friend_v1';
import { UsersV1Provider } from './services/users_v1';

const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();

const App: React.FC = () => {
  const colors = useColors();
  const { user } = useAuth0();

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

  // TODO: What is SafeAreaView
  // TODO: somehow pass screen options from component
  return (
    <NavigationContainer>
      {user ? (
        <>
          <AuthProvider>
            <UsersV1Provider>
              <FriendsV1Provider>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    navigationBarColor: colors('backgroundPrimary'),
                  }}
                >
                  <Stack.Screen
                    name='MainView'
                    component={MainView}
                    options={{ animation: 'simple_push' }}
                  />
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
                  {__DEV__ && (
                    <Stack.Screen
                      name='DevPage'
                      component={DevPage}
                      options={{ animation: 'simple_push' }}
                    />
                  )}
                </Stack.Navigator>
              </FriendsV1Provider>
            </UsersV1Provider>
          </AuthProvider>
        </>
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
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{ animation: 'slide_from_bottom' }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

const MainView: React.FC = () => {
  return (
    <MainLayout>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Test' component={Test} options={{ animation: 'slide_from_left' }} />
      </Tab.Navigator>
    </MainLayout>
  );
};

export default App;
