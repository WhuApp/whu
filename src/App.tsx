import React, { ReactNode } from 'react';
import {
  Home,
  SignIn,
  SignUp,
  Welcome
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD8pwH_V0cqNFbZ8ydJuvM3NVBDvYWhFDg',
  authDomain: 'whuapp-bce7b.firebaseapp.com',
  projectId: 'whuapp-bce7b',
  storageBucket: 'whuapp-bce7b.appspot.com',
  messagingSenderId: '917151787296',
  appId: '1:917151787296:web:764e32c1bc102bb3a40f45',
  measurementId: 'G-7K5CHEJ8L2'
};

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  initializeApp(firebaseConfig);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
