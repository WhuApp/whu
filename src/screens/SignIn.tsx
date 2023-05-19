import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  Text, 
  View, 
  useColorScheme 
} from 'react-native';

const SignIn: React.FC = () => {
  // TODO dark mode is not working properly for some reason
  const isDarkMode = useColorScheme() === 'dark';

  const style = {
    backgroundColor: isDarkMode ? '#fff' : '#000',
    height: '100%',
  };

  return (
    <View style={style}>
      <Text>SignUp</Text>
      <StatusBar style='auto' />
    </View>
  )
}

export default SignIn;
