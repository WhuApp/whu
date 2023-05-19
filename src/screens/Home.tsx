import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';
import { getAuth } from 'firebase/auth';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const auth = getAuth();
  const [signOut, , error] = useSignOut(auth);
  const [user, , ] = useAuthState(auth);

  return (
    <View style={styles.wrapper}>
      <Text>
        {error?.message}
      </Text>
      <Text>
        Current user: {user?.email}
      </Text>
      <Button text='Log Out' onPress={signOut} />
      <Button text='Back' onPress={() => { navigation.navigate('Welcome') }} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});

export default Home;
