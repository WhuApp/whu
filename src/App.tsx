import React from 'react';
import { SignIn, Welcome } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome' 
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
