import React, { useEffect } from 'react';
import { AddFriends, Home, Profile, Settings, SignIn, SignUp, Test, Welcome } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './components/AuthContext';
import * as Location from 'expo-location';
import { useColors } from './hooks';
import { MainLayout } from './layouts';

const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();

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

  // TODO: What is SafeAreaView
  // TODO: somehow pass screen options from component
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors('backgroundPrimary') }}>
        {session ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name='Welcome'
              component={Welcome}
              options={{ animation: 'simple_push', navigationBarColor: '#0F0F31' }}
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

const MainView: React.FC = () => {
  return (
    <MainLayout>
      <Tab.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Test' component={Test} options={{ animation: 'slide_from_left' }} />
      </Tab.Navigator>
    </MainLayout>
  )
};

export default App;
