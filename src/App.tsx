import React from 'react';
import { 
  SignIn, 
  SignUp, 
  Welcome 
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
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
        </Stack.Navigator>
      </NavigationContainer>  
    </SafeAreaProvider>
  );
}

export default App;
