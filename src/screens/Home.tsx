import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Button, InsetView } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';
import { getAuth } from 'firebase/auth';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const auth = getAuth();
  const [signOut, , , ] = useSignOut(auth);
  const [user, , ] = useAuthState(auth);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={isDarkMode ? darkStyles.wrapper : lightStyles.wrapper}>
      <InsetView style={styles.container}>
        <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
          Current user: {user?.email}
        </Text>
        <Button text='Log Out' onPress={signOut} />
        <Button text='Back' onPress={() => { navigation.navigate('Welcome') }} />
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const darkStyles = StyleSheet.create({
  wrapper: StyleSheet.flatten([styles.wrapper, {
    backgroundColor: '#313338',
  }]),
  text: {
    color: '#D3D3D3',
  },
});

const lightStyles = StyleSheet.create({
  wrapper: StyleSheet.flatten([styles.wrapper, {
    backgroundColor: '#F2F2F2',
  }]),
  text: {
    color: '#222222',
  },
});

export default Home;
